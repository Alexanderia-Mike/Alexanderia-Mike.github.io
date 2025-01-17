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

export const notes: Record<Clef, Map<NoteName, Note>> = {
    [Clef.TREBLE]: new Map([
        [NoteName.e3, new Note(NoteName.e3, 30)],
        [NoteName.d3, new Note(NoteName.d3, 40)],
        [NoteName.c3, new Note(NoteName.c3, 50)],
        [NoteName.b2, new Note(NoteName.b2, 60)],
        [NoteName.a2, new Note(NoteName.a2, 70)],
        // below need additional staff
        [NoteName.g2, new Note(NoteName.g2, 80)],
        [NoteName.f2, new Note(NoteName.f2, 90)],
        [NoteName.e2, new Note(NoteName.e2, 100)],
        [NoteName.d2, new Note(NoteName.d2, 110)],
        [NoteName.c2, new Note(NoteName.c2, 120)],
        [NoteName.b1, new Note(NoteName.b1, 130)],
        [NoteName.a1, new Note(NoteName.a1, 140)],
        [NoteName.g1, new Note(NoteName.g1, 150)],
        [NoteName.f1, new Note(NoteName.f1, 160)],
        [NoteName.e1, new Note(NoteName.e1, 170)],
        [NoteName.d1, new Note(NoteName.d1, 180)],
        // above need additional staff
        [NoteName.c1, new Note(NoteName.c1, 190)],
        [NoteName.b, new Note(NoteName.b, 200)],
        [NoteName.a, new Note(NoteName.a, 210)],
        [NoteName.g, new Note(NoteName.g, 220)],
        [NoteName.f, new Note(NoteName.f, 230)],
    ]),
    [Clef.BASS]: new Map([
        [NoteName.g1, new Note(NoteName.g1, 30)],
        [NoteName.f1, new Note(NoteName.f1, 40)],
        [NoteName.e1, new Note(NoteName.e1, 50)],
        [NoteName.d1, new Note(NoteName.d1, 60)],
        [NoteName.c1, new Note(NoteName.c1, 70)],
        // below need additional staff
        [NoteName.b, new Note(NoteName.b, 80)],
        [NoteName.a, new Note(NoteName.a, 90)],
        [NoteName.g, new Note(NoteName.g, 100)],
        [NoteName.f, new Note(NoteName.f, 110)],
        [NoteName.e, new Note(NoteName.e, 120)],
        [NoteName.d, new Note(NoteName.d, 130)],
        [NoteName.c, new Note(NoteName.c, 140)],
        [NoteName.B, new Note(NoteName.B, 150)],
        [NoteName.A, new Note(NoteName.A, 160)],
        [NoteName.G, new Note(NoteName.G, 170)],
        [NoteName.F, new Note(NoteName.F, 180)],
        // above need additional staff
        [NoteName.E, new Note(NoteName.E, 190)],
        [NoteName.D, new Note(NoteName.D, 200)],
        [NoteName.C, new Note(NoteName.C, 210)],
        [NoteName.B1, new Note(NoteName.B1, 220)],
        [NoteName.A1, new Note(NoteName.A1, 230)],
    ]),
}
