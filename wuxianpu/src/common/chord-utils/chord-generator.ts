import {
  Accidental,
  NoteName,
  NoteNameBase,
  WhiteKeyNoteName,
} from "../notes-utils/notes";
import { randomSelect } from "../utils";
import { Chord, ChordTypeName, ChordVoicing, InversionMode } from "./chord";
import {
  KeySignature,
  getLeadingTone,
  noteInKeys,
} from "../notes-utils/key-signature";

// Canvas valid range: A1 to E6 (inclusive)
export const CANVAS_LOW = new NoteName(
  new WhiteKeyNoteName(NoteNameBase.A, 1),
  Accidental.NONE,
).valueOf(); // 33

export const CANVAS_HIGH = new NoteName(
  new WhiteKeyNoteName(NoteNameBase.E, 6),
  Accidental.NONE,
).valueOf(); // 88

export function isInCanvasRange(note: NoteName): boolean {
  return note.valueOf() >= CANVAS_LOW && note.valueOf() <= CANVAS_HIGH;
}

// 12 standard roots covering all pitch classes (avoids double accidentals in common chord types)
const STANDARD_ROOTS: Array<{
  noteNameBase: NoteNameBase;
  accidental: Accidental;
}> = [
  { noteNameBase: NoteNameBase.C, accidental: Accidental.NONE },
  { noteNameBase: NoteNameBase.C, accidental: Accidental.SHARP },
  { noteNameBase: NoteNameBase.D, accidental: Accidental.NONE },
  { noteNameBase: NoteNameBase.E, accidental: Accidental.FLAT },
  { noteNameBase: NoteNameBase.E, accidental: Accidental.NONE },
  { noteNameBase: NoteNameBase.F, accidental: Accidental.NONE },
  { noteNameBase: NoteNameBase.F, accidental: Accidental.SHARP },
  { noteNameBase: NoteNameBase.G, accidental: Accidental.NONE },
  { noteNameBase: NoteNameBase.A, accidental: Accidental.FLAT },
  { noteNameBase: NoteNameBase.A, accidental: Accidental.NONE },
  { noteNameBase: NoteNameBase.B, accidental: Accidental.FLAT },
  { noteNameBase: NoteNameBase.B, accidental: Accidental.NONE },
];

const ALL_CHORD_TYPES = Object.values(ChordTypeName).filter(
  (v) => typeof v === "number",
) as ChordTypeName[];

// Returns a canonical Chord (root at octave 4) for generating tone templates.
function canonicalChord(chord: Chord): Chord {
  return new Chord(
    new NoteName(
      new WhiteKeyNoteName(chord.root.whiteKeyNote.noteNameBase, 4),
      chord.root.accidental,
    ),
    chord.type,
  );
}

// Returns all valid octaves for a chord tone given its noteNameBase and accidental.
function getValidOctavesForTone(
  noteNameBase: NoteNameBase,
  accidental: Accidental,
): number[] {
  const result: number[] = [];
  for (let octave = 0; octave <= 8; octave++) {
    const note = new NoteName(
      new WhiteKeyNoteName(noteNameBase, octave),
      accidental,
    );
    if (isInCanvasRange(note)) result.push(octave);
  }
  return result;
}

// Close-position root-position voicing. Root is the lowest note.
// All notes within canvas range.
export function generateRootPosition(chord: Chord): ChordVoicing {
  const cc = canonicalChord(chord);
  const intervals = cc.getSemitoneIntervals();
  const maxInterval = intervals[intervals.length - 1];

  const validOctaves: number[] = [];
  for (let octave = 0; octave <= 8; octave++) {
    const rootNote = new NoteName(
      new WhiteKeyNoteName(cc.root.whiteKeyNote.noteNameBase, octave),
      cc.root.accidental,
    );
    if (
      rootNote.valueOf() >= CANVAS_LOW &&
      rootNote.valueOf() + maxInterval <= CANVAS_HIGH
    ) {
      validOctaves.push(octave);
    }
  }

  const octave = randomSelect(validOctaves);
  const rootAtOctave = new Chord(
    new NoteName(
      new WhiteKeyNoteName(cc.root.whiteKeyNote.noteNameBase, octave),
      cc.root.accidental,
    ),
    chord.type,
  );
  const notes = rootAtOctave.getChordToneNoteNames();
  return new ChordVoicing(rootAtOctave, notes);
}

// Shift all notes in a voicing by one octave (up or down).
function shiftVoicing(voicing: ChordVoicing, octaves: number): ChordVoicing {
  const semitones = octaves * 12;
  const shifted = voicing.notes.map(
    (n) =>
      new NoteName(
        new WhiteKeyNoteName(
          n.whiteKeyNote.noteNameBase,
          n.whiteKeyNote.octave + octaves,
        ),
        n.accidental,
      ),
  );
  const newRoot = new Chord(
    new NoteName(
      new WhiteKeyNoteName(
        voicing.chord.root.whiteKeyNote.noteNameBase,
        voicing.chord.root.whiteKeyNote.octave + octaves,
      ),
      voicing.chord.root.accidental,
    ),
    voicing.chord.type,
  );
  void semitones;
  return new ChordVoicing(newRoot, shifted);
}

