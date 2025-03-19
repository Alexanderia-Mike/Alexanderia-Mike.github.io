export interface Hiddable {
    hide?: boolean
}

export interface ExtraClassNames {
    classNames?: string
}

export interface WithChildren {
    children?: React.ReactNode
}

export enum WhiteKeyNoteName {
    c5 = 108,
    b4 = 107,
    a4 = 105,
    g4 = 103,
    f4 = 101,
    e4 = 100,
    d4 = 98,
    c4 = 96,
    b3 = 95,
    a3 = 93,
    g3 = 91,
    f3 = 89,
    e3 = 88,
    d3 = 86,
    c3 = 84,
    b2 = 83,
    a2 = 81,
    g2 = 79,
    f2 = 77,
    e2 = 76,
    d2 = 74,
    c2 = 72,
    b1 = 71,
    a1 = 69,
    g1 = 67,
    f1 = 65,
    e1 = 64,
    d1 = 62,
    c1 = 60,
    b = 59,
    a = 57,
    g = 55,
    f = 53,
    e = 52,
    d = 50,
    c = 48,
    B = 47,
    A = 45,
    G = 43,
    F = 41,
    E = 40,
    D = 38,
    C = 36,
    B1 = 35,
    A1 = 33,
    G1 = 31,
    F1 = 29,
    E1 = 28,
    D1 = 26,
    C1 = 24,
    B2 = 23,
    A2 = 21,
}

export enum UpDownSymbol {
    NONE = 0,
    SHARP = 1,
    FLAT = -1,
    DOUBLE_SHARP = 2,
    DOUBLE_FLAT = -2,
    NATURAL = 10,
}

const upDownSymbolToString: Record<UpDownSymbol, string> = {
    [UpDownSymbol.NONE]: '',
    [UpDownSymbol.SHARP]: '#',
    [UpDownSymbol.FLAT]: 'b',
    [UpDownSymbol.DOUBLE_SHARP]: 'x',
    [UpDownSymbol.DOUBLE_FLAT]: 'v', // use v to denote double-flat
    [UpDownSymbol.NATURAL]: '@', // use @ to denote natural
}

export class NoteName {
    whiteKeyNote: WhiteKeyNoteName
    upDownSymbol: UpDownSymbol
    constructor(
        whiteKeyNote: WhiteKeyNoteName,
        upDownSymbol: UpDownSymbol = UpDownSymbol.NONE
    ) {
        this.whiteKeyNote = whiteKeyNote
        this.upDownSymbol = upDownSymbol
    }
    toString(): String {
        // TODO should we consider adding 调号?
        const whiteKeyName = WhiteKeyNoteName[this.whiteKeyNote]
        return upDownSymbolToString[this.upDownSymbol] + whiteKeyName
    }
    toValue(): number {
        // TODO: if upDownSymbol is None, then needs to depend on 调号
        if (this.upDownSymbol != UpDownSymbol.NATURAL)
            return this.whiteKeyNote + this.upDownSymbol;
        else
            return this.whiteKeyNote
    }
    equals(other: NoteName): boolean {
        return this.upDownSymbol == other.upDownSymbol && this.whiteKeyNote == other.whiteKeyNote
    }
    copy(newUpDownSymbol: UpDownSymbol): NoteName {
        return new NoteName(this.whiteKeyNote, newUpDownSymbol)
    }
}

export function parseWhiteKeyNoteName(
    noteString: string
): WhiteKeyNoteName | undefined {
    return WhiteKeyNoteName[noteString as keyof typeof WhiteKeyNoteName]
}

export function parseNoteName(noteString: string): OptionalNote {
    const prefix = noteString[0]
    const upDown = Object.entries(upDownSymbolToString).find(
        (pair) => pair[1] == prefix
    )
    // TODO: natural symbol should not be allowed here
    if (upDown) {
        const whiteKeyName = parseWhiteKeyNoteName(noteString.slice(1))
        return (
            whiteKeyName &&
            new NoteName(
                whiteKeyName,
                UpDownSymbol[prefix as keyof typeof UpDownSymbol]
            )
        )
    } else {
        const whiteKeyName = parseWhiteKeyNoteName(noteString)
        return whiteKeyName && new NoteName(whiteKeyName, UpDownSymbol.NONE)
    }
}

export type OptionalNote = NoteName | undefined