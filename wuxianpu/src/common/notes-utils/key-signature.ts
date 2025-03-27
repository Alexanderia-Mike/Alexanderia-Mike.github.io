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

export function getKeySignatureNoteNameBase(
    keySignature: KeySignature
): NoteNameBase {
    return getKeySignatureTonics(keySignature, 0).whiteKeyNote.noteNameBase
}

export function getKeySignatureTonics(
    keySignature: KeySignature,
    octave: number
): NoteName {
    switch (keySignature) {
        case KeySignature.A:
            return new NoteName(new WhiteKeyNoteName(NoteNameBase.A, octave))
        case KeySignature.B:
            return new NoteName(new WhiteKeyNoteName(NoteNameBase.B, octave))
        case KeySignature.C:
            return new NoteName(new WhiteKeyNoteName(NoteNameBase.C, octave))
        case KeySignature.D:
            return new NoteName(new WhiteKeyNoteName(NoteNameBase.D, octave))
        case KeySignature.E:
            return new NoteName(new WhiteKeyNoteName(NoteNameBase.E, octave))
        case KeySignature.F:
            return new NoteName(new WhiteKeyNoteName(NoteNameBase.F, octave))
        case KeySignature.G:
            return new NoteName(new WhiteKeyNoteName(NoteNameBase.G, octave))
        case KeySignature.SHARP_C:
            return new NoteName(
                new WhiteKeyNoteName(NoteNameBase.C, octave),
                Accidental.SHARP
            )
        case KeySignature.SHARP_F:
            return new NoteName(
                new WhiteKeyNoteName(NoteNameBase.F, octave),
                Accidental.SHARP
            )
        case KeySignature.FLAT_A:
            return new NoteName(
                new WhiteKeyNoteName(NoteNameBase.A, octave),
                Accidental.FLAT
            )
        case KeySignature.FLAT_B:
            return new NoteName(
                new WhiteKeyNoteName(NoteNameBase.B, octave),
                Accidental.FLAT
            )
        case KeySignature.FLAT_C:
            return new NoteName(
                new WhiteKeyNoteName(NoteNameBase.C, octave),
                Accidental.FLAT
            )
        case KeySignature.FLAT_D:
            return new NoteName(
                new WhiteKeyNoteName(NoteNameBase.D, octave),
                Accidental.FLAT
            )
        case KeySignature.FLAT_E:
            return new NoteName(
                new WhiteKeyNoteName(NoteNameBase.E, octave),
                Accidental.FLAT
            )
        case KeySignature.FLAT_G:
            return new NoteName(
                new WhiteKeyNoteName(NoteNameBase.G, octave),
                Accidental.FLAT
            )
    }
}
export function getSharpNotesForKey(
    keySignature: KeySignature
): NoteNameBase[] {
    switch (keySignature) {
        case KeySignature.SHARP_C:
            return [
                NoteNameBase.F,
                NoteNameBase.C,
                NoteNameBase.G,
                NoteNameBase.D,
                NoteNameBase.A,
                NoteNameBase.E,
                NoteNameBase.C,
            ]
        case KeySignature.SHARP_F:
            return [
                NoteNameBase.F,
                NoteNameBase.C,
                NoteNameBase.G,
                NoteNameBase.D,
                NoteNameBase.A,
                NoteNameBase.E,
            ]
        case KeySignature.B:
            return [
                NoteNameBase.F,
                NoteNameBase.C,
                NoteNameBase.G,
                NoteNameBase.D,
                NoteNameBase.A,
            ]
        case KeySignature.E:
            return [
                NoteNameBase.F,
                NoteNameBase.C,
                NoteNameBase.G,
                NoteNameBase.D,
            ]
        case KeySignature.A:
            return [NoteNameBase.F, NoteNameBase.C, NoteNameBase.G]
        case KeySignature.D:
            return [NoteNameBase.F, NoteNameBase.C]
        case KeySignature.G:
            return [NoteNameBase.F]
        default:
            return []
    }
}
export function getFlatNotesForKey(keySignature: KeySignature): NoteNameBase[] {
    switch (keySignature) {
        case KeySignature.FLAT_C:
            return [
                NoteNameBase.B,
                NoteNameBase.E,
                NoteNameBase.A,
                NoteNameBase.D,
                NoteNameBase.G,
                NoteNameBase.C,
                NoteNameBase.F,
            ]
        case KeySignature.FLAT_G:
            return [
                NoteNameBase.B,
                NoteNameBase.E,
                NoteNameBase.A,
                NoteNameBase.D,
                NoteNameBase.G,
                NoteNameBase.C,
            ]
        case KeySignature.FLAT_D:
            return [
                NoteNameBase.B,
                NoteNameBase.E,
                NoteNameBase.A,
                NoteNameBase.D,
                NoteNameBase.G,
            ]
        case KeySignature.FLAT_A:
            return [
                NoteNameBase.B,
                NoteNameBase.E,
                NoteNameBase.A,
                NoteNameBase.D,
            ]
        case KeySignature.FLAT_E:
            return [NoteNameBase.B, NoteNameBase.E, NoteNameBase.A]
        case KeySignature.FLAT_B:
            return [NoteNameBase.B, NoteNameBase.E]
        case KeySignature.F:
            return [NoteNameBase.B]
        default:
            return []
    }
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