// Simple inversion: raise notes[0..inversionIndex-1] by one octave, then sort.
// Verifies all notes stay in canvas range; shifts entire voicing if needed.
export function generateSimpleInversion(
  chord: Chord,
  inversionIndex: number,
): ChordVoicing {
  const rootVoicing = generateRootPosition(chord);
  if (inversionIndex === 0) return rootVoicing;

  const inverted = [...rootVoicing.notes];
  for (let i = 0; i < inversionIndex; i++) {
    const n = inverted[i];
    inverted[i] = new NoteName(
      new WhiteKeyNoteName(
        n.whiteKeyNote.noteNameBase,
        n.whiteKeyNote.octave + 1,
      ),
      n.accidental,
    );
  }
  inverted.sort((a, b) => a.valueOf() - b.valueOf());

  let candidate = new ChordVoicing(rootVoicing.chord, inverted);

  // Shift down if any note exceeds the upper bound
  while (candidate.notes.some((n) => n.valueOf() > CANVAS_HIGH)) {
    candidate = shiftVoicing(candidate, -1);
  }
  // Shift up if any note falls below the lower bound
  while (candidate.notes.some((n) => n.valueOf() < CANVAS_LOW)) {
    candidate = shiftVoicing(candidate, 1);
  }

  return candidate;
}

// Generalized voicing: each chord tone gets a random octave; up to 5 notes total.
export function generateGeneralizedVoicing(chord: Chord): ChordVoicing {
  const cc = canonicalChord(chord);
  const toneTemplates = cc.getChordToneNoteNames();

  const notes: NoteName[] = [];

  // One note per chord tone at a random valid octave
  for (const t of toneTemplates) {
    const validOctaves = getValidOctavesForTone(
      t.whiteKeyNote.noteNameBase,
      t.accidental,
    );
    const octave = randomSelect(validOctaves);
    notes.push(
      new NoteName(
        new WhiteKeyNoteName(t.whiteKeyNote.noteNameBase, octave),
        t.accidental,
      ),
    );
  }

  // Add up to (5 - noteCount) extra notes
  const maxExtra = 5 - toneTemplates.length;
  const extraCount = Math.floor(Math.random() * (maxExtra + 1));
  for (let i = 0; i < extraCount; i++) {
    const t = randomSelect(toneTemplates);
    const validOctaves = getValidOctavesForTone(
      t.whiteKeyNote.noteNameBase,
      t.accidental,
    );
    const octave = randomSelect(validOctaves);
    notes.push(
      new NoteName(
        new WhiteKeyNoteName(t.whiteKeyNote.noteNameBase, octave),
        t.accidental,
      ),
    );
  }

  notes.sort((a, b) => a.valueOf() - b.valueOf());
  // Remove exact-pitch duplicates
  const unique = notes.filter(
    (n, i) => i === 0 || n.valueOf() !== notes[i - 1].valueOf(),
  );

  return new ChordVoicing(cc, unique);
}

export function isDiatonicChord(
  voicing: ChordVoicing,
  keySignature: KeySignature,
): boolean {
  const leadingTone = getLeadingTone(keySignature);
  return voicing.notes.every((note) => {
    if (noteInKeys(note, keySignature)) return true;
    if (
      leadingTone &&
      note.whiteKeyNote.noteNameBase === leadingTone.noteNameBase &&
      note.accidental === leadingTone.accidental
    )
      return true;
    return false;
  });
}

function generateOneVoicing(inversionMode: InversionMode): ChordVoicing {
  const type = randomSelect(ALL_CHORD_TYPES);
  const rootSpec = randomSelect(STANDARD_ROOTS);
  const chord = new Chord(
    new NoteName(
      new WhiteKeyNoteName(rootSpec.noteNameBase, 4),
      rootSpec.accidental,
    ),
    type,
  );
  switch (inversionMode) {
    case InversionMode.NO_INVERSION:
      return generateRootPosition(chord);
    case InversionMode.SIMPLE_INVERSIONS: {
      const invIdx = Math.floor(
        Math.random() * chord.getSemitoneIntervals().length,
      );
      return generateSimpleInversion(chord, invIdx);
    }
    case InversionMode.GENERALIZED_INVERSIONS:
      return generateGeneralizedVoicing(chord);
  }
}

// Pick a random chord type + root, then generate a voicing per the inversion mode.
// When keySignature and diatonicOnly are provided, retries until a diatonic chord is found.
export function generateRandomVoicing(
  inversionMode: InversionMode,
  keySignature?: KeySignature,
  diatonicOnly?: boolean,
): ChordVoicing {
  if (!diatonicOnly || keySignature === undefined)
    return generateOneVoicing(inversionMode);
  for (let i = 0; i < 500; i++) {
    const voicing = generateOneVoicing(inversionMode);
    if (isDiatonicChord(voicing, keySignature)) return voicing;
  }
  return generateOneVoicing(inversionMode);
}

// Generate `count` wrong options with slash symbols different from correct and each other.
export function generateWrongOptions(
  correct: ChordVoicing,
  count: number,
): ChordVoicing[] {
  const result: ChordVoicing[] = [];
  const used = new Set([correct.getSlashSymbol()]);

  let attempts = 0;
  while (result.length < count && attempts < 2000) {
    attempts++;
    const voicing = generateRandomVoicing(InversionMode.NO_INVERSION);
    const sym = voicing.getSlashSymbol();
    if (!used.has(sym)) {
      used.add(sym);
      result.push(voicing);
    }
  }

  return result;
}
