import { KeySignature } from './key-signature'
import {
    PitchNotation,
    helmholtzToScientific,
    scientificToHelmholtz,
} from './pitch-notation'
import { GeneralSolfege, Solfege } from './solfege'

export enum WhiteKeyNoteName {
    c5 = 52,
    b4 = 51,
    a4 = 50,
    g4 = 49,
    f4 = 48,
    e4 = 47,
    d4 = 46,
    c4 = 45,
    b3 = 44,
    a3 = 43,
    g3 = 42,
    f3 = 41,
    e3 = 40,
    d3 = 39,
    c3 = 38,
    b2 = 37,
    a2 = 36,
    g2 = 35,
    f2 = 34,
    e2 = 33,
    d2 = 32,
    c2 = 31,
    b1 = 30,
    a1 = 29,
    g1 = 28,
    f1 = 27,
    e1 = 26,
    d1 = 25,
    c1 = 24,
    b = 23,
    a = 22,
    g = 21,
    f = 20,
    e = 19,
    d = 18,
    c = 17,
    B = 16,
    A = 15,
    G = 14,
    F = 13,
    E = 12,
    D = 11,
    C = 10,
    B1 = 9,
    A1 = 8,
    G1 = 7,
    F1 = 6,
    E1 = 5,
    D1 = 4,
    C1 = 3,
    B2 = 2,
    A2 = 1,
}
const whiteKeyNoteNameToSemiNoteCount: Record<WhiteKeyNoteName, number> = {
    [WhiteKeyNoteName.c5]: 108,
    [WhiteKeyNoteName.b4]: 107,
    [WhiteKeyNoteName.a4]: 105,
    [WhiteKeyNoteName.g4]: 103,
    [WhiteKeyNoteName.f4]: 101,
    [WhiteKeyNoteName.e4]: 100,
    [WhiteKeyNoteName.d4]: 98,
    [WhiteKeyNoteName.c4]: 96,
    [WhiteKeyNoteName.b3]: 95,
    [WhiteKeyNoteName.a3]: 93,
    [WhiteKeyNoteName.g3]: 91,
    [WhiteKeyNoteName.f3]: 89,
    [WhiteKeyNoteName.e3]: 88,
    [WhiteKeyNoteName.d3]: 86,
    [WhiteKeyNoteName.c3]: 84,
    [WhiteKeyNoteName.b2]: 83,
    [WhiteKeyNoteName.a2]: 81,
    [WhiteKeyNoteName.g2]: 79,
    [WhiteKeyNoteName.f2]: 77,
    [WhiteKeyNoteName.e2]: 76,
    [WhiteKeyNoteName.d2]: 74,
    [WhiteKeyNoteName.c2]: 72,
    [WhiteKeyNoteName.b1]: 71,
    [WhiteKeyNoteName.a1]: 69,
    [WhiteKeyNoteName.g1]: 67,
    [WhiteKeyNoteName.f1]: 65,
    [WhiteKeyNoteName.e1]: 64,
    [WhiteKeyNoteName.d1]: 62,
    [WhiteKeyNoteName.c1]: 60,
    [WhiteKeyNoteName.b]: 59,
    [WhiteKeyNoteName.a]: 57,
    [WhiteKeyNoteName.g]: 55,
    [WhiteKeyNoteName.f]: 53,
    [WhiteKeyNoteName.e]: 52,
    [WhiteKeyNoteName.d]: 50,
    [WhiteKeyNoteName.c]: 48,
    [WhiteKeyNoteName.B]: 47,
    [WhiteKeyNoteName.A]: 45,
    [WhiteKeyNoteName.G]: 43,
    [WhiteKeyNoteName.F]: 41,
    [WhiteKeyNoteName.E]: 40,
    [WhiteKeyNoteName.D]: 38,
    [WhiteKeyNoteName.C]: 36,
    [WhiteKeyNoteName.B1]: 35,
    [WhiteKeyNoteName.A1]: 33,
    [WhiteKeyNoteName.G1]: 31,
    [WhiteKeyNoteName.F1]: 29,
    [WhiteKeyNoteName.E1]: 28,
    [WhiteKeyNoteName.D1]: 26,
    [WhiteKeyNoteName.C1]: 24,
    [WhiteKeyNoteName.B2]: 23,
    [WhiteKeyNoteName.A2]: 21,
}

export enum Accidental {
    NONE = 0,
    SHARP = 1,
    FLAT = -1,
    DOUBLE_SHARP = 2,
    DOUBLE_FLAT = -2,
    NATURAL = 10,
}
const accidentalToString: Record<Accidental, string> = {
    [Accidental.NONE]: '',
    [Accidental.SHARP]: '升',
    [Accidental.FLAT]: '降',
    [Accidental.DOUBLE_SHARP]: '重升',
    [Accidental.DOUBLE_FLAT]: '重降',
    [Accidental.NATURAL]: '还原',
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
        // TODO: should we consider adding 调号?
        let whiteKeyName = WhiteKeyNoteName[this.whiteKeyNote]
        if (pitchNotation == PitchNotation.SCIENTIFIC) {
            whiteKeyName = helmholtzToScientific(whiteKeyName)
        }
        return accidentalToString[this.accidental] + whiteKeyName
    }
    toValue(): number {
        // TODO: if accidental is None, then needs to depend on 调号
        if (this.accidental != Accidental.NATURAL)
            return (
                whiteKeyNoteNameToSemiNoteCount[this.whiteKeyNote] +
                this.accidental
            )
        else return this.whiteKeyNote
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

export function parseWhiteKeyNoteName(
    noteString: string,
    pitchNotation: PitchNotation = PitchNotation.HELMHOLTZ
): WhiteKeyNoteName | undefined {
    if (pitchNotation == PitchNotation.SCIENTIFIC) {
        noteString = scientificToHelmholtz(noteString)
    }
    return WhiteKeyNoteName[noteString as keyof typeof WhiteKeyNoteName]
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
        if (accidentalSymbol == Accidental.NATURAL)
            throw new Error('natural symbol should not be allowed here!')
        return whiteKeyName && new NoteName(whiteKeyName, accidentalSymbol)
    } else {
        return whiteKeyName && new NoteName(whiteKeyName, Accidental.NONE)
    }
}

export type OptionalNote = NoteName | undefined
