import { PitchNotation } from './pitch-notation'

export enum NoteNameBase {
    C = 0,
    D = 2,
    E = 4,
    F = 5,
    G = 7,
    A = 9,
    B = 11,
}

// base value = 12
export class WhiteKeyNoteName {
    noteNameBase: NoteNameBase
    octave: number // same to scientific notation

    constructor(noteNameBase: NoteNameBase, octave: number) {
        this.noteNameBase = noteNameBase
        this.octave = octave
    }

    valueOf(): number {
        return 12 + this.octave * 12 + this.noteNameBase
    }

    toString(pitchNotation: PitchNotation): string {
        const noteNameBaseString = NoteNameBase[this.noteNameBase]
        switch (pitchNotation) {
            case PitchNotation.SCIENTIFIC:
                return noteNameBaseString + this.octave
            case PitchNotation.HELMHOLTZ:
                if (this.octave < 2) {
                    return noteNameBaseString + (2 - this.octave)
                } else if (this.octave == 2) {
                    return noteNameBaseString
                } else if (this.octave == 3) {
                    return noteNameBaseString.toLowerCase()
                } else {
                    return noteNameBaseString.toLowerCase() + (this.octave - 3)
                }
        }
    }
}

export enum Accidental {
    NONE = 0,
    SHARP = 1,
    FLAT = -1,
    DOUBLE_SHARP = 2,
    DOUBLE_FLAT = -2,
}
export const accidentalToString: Record<Accidental, string> = {
    [Accidental.NONE]: '',
    [Accidental.SHARP]: '升',
    [Accidental.FLAT]: '降',
    [Accidental.DOUBLE_SHARP]: '重升',
    [Accidental.DOUBLE_FLAT]: '重降',
}

export class NoteName {
    whiteKeyNote: WhiteKeyNoteName
    accidental: Accidental
    constructor(
        whiteKeyNote: WhiteKeyNoteName,
        accidental: Accidental = Accidental.NONE
    ) {
        this.whiteKeyNote = whiteKeyNote
        this.accidental = accidental
    }
    toString(pitchNotation: PitchNotation = PitchNotation.HELMHOLTZ): string {
        let whiteKeyName = this.whiteKeyNote.toString(pitchNotation)
        return accidentalToString[this.accidental] + whiteKeyName
    }
    valueOf(): number {
        return this.whiteKeyNote.valueOf() + this.accidental
    }
    equals(other: NoteName): boolean {
        return (
            this.accidental == other.accidental &&
            this.whiteKeyNote == other.whiteKeyNote
        )
    }
    copy(newAccidental: Accidental): NoteName {
        return new NoteName(this.whiteKeyNote, newAccidental)
    }
}

export type OptionalNote = NoteName | undefined

function getAllWhiteKeys(): WhiteKeyNoteName[] {
    let whiteKeys: WhiteKeyNoteName[] = []
    for (let octave = 0; octave <= 8; octave++) {
        if (octave == 0) {
            whiteKeys.push(new WhiteKeyNoteName(NoteNameBase.A, octave))
            whiteKeys.push(new WhiteKeyNoteName(NoteNameBase.B, octave))
        } else if (octave == 8) {
            whiteKeys.push(new WhiteKeyNoteName(NoteNameBase.C, octave))
        } else {
            for (let noteNameBase of Object.entries(NoteNameBase)
                .filter(([_, v]) => typeof v == 'number')
                .map(([_, v]) => v as NoteNameBase)
                .sort((a, b) => a - b)) {
                whiteKeys.push(new WhiteKeyNoteName(noteNameBase, octave))
            }
        }
    }
    return whiteKeys
}
export const ALL_WHITE_KEYS: WhiteKeyNoteName[] = getAllWhiteKeys()
