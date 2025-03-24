import { KeySignature } from './key-signature'
import {
    Accidental,
    accidentalToString,
    NoteName,
    NoteNameBase,
    OptionalNote,
    WhiteKeyNoteName,
} from './notes'
import { PitchNotation } from './pitch-notation'
import { Solfege, GeneralSolfege } from './solfege'

const numberedNoteNameBase: Record<NoteNameBase, number> = {
    [NoteNameBase.C]: 0,
    [NoteNameBase.D]: 1,
    [NoteNameBase.E]: 2,
    [NoteNameBase.F]: 3,
    [NoteNameBase.G]: 4,
    [NoteNameBase.A]: 5,
    [NoteNameBase.B]: 6,
}

// interval from note1 rising to note2. Negative if note1 is higher than note2
export function getIntervalWhiteKey(
    note1: WhiteKeyNoteName,
    note2: WhiteKeyNoteName
): number {
    return (
        (note2.octave - note1.octave) * 7 +
        (numberedNoteNameBase[note2.noteNameBase] -
            numberedNoteNameBase[note1.noteNameBase]) +
        1
    )
}

export function getInterval(note1: NoteName, note2: NoteName): number {
    return getIntervalWhiteKey(note1.whiteKeyNote, note2.whiteKeyNote)
}

// number of seminotes from note1 rising to note2. Negative if note1 is higher than note2
export function getSemitoneCount(note1: NoteName, note2: NoteName): number {
    return note2.valueOf() - note1.valueOf()
}
export function parseWhiteKeyNoteName(
    noteString: string,
    pitchNotation: PitchNotation = PitchNotation.HELMHOLTZ
): WhiteKeyNoteName | undefined {
    if (pitchNotation == PitchNotation.SCIENTIFIC) {
        let noteLetter = noteString[0].toUpperCase()
        const octave = parseInt(noteString[1])
        return new WhiteKeyNoteName(
            NoteNameBase[noteLetter as keyof typeof NoteNameBase],
            octave
        )
    } else {
        let noteLetter = noteString[0]
        const octaveString = noteString[1]
        const noteNameBase =
            NoteNameBase[noteLetter.toUpperCase() as keyof typeof NoteNameBase]
        const isLowerCase = noteLetter.match(/[a-z]/) != null
        if (octaveString == undefined) {
            if (isLowerCase) {
                return new WhiteKeyNoteName(noteNameBase, 3)
            } else {
                return new WhiteKeyNoteName(noteNameBase, 2)
            }
        }
        const octave = parseInt(octaveString)
        if (isLowerCase) {
            return new WhiteKeyNoteName(noteNameBase, octave + 3)
        } else {
            return new WhiteKeyNoteName(noteNameBase, 2 - octave)
        }
    }
}

export function parseNoteName(
    noteString: string,
    pitchNotation: PitchNotation
): OptionalNote {
    const prefix = noteString.includes(' ') ? noteString.split(' ')[0] : ''
    const whiteKeyNoteName = noteString.slice(prefix.length).trim()
    const accidental = Object.entries(accidentalToString).find(
        (pair) => pair[1] == prefix
    )
    const whiteKeyName = parseWhiteKeyNoteName(whiteKeyNoteName, pitchNotation)
    if (accidental) {
        const accidentalSymbol = parseInt(accidental[0]) as Accidental
        return whiteKeyName && new NoteName(whiteKeyName, accidentalSymbol)
    } else {
        return whiteKeyName && new NoteName(whiteKeyName, Accidental.NONE)
    }
}
export function whiteKeyNoteToSolfege(
    whiteKeyNote: WhiteKeyNoteName,
    keySignature: KeySignature
): Solfege {
    // TODO
    return Solfege.Do
}

export function noteNameToSolfege(
    noteName: NoteName,
    keySignature: KeySignature
): GeneralSolfege {
    // TODO
    return new GeneralSolfege(Solfege.Do, Accidental.NONE)
}
function getSharpNotesForKey(keySignature: KeySignature): NoteNameBase[] {
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
function getFlatNotesForKey(keySignature: KeySignature): NoteNameBase[] {
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
export function helmholtzToScientific(noteString: string): string | undefined {
    return parseNoteName(noteString, PitchNotation.HELMHOLTZ)?.toString(
        PitchNotation.SCIENTIFIC
    )
}

export function scientificToHelmholtz(noteString: string): string | undefined {
    return parseNoteName(noteString, PitchNotation.SCIENTIFIC)?.toString(
        PitchNotation.HELMHOLTZ
    )
}
