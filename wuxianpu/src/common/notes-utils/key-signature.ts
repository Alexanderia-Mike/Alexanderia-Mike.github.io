import { Accidental, NoteName, NoteNameBase, WhiteKeyNoteName } from './notes'

export enum KeySignature {
    C = 0,
    G = 1,
    D = 2,
    A = 3,
    E = 4,
    B = 5,
    SHARP_F = 6,
    SHARP_C = 7,
    F = -1,
    FLAT_B = -2,
    FLAT_E = -3,
    FLAT_A = -4,
    FLAT_D = -5,
    FLAT_G = -6,
    FLAT_C = -7,
}

type KeySignatureEntry = {
    tonic: (octave: number) => NoteName
    sharpNotes: NoteNameBase[]
    flatNotes: NoteNameBase[]
}

const KEY_SIGNATURE_TABLE: Record<KeySignature, KeySignatureEntry> = {
    [KeySignature.C]: {
        tonic: (octave) => new NoteName(new WhiteKeyNoteName(NoteNameBase.C, octave)),
        sharpNotes: [],
        flatNotes: [],
    },
    [KeySignature.G]: {
        tonic: (octave) => new NoteName(new WhiteKeyNoteName(NoteNameBase.G, octave)),
        sharpNotes: [NoteNameBase.F],
        flatNotes: [],
    },
    [KeySignature.D]: {
        tonic: (octave) => new NoteName(new WhiteKeyNoteName(NoteNameBase.D, octave)),
        sharpNotes: [NoteNameBase.F, NoteNameBase.C],
        flatNotes: [],
    },
    [KeySignature.A]: {
        tonic: (octave) => new NoteName(new WhiteKeyNoteName(NoteNameBase.A, octave)),
        sharpNotes: [NoteNameBase.F, NoteNameBase.C, NoteNameBase.G],
        flatNotes: [],
    },
    [KeySignature.E]: {
        tonic: (octave) => new NoteName(new WhiteKeyNoteName(NoteNameBase.E, octave)),
        sharpNotes: [NoteNameBase.F, NoteNameBase.C, NoteNameBase.G, NoteNameBase.D],
        flatNotes: [],
    },
    [KeySignature.B]: {
        tonic: (octave) => new NoteName(new WhiteKeyNoteName(NoteNameBase.B, octave)),
        sharpNotes: [NoteNameBase.F, NoteNameBase.C, NoteNameBase.G, NoteNameBase.D, NoteNameBase.A],
        flatNotes: [],
    },
    [KeySignature.SHARP_F]: {
        tonic: (octave) => new NoteName(new WhiteKeyNoteName(NoteNameBase.F, octave), Accidental.SHARP),
        sharpNotes: [NoteNameBase.F, NoteNameBase.C, NoteNameBase.G, NoteNameBase.D, NoteNameBase.A, NoteNameBase.E],
        flatNotes: [],
    },
    [KeySignature.SHARP_C]: {
        tonic: (octave) => new NoteName(new WhiteKeyNoteName(NoteNameBase.C, octave), Accidental.SHARP),
        sharpNotes: [NoteNameBase.F, NoteNameBase.C, NoteNameBase.G, NoteNameBase.D, NoteNameBase.A, NoteNameBase.E, NoteNameBase.C],
        flatNotes: [],
    },
    [KeySignature.F]: {
        tonic: (octave) => new NoteName(new WhiteKeyNoteName(NoteNameBase.F, octave)),
        sharpNotes: [],
        flatNotes: [NoteNameBase.B],
    },
    [KeySignature.FLAT_B]: {
        tonic: (octave) => new NoteName(new WhiteKeyNoteName(NoteNameBase.B, octave), Accidental.FLAT),
        sharpNotes: [],
        flatNotes: [NoteNameBase.B, NoteNameBase.E],
    },
    [KeySignature.FLAT_E]: {
        tonic: (octave) => new NoteName(new WhiteKeyNoteName(NoteNameBase.E, octave), Accidental.FLAT),
        sharpNotes: [],
        flatNotes: [NoteNameBase.B, NoteNameBase.E, NoteNameBase.A],
    },
    [KeySignature.FLAT_A]: {
        tonic: (octave) => new NoteName(new WhiteKeyNoteName(NoteNameBase.A, octave), Accidental.FLAT),
        sharpNotes: [],
        flatNotes: [NoteNameBase.B, NoteNameBase.E, NoteNameBase.A, NoteNameBase.D],
    },
    [KeySignature.FLAT_D]: {
        tonic: (octave) => new NoteName(new WhiteKeyNoteName(NoteNameBase.D, octave), Accidental.FLAT),
        sharpNotes: [],
        flatNotes: [NoteNameBase.B, NoteNameBase.E, NoteNameBase.A, NoteNameBase.D, NoteNameBase.G],
    },
    [KeySignature.FLAT_G]: {
        tonic: (octave) => new NoteName(new WhiteKeyNoteName(NoteNameBase.G, octave), Accidental.FLAT),
        sharpNotes: [],
        flatNotes: [NoteNameBase.B, NoteNameBase.E, NoteNameBase.A, NoteNameBase.D, NoteNameBase.G, NoteNameBase.C],
    },
    [KeySignature.FLAT_C]: {
        tonic: (octave) => new NoteName(new WhiteKeyNoteName(NoteNameBase.C, octave), Accidental.FLAT),
        sharpNotes: [],
        flatNotes: [NoteNameBase.B, NoteNameBase.E, NoteNameBase.A, NoteNameBase.D, NoteNameBase.G, NoteNameBase.C, NoteNameBase.F],
    },
}

export function getKeySignatureNoteNameBase(
    keySignature: KeySignature
): NoteNameBase {
    return getKeySignatureTonics(keySignature, 0).whiteKeyNote.noteNameBase
}

export function getKeySignatureTonics(
    keySignature: KeySignature,
    octave: number
): NoteName {
    return KEY_SIGNATURE_TABLE[keySignature].tonic(octave)
}

export function getSharpNotesForKey(
    keySignature: KeySignature
): NoteNameBase[] {
    return KEY_SIGNATURE_TABLE[keySignature].sharpNotes
}

export function getFlatNotesForKey(keySignature: KeySignature): NoteNameBase[] {
    return KEY_SIGNATURE_TABLE[keySignature].flatNotes
}

export function noteInKeys(
    noteName: NoteName,
    keySignature: KeySignature
): boolean {
    const sharpNotesForKey = getSharpNotesForKey(keySignature)
    const flatNotesForKey = getFlatNotesForKey(keySignature)
    const baseNoteName = noteName.whiteKeyNote.noteNameBase
    const matchSharp = sharpNotesForKey.includes(baseNoteName)
    const matchFlat = flatNotesForKey.includes(baseNoteName)
    switch (noteName.accidental) {
        case Accidental.SHARP:
            return matchSharp
        case Accidental.FLAT:
            return matchFlat
        case Accidental.NONE:
            return !matchSharp && !matchFlat
        default:
            return false
    }
}
