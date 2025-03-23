import { Accidental } from "./notes"

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
}