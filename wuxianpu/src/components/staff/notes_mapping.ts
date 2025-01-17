import { NoteName } from '../../common/common'
import { Clef } from './clef'

export class Note {
    constructor(name: NoteName, y: number) {
        this.name = name
        this.y = y
    }

    name: NoteName
    y: number
}

export const notes: Record<Clef, Note[]> = {
    [Clef.TREBLE]: [
        new Note(NoteName.e3, 30),
        new Note(NoteName.d3, 40),
        new Note(NoteName.c3, 50),
        new Note(NoteName.b2, 60),
        new Note(NoteName.a2, 70),
        // below need additional staff
        new Note(NoteName.g2, 80),
        new Note(NoteName.f2, 90),
        new Note(NoteName.e2, 100),
        new Note(NoteName.d2, 110),
        new Note(NoteName.c2, 120),
        new Note(NoteName.b1, 130),
        new Note(NoteName.a1, 140),
        new Note(NoteName.g1, 150),
        new Note(NoteName.f1, 160),
        new Note(NoteName.e1, 170),
        new Note(NoteName.d1, 180),
        // above need additional staff
        new Note(NoteName.c1, 190),
        new Note(NoteName.b, 200),
        new Note(NoteName.a, 210),
        new Note(NoteName.g, 220),
        new Note(NoteName.f, 230),
    ],
    [Clef.BASS]: [
        new Note(NoteName.g1, 30),
        new Note(NoteName.f1, 40),
        new Note(NoteName.e1, 50),
        new Note(NoteName.d1, 60),
        new Note(NoteName.c1, 70),
        // below need additional staff
        new Note(NoteName.b, 80),
        new Note(NoteName.a, 90),
        new Note(NoteName.g, 100),
        new Note(NoteName.f, 110),
        new Note(NoteName.e, 120),
        new Note(NoteName.d, 130),
        new Note(NoteName.c, 140),
        new Note(NoteName.B, 150),
        new Note(NoteName.A, 160),
        new Note(NoteName.G, 170),
        new Note(NoteName.F, 180),
        // above need additional staff
        new Note(NoteName.E, 190),
        new Note(NoteName.D, 200),
        new Note(NoteName.C, 210),
        new Note(NoteName.B1, 220),
        new Note(NoteName.A1, 230),
    ],
}
