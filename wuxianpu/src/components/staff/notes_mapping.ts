import { WhiteKeyNoteName } from '../../common/common'
import { Clef } from './clef'

export class Note {
    constructor(name: WhiteKeyNoteName, y: number) {
        this.name = name
        this.y = y
    }

    name: WhiteKeyNoteName
    y: number
}

export const notes: Record<Clef, Map<WhiteKeyNoteName, Note>> = {
    [Clef.TREBLE]: new Map([
        [WhiteKeyNoteName.e3, new Note(WhiteKeyNoteName.e3, 30)],
        [WhiteKeyNoteName.d3, new Note(WhiteKeyNoteName.d3, 40)],
        [WhiteKeyNoteName.c3, new Note(WhiteKeyNoteName.c3, 50)],
        [WhiteKeyNoteName.b2, new Note(WhiteKeyNoteName.b2, 60)],
        [WhiteKeyNoteName.a2, new Note(WhiteKeyNoteName.a2, 70)],
        // below need additional staff
        [WhiteKeyNoteName.g2, new Note(WhiteKeyNoteName.g2, 80)],
        [WhiteKeyNoteName.f2, new Note(WhiteKeyNoteName.f2, 90)],
        [WhiteKeyNoteName.e2, new Note(WhiteKeyNoteName.e2, 100)],
        [WhiteKeyNoteName.d2, new Note(WhiteKeyNoteName.d2, 110)],
        [WhiteKeyNoteName.c2, new Note(WhiteKeyNoteName.c2, 120)],
        [WhiteKeyNoteName.b1, new Note(WhiteKeyNoteName.b1, 130)],
        [WhiteKeyNoteName.a1, new Note(WhiteKeyNoteName.a1, 140)],
        [WhiteKeyNoteName.g1, new Note(WhiteKeyNoteName.g1, 150)],
        [WhiteKeyNoteName.f1, new Note(WhiteKeyNoteName.f1, 160)],
        [WhiteKeyNoteName.e1, new Note(WhiteKeyNoteName.e1, 170)],
        [WhiteKeyNoteName.d1, new Note(WhiteKeyNoteName.d1, 180)],
        // above need additional staff
        [WhiteKeyNoteName.c1, new Note(WhiteKeyNoteName.c1, 190)],
        [WhiteKeyNoteName.b, new Note(WhiteKeyNoteName.b, 200)],
        [WhiteKeyNoteName.a, new Note(WhiteKeyNoteName.a, 210)],
        [WhiteKeyNoteName.g, new Note(WhiteKeyNoteName.g, 220)],
        [WhiteKeyNoteName.f, new Note(WhiteKeyNoteName.f, 230)],
    ]),
    [Clef.BASS]: new Map([
        [WhiteKeyNoteName.g1, new Note(WhiteKeyNoteName.g1, 30)],
        [WhiteKeyNoteName.f1, new Note(WhiteKeyNoteName.f1, 40)],
        [WhiteKeyNoteName.e1, new Note(WhiteKeyNoteName.e1, 50)],
        [WhiteKeyNoteName.d1, new Note(WhiteKeyNoteName.d1, 60)],
        [WhiteKeyNoteName.c1, new Note(WhiteKeyNoteName.c1, 70)],
        // below need additional staff
        [WhiteKeyNoteName.b, new Note(WhiteKeyNoteName.b, 80)],
        [WhiteKeyNoteName.a, new Note(WhiteKeyNoteName.a, 90)],
        [WhiteKeyNoteName.g, new Note(WhiteKeyNoteName.g, 100)],
        [WhiteKeyNoteName.f, new Note(WhiteKeyNoteName.f, 110)],
        [WhiteKeyNoteName.e, new Note(WhiteKeyNoteName.e, 120)],
        [WhiteKeyNoteName.d, new Note(WhiteKeyNoteName.d, 130)],
        [WhiteKeyNoteName.c, new Note(WhiteKeyNoteName.c, 140)],
        [WhiteKeyNoteName.B, new Note(WhiteKeyNoteName.B, 150)],
        [WhiteKeyNoteName.A, new Note(WhiteKeyNoteName.A, 160)],
        [WhiteKeyNoteName.G, new Note(WhiteKeyNoteName.G, 170)],
        [WhiteKeyNoteName.F, new Note(WhiteKeyNoteName.F, 180)],
        // above need additional staff
        [WhiteKeyNoteName.E, new Note(WhiteKeyNoteName.E, 190)],
        [WhiteKeyNoteName.D, new Note(WhiteKeyNoteName.D, 200)],
        [WhiteKeyNoteName.C, new Note(WhiteKeyNoteName.C, 210)],
        [WhiteKeyNoteName.B1, new Note(WhiteKeyNoteName.B1, 220)],
        [WhiteKeyNoteName.A1, new Note(WhiteKeyNoteName.A1, 230)],
    ]),
}

export const noteNames: Record<Clef, WhiteKeyNoteName[]> = {
    [Clef.TREBLE]: notes[Clef.TREBLE].keys().toArray(),
    [Clef.BASS]: notes[Clef.BASS].keys().toArray()
}