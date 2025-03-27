import { Accidental, accidentalToString } from './notes'

export enum Solfege {
    Do = 1,
    Re = 2,
    Mi = 3,
    Fa = 4,
    So = 5,
    La = 6,
    Ti = 7,
}

export class GeneralSolfege {
    solfege: Solfege
    accidental: Accidental

    constructor(solfege: Solfege, accidental: Accidental) {
        this.solfege = solfege
        this.accidental = accidental
    }

    toString(): string {
        return accidentalToString[this.accidental] + this.solfege
    }

    equals(other: GeneralSolfege): boolean {
        return (
            this.solfege == other.solfege && this.accidental == other.accidental
        )
    }
}

export function getSolfegeSeminoteCount(solfege: Solfege): number {
    switch (solfege) {
        case Solfege.Do:
            return 0
        case Solfege.Re:
            return 2
        case Solfege.Mi:
            return 4
        case Solfege.Fa:
            return 5
        case Solfege.So:
            return 7
        case Solfege.La:
            return 9
        case Solfege.Ti:
            return 11
    }
}

export function getGeneralSolfegeSeminoteCount(
    solfege: GeneralSolfege
): number {
    return getSolfegeSeminoteCount(solfege.solfege) + solfege.accidental
}

export type OptionalSolfege = GeneralSolfege | undefined
