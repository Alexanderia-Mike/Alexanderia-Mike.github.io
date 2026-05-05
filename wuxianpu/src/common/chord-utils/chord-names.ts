import { Accidental, NoteNameBase } from "../notes-utils/notes";
import { Chord, ChordTypeName, ChordVoicing } from "./chord";

const CHINESE_ACCIDENTAL: Record<Accidental, string> = {
  [Accidental.NONE]: "",
  [Accidental.SHARP]: "升",
  [Accidental.FLAT]: "降",
  [Accidental.DOUBLE_SHARP]: "重升",
  [Accidental.DOUBLE_FLAT]: "重降",
  [Accidental.TRIPLE_SHARP]: "三重升",
  [Accidental.TRIPLE_FLAT]: "三重降",
};

const DISPLAY_ACCIDENTAL: Record<Accidental, string> = {
  [Accidental.NONE]: "",
  [Accidental.SHARP]: "#",
  [Accidental.FLAT]: "♭",
  [Accidental.DOUBLE_SHARP]: "##",
  [Accidental.DOUBLE_FLAT]: "♭♭",
  [Accidental.TRIPLE_SHARP]: "###",
  [Accidental.TRIPLE_FLAT]: "♭♭♭",
};

const CHINESE_TYPE_NAME: Record<ChordTypeName, string> = {
  [ChordTypeName.MAJOR_TRIAD]: "大三和弦",
  [ChordTypeName.MINOR_TRIAD]: "小三和弦",
  [ChordTypeName.AUGMENTED_TRIAD]: "增三和弦",
  [ChordTypeName.DIMINISHED_TRIAD]: "减三和弦",
  [ChordTypeName.MAJOR_MAJOR_SEVENTH]: "大大七和弦",
  [ChordTypeName.MAJOR_MINOR_SEVENTH]: "大小七和弦",
  [ChordTypeName.MINOR_MAJOR_SEVENTH]: "小大七和弦",
  [ChordTypeName.MINOR_MINOR_SEVENTH]: "小小七和弦",
  [ChordTypeName.DIMINISHED_MINOR_SEVENTH]: "减小七和弦",
  [ChordTypeName.DIMINISHED_SEVENTH]: "减减七和弦",
  [ChordTypeName.AUGMENTED_MAJOR_SEVENTH]: "增大七和弦",
};

const TYPE_SYMBOL_SUFFIX: Record<ChordTypeName, string> = {
  [ChordTypeName.MAJOR_TRIAD]: "",
  [ChordTypeName.MINOR_TRIAD]: "m",
  [ChordTypeName.AUGMENTED_TRIAD]: "aug",
  [ChordTypeName.DIMINISHED_TRIAD]: "dim",
  [ChordTypeName.MAJOR_MAJOR_SEVENTH]: "maj7",
  [ChordTypeName.MAJOR_MINOR_SEVENTH]: "7",
  [ChordTypeName.MINOR_MAJOR_SEVENTH]: "mM7",
  [ChordTypeName.MINOR_MINOR_SEVENTH]: "m7",
  [ChordTypeName.DIMINISHED_MINOR_SEVENTH]: "m7♭5",
  [ChordTypeName.DIMINISHED_SEVENTH]: "dim7",
  [ChordTypeName.AUGMENTED_MAJOR_SEVENTH]: "aug(maj7)",
};

// Inversion name suffix for triads (inversionIndex → suffix appended to chord type name)
const TRIAD_INVERSION_SUFFIX: Record<number, string> = {
  0: "", // root position: "大三和弦"
  1: "六和弦", // first inversion: "大三六和弦" etc. (replace "和弦" with "六和弦")
  2: "四六和弦", // second inversion
};

// Inversion name suffix for seventh chords
const SEVENTH_INVERSION_SUFFIX: Record<number, string> = {
  0: "", // root position
  1: "五六和弦", // first inversion
  2: "三四和弦", // second inversion
  3: "二和弦", // third inversion
};

function isTriad(type: ChordTypeName): boolean {
  return (
    type === ChordTypeName.MAJOR_TRIAD ||
    type === ChordTypeName.MINOR_TRIAD ||
    type === ChordTypeName.AUGMENTED_TRIAD ||
    type === ChordTypeName.DIMINISHED_TRIAD
  );
}

function chordRootChineseName(chord: Chord): string {
  const letter = NoteNameBase[chord.root.whiteKeyNote.noteNameBase];
  const acc = CHINESE_ACCIDENTAL[chord.root.accidental] ?? "";
  return acc + letter;
}

// Returns the full Chinese name of the chord voicing.
// Examples: "C大三和弦", "升C小三六和弦", "G大小七和弦/B"
export function getFullChineseName(voicing: ChordVoicing): string {
  const rootName = chordRootChineseName(voicing.chord);
  const typeName = CHINESE_TYPE_NAME[voicing.chord.type];
  const invIdx = voicing.getInversionIndex();
  const noteCount = voicing.chord.getSemitoneIntervals().length;

  // Generalized inversion: invIdx >= noteCount
  if (invIdx >= noteCount) {
    const bass = voicing.notes[0];
    const bassLetter = NoteNameBase[bass.whiteKeyNote.noteNameBase];
    const bassAcc = CHINESE_ACCIDENTAL[bass.accidental] ?? "";
    const bassName = bassAcc + bassLetter;
    return rootName + typeName + "/" + bassName;
  }

  if (isTriad(voicing.chord.type)) {
    const suffix = TRIAD_INVERSION_SUFFIX[invIdx] ?? "";
    if (invIdx === 0) {
      return rootName + typeName;
    }
    // Replace the trailing "和弦" in typeName with the inversion suffix
    const baseTypeName = typeName.replace(/三和弦$/, "");
    return rootName + baseTypeName + suffix;
  } else {
    const suffix = SEVENTH_INVERSION_SUFFIX[invIdx] ?? "";
    if (invIdx === 0) {
      return rootName + typeName;
    }
    const baseTypeName = typeName.replace(/七和弦$/, "");
    return rootName + baseTypeName + suffix;
  }
}

// Returns the chord symbol string for display.
// Examples: "C", "Cm", "F#maj7", "Bb7/D", "Ab m7♭5/Gb"
export function getChordSymbol(voicing: ChordVoicing): string {
  const root = voicing.chord.root;
  const rootLetter = NoteNameBase[root.whiteKeyNote.noteNameBase];
  const rootAcc = DISPLAY_ACCIDENTAL[root.accidental] ?? "";
  const typeSuffix = TYPE_SYMBOL_SUFFIX[voicing.chord.type];
  const chordSymbol = rootLetter + rootAcc + typeSuffix;

  const invIdx = voicing.getInversionIndex();
  if (invIdx === 0) return chordSymbol;

  const bass = voicing.notes[0];
  const bassLetter = NoteNameBase[bass.whiteKeyNote.noteNameBase];
  const bassAcc = DISPLAY_ACCIDENTAL[bass.accidental] ?? "";
  return chordSymbol + "/" + bassLetter + bassAcc;
}
