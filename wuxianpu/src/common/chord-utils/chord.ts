import {
  Accidental,
  NoteName,
  NoteNameBase,
  WhiteKeyNoteName,
} from "../notes-utils/notes";

export enum ChordTypeName {
  MAJOR_TRIAD, // 大三和弦:      [0,4,7]
  MINOR_TRIAD, // 小三和弦:      [0,3,7]
  AUGMENTED_TRIAD, // 增三和弦:      [0,4,8]
  DIMINISHED_TRIAD, // 减三和弦:      [0,3,6]
  MAJOR_MAJOR_SEVENTH, // 大大七和弦:    [0,4,7,11]
  MAJOR_MINOR_SEVENTH, // 大小七和弦:    [0,4,7,10]
  MINOR_MAJOR_SEVENTH, // 小大七和弦:    [0,3,7,11]
  MINOR_MINOR_SEVENTH, // 小小七和弦:    [0,3,7,10]
  DIMINISHED_MINOR_SEVENTH, // 减小七和弦: [0,3,6,10]
  DIMINISHED_SEVENTH, // 减减七和弦:    [0,3,6,9]
  AUGMENTED_MAJOR_SEVENTH, // 增大七和弦: [0,4,8,11]
}

export enum InversionMode {
  NO_INVERSION,
  SIMPLE_INVERSIONS,
  GENERALIZED_INVERSIONS,
}

const CHORD_INTERVALS: Record<ChordTypeName, number[]> = {
  [ChordTypeName.MAJOR_TRIAD]: [0, 4, 7],
  [ChordTypeName.MINOR_TRIAD]: [0, 3, 7],
  [ChordTypeName.AUGMENTED_TRIAD]: [0, 4, 8],
  [ChordTypeName.DIMINISHED_TRIAD]: [0, 3, 6],
  [ChordTypeName.MAJOR_MAJOR_SEVENTH]: [0, 4, 7, 11],
  [ChordTypeName.MAJOR_MINOR_SEVENTH]: [0, 4, 7, 10],
  [ChordTypeName.MINOR_MAJOR_SEVENTH]: [0, 3, 7, 11],
  [ChordTypeName.MINOR_MINOR_SEVENTH]: [0, 3, 7, 10],
  [ChordTypeName.DIMINISHED_MINOR_SEVENTH]: [0, 3, 6, 10],
  [ChordTypeName.DIMINISHED_SEVENTH]: [0, 3, 6, 9],
  [ChordTypeName.AUGMENTED_MAJOR_SEVENTH]: [0, 4, 8, 11],
};

// White key letter order (C=0, D=2, E=4, F=5, G=7, A=9, B=11)
const WHITE_KEY_ORDER: NoteNameBase[] = [
  NoteNameBase.C,
  NoteNameBase.D,
  NoteNameBase.E,
  NoteNameBase.F,
  NoteNameBase.G,
  NoteNameBase.A,
  NoteNameBase.B,
];

export function getPitchClass(note: NoteName): number {
  return ((note.valueOf() % 12) + 12) % 12;
}

export class Chord {
  root: NoteName;
  type: ChordTypeName;

  constructor(root: NoteName, type: ChordTypeName) {
    this.root = root;
    this.type = type;
  }

  getSemitoneIntervals(): number[] {
    return CHORD_INTERVALS[this.type];
  }

  // Returns chord tone NoteName objects in ascending order (root first).
  // Each note gets the octave closest above the previous, starting at root's octave.
  // Letters are spelled diatonically (thirds above root: 3rd, 5th, 7th).
  getChordToneNoteNames(): NoteName[] {
    const intervals = this.getSemitoneIntervals();
    const rootLetterIdx = WHITE_KEY_ORDER.indexOf(
      this.root.whiteKeyNote.noteNameBase,
    );
    const rootOctave = this.root.whiteKeyNote.octave;
    const result: NoteName[] = [];

    for (let i = 0; i < intervals.length; i++) {
      const letterIdx = (rootLetterIdx + 2 * i) % 7;
      const letter = WHITE_KEY_ORDER[letterIdx];
      const octaveShift = Math.floor((rootLetterIdx + 2 * i) / 7);
      const octave = rootOctave + octaveShift;

      const requiredAbsolute = this.root.valueOf() + intervals[i];
      const naturalAbsolute = 12 + octave * 12 + (letter as number);
      const accidentalValue = requiredAbsolute - naturalAbsolute;

      result.push(
        new NoteName(
          new WhiteKeyNoteName(letter, octave),
          accidentalValue as Accidental,
        ),
      );
    }

    return result;
  }
}

export class ChordVoicing {
  chord: Chord;
  // Ascending order, notes[0] is the bass note. Includes specific octaves.
  notes: NoteName[];

  constructor(chord: Chord, notes: NoteName[]) {
    this.chord = chord;
    this.notes = notes;
  }

  // 0=root position, 1=first inversion, 2=second inversion, 3=third inversion.
  // Returns the index of the bass note in the chord's tone sequence.
  // For generalized voicings where the bass matches no chord tone, returns the
  // chord tone count (treated as a generalized inversion marker).
  getInversionIndex(): number {
    const bassPC = getPitchClass(this.notes[0]);
    const chordTones = this.chord.getChordToneNoteNames();
    for (let i = 0; i < chordTones.length; i++) {
      if (getPitchClass(chordTones[i]) === bassPC) return i;
    }
    return chordTones.length; // generalized inversion
  }

  // Slash chord symbol used for equality comparison (e.g. "Cm/G", "Fmaj7").
  getSlashSymbol(): string {
    const root = this.chord.root;
    const rootLetter = NoteNameBase[root.whiteKeyNote.noteNameBase];
    const rootAcc =
      root.accidental === Accidental.SHARP
        ? "#"
        : root.accidental === Accidental.FLAT
          ? "b"
          : "";
    const typeSuffix = TYPE_SYMBOL_SUFFIX[this.chord.type];
    const chordSymbol = rootLetter + rootAcc + typeSuffix;

    const invIdx = this.getInversionIndex();
    if (invIdx === 0) return chordSymbol;

    const bass = this.notes[0];
    const bassLetter = NoteNameBase[bass.whiteKeyNote.noteNameBase];
    const bassAcc =
      bass.accidental === Accidental.SHARP
        ? "#"
        : bass.accidental === Accidental.FLAT
          ? "b"
          : "";
    return chordSymbol + "/" + bassLetter + bassAcc;
  }
}

const TYPE_SYMBOL_SUFFIX: Record<ChordTypeName, string> = {
  [ChordTypeName.MAJOR_TRIAD]: "",
  [ChordTypeName.MINOR_TRIAD]: "m",
  [ChordTypeName.AUGMENTED_TRIAD]: "aug",
  [ChordTypeName.DIMINISHED_TRIAD]: "dim",
  [ChordTypeName.MAJOR_MAJOR_SEVENTH]: "maj7",
  [ChordTypeName.MAJOR_MINOR_SEVENTH]: "7",
  [ChordTypeName.MINOR_MAJOR_SEVENTH]: "mM7",
  [ChordTypeName.MINOR_MINOR_SEVENTH]: "m7",
  [ChordTypeName.DIMINISHED_MINOR_SEVENTH]: "m7b5",
  [ChordTypeName.DIMINISHED_SEVENTH]: "dim7",
  [ChordTypeName.AUGMENTED_MAJOR_SEVENTH]: "aug(maj7)",
};
