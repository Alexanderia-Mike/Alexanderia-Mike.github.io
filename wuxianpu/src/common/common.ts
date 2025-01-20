export interface Hiddable {
    hide?: boolean
}

export enum NoteName {
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
}

export function generateNoteName(noteString: string): NoteName | undefined {
    return NoteName[noteString as keyof typeof NoteName]
}