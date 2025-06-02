import {
    getKeySignatureNoteNameBase,
    getKeySignatureTonics,
    KeySignature,
} from './key-signature'
import {
    Accidental,
    accidentalToString,
    NoteName,
    NoteNameBase,
    OptionalNote,
    WhiteKeyNoteName,
} from './notes'
import { PitchNotation } from './pitch-notation'
import {
    Solfege,
    GeneralSolfege,
    OptionalSolfege,
    getSolfegeSeminoteCount,
} from './solfege'

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
// WARN: it's not the same interval in music theory. It's 0 when two notes are equal
export function getIntervalWhiteKey(
    note1: WhiteKeyNoteName,
    note2: WhiteKeyNoteName
): number {
    return (
        (note2.octave - note1.octave) * 7 +
        (numberedNoteNameBase[note2.noteNameBase] -
            numberedNoteNameBase[note1.noteNameBase])
    )
}

// WARN: it's not the same interval in music theory. It's 0 when two notes are equal
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

export function noteValueToNoteName(noteValue: number): NoteName {
    const octave = Math.floor(noteValue / 12) - 1
    const noteValueWithinOctave = noteValue % 12
    const noteBase = Object.values(NoteNameBase)
        .filter((v) => typeof v === 'number')
        .filter((v) => v <= noteValueWithinOctave)
        .sort((a, b) => b - a)[0] as NoteNameBase
    const accidental = (noteValueWithinOctave - noteBase) as Accidental

    const whiteKeyNoteName = new WhiteKeyNoteName(noteBase, octave)
    return new NoteName(whiteKeyNoteName, accidental)
}

export function adjustNote(note: NoteName, semitoneCount: number): NoteName {
    const noteValue = note.valueOf()
    const newNoteValue = noteValue + semitoneCount
    return noteValueToNoteName(newNoteValue)
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

export function parseSolfege(solfegeString: string): Solfege | undefined {
    try {
        return parseInt(solfegeString) as Solfege
    } catch (e) {
        console.log(`cannot parse ${solfegeString} as Solfege`)
        console.log((e as Error).message)
        return undefined
    }
}

export function parseGeneralSolfege(
    generalSolfegeString: string
): OptionalSolfege {
    const prefix = generalSolfegeString.includes(' ')
        ? generalSolfegeString.split(' ')[0]
        : ''
    const solfegeString = generalSolfegeString.slice(prefix.length).trim()
    const accidental = Object.entries(accidentalToString).find(
        (pair) => pair[1] == prefix
    )
    const solfege = parseSolfege(solfegeString)
    if (accidental) {
        const accidentalSymbol = parseInt(accidental[0]) as Accidental
        return solfege && new GeneralSolfege(solfege, accidentalSymbol)
    } else {
        return solfege && new GeneralSolfege(solfege, Accidental.NONE)
    }
}

export function noteNameToSolfege(
    noteName: NoteName,
    keySignature: KeySignature
): GeneralSolfege {
    const tonicNoteBase = getKeySignatureNoteNameBase(keySignature)
    const octave =
        noteName.whiteKeyNote.noteNameBase >= tonicNoteBase
            ? noteName.whiteKeyNote.octave
            : noteName.whiteKeyNote.octave - 1
    const tonic = getKeySignatureTonics(keySignature, octave)
    const interval = getInterval(tonic, noteName)
    const solfege = (interval + 1) as Solfege
    const accidental = (getSemitoneCount(tonic, noteName) -
        getSolfegeSeminoteCount(solfege)) as Accidental
    return new GeneralSolfege(solfege, accidental)
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
