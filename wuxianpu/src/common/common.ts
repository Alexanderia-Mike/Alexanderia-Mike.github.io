export interface Hiddable {
    hide?: boolean
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
    FLAT = 2,
    DOUBLE_SHARP = 3,
    DOUBLE_FLAT = 4,
}

export class NoteName {
    whiteKeyNote: WhiteKeyNoteName;
    upDownSymbol: UpDownSymbol;
    constructor(whiteKeyNote: WhiteKeyNoteName, upDownSymbol: UpDownSymbol = UpDownSymbol.NONE) {
        this.whiteKeyNote = whiteKeyNote
        this.upDownSymbol = upDownSymbol
    }
    toString(): String {
        const whiteKeyName = WhiteKeyNoteName[this.whiteKeyNote]
        switch(this.upDownSymbol) {
            case UpDownSymbol.NONE: return whiteKeyName
            case UpDownSymbol.SHARP: return "#" + whiteKeyName
            case UpDownSymbol.FLAT: return "b" + whiteKeyName
            case UpDownSymbol.DOUBLE_SHARP: return "x" + whiteKeyName
            case UpDownSymbol.DOUBLE_FLAT: return "bb" + whiteKeyName
        }
    }
}

export function generateNoteName(noteString: string): WhiteKeyNoteName | undefined {
    return WhiteKeyNoteName[noteString as keyof typeof WhiteKeyNoteName]
}
