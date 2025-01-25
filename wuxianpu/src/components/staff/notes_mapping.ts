import { NoteName, WhiteKeyNoteName } from '../../common/common'
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
        [new NoteName(WhiteKeyNoteName.e3), new Note(new NoteName(WhiteKeyNoteName.e3), 30)],
        [new NoteName(WhiteKeyNoteName.d3), new Note(new NoteName(WhiteKeyNoteName.d3), 40)],
        [new NoteName(WhiteKeyNoteName.c3), new Note(new NoteName(WhiteKeyNoteName.c3), 50)],
        [new NoteName(WhiteKeyNoteName.b2), new Note(new NoteName(WhiteKeyNoteName.b2), 60)],
        [new NoteName(WhiteKeyNoteName.a2), new Note(new NoteName(WhiteKeyNoteName.a2), 70)],
        // below need additional staff
        [new NoteName(WhiteKeyNoteName.g2), new Note(new NoteName(WhiteKeyNoteName.g2), 80)],
        [new NoteName(WhiteKeyNoteName.f2), new Note(new NoteName(WhiteKeyNoteName.f2), 90)],
        [new NoteName(WhiteKeyNoteName.e2), new Note(new NoteName(WhiteKeyNoteName.e2), 100)],
        [new NoteName(WhiteKeyNoteName.d2), new Note(new NoteName(WhiteKeyNoteName.d2), 110)],
        [new NoteName(WhiteKeyNoteName.c2), new Note(new NoteName(WhiteKeyNoteName.c2), 120)],
        [new NoteName(WhiteKeyNoteName.b1), new Note(new NoteName(WhiteKeyNoteName.b1), 130)],
        [new NoteName(WhiteKeyNoteName.a1), new Note(new NoteName(WhiteKeyNoteName.a1), 140)],
        [new NoteName(WhiteKeyNoteName.g1), new Note(new NoteName(WhiteKeyNoteName.g1), 150)],
        [new NoteName(WhiteKeyNoteName.f1), new Note(new NoteName(WhiteKeyNoteName.f1), 160)],
        [new NoteName(WhiteKeyNoteName.e1), new Note(new NoteName(WhiteKeyNoteName.e1), 170)],
        [new NoteName(WhiteKeyNoteName.d1), new Note(new NoteName(WhiteKeyNoteName.d1), 180)],
        // above need additional staff
        [new NoteName(WhiteKeyNoteName.c1), new Note(new NoteName(WhiteKeyNoteName.c1), 190)],
        [new NoteName(WhiteKeyNoteName.b), new Note(new NoteName(WhiteKeyNoteName.b), 200)],
        [new NoteName(WhiteKeyNoteName.a), new Note(new NoteName(WhiteKeyNoteName.a), 210)],
        [new NoteName(WhiteKeyNoteName.g), new Note(new NoteName(WhiteKeyNoteName.g), 220)],
        [new NoteName(WhiteKeyNoteName.f), new Note(new NoteName(WhiteKeyNoteName.f), 230)],
    ]),
    [Clef.BASS]: new Map([
        [new NoteName(WhiteKeyNoteName.g1), new Note(new NoteName(WhiteKeyNoteName.g1), 30)],
        [new NoteName(WhiteKeyNoteName.f1), new Note(new NoteName(WhiteKeyNoteName.f1), 40)],
        [new NoteName(WhiteKeyNoteName.e1), new Note(new NoteName(WhiteKeyNoteName.e1), 50)],
        [new NoteName(WhiteKeyNoteName.d1), new Note(new NoteName(WhiteKeyNoteName.d1), 60)],
        [new NoteName(WhiteKeyNoteName.c1), new Note(new NoteName(WhiteKeyNoteName.c1), 70)],
        // below need additional staff
        [new NoteName(WhiteKeyNoteName.b), new Note(new NoteName(WhiteKeyNoteName.b), 80)],
        [new NoteName(WhiteKeyNoteName.a), new Note(new NoteName(WhiteKeyNoteName.a), 90)],
        [new NoteName(WhiteKeyNoteName.g), new Note(new NoteName(WhiteKeyNoteName.g), 100)],
        [new NoteName(WhiteKeyNoteName.f), new Note(new NoteName(WhiteKeyNoteName.f), 110)],
        [new NoteName(WhiteKeyNoteName.e), new Note(new NoteName(WhiteKeyNoteName.e), 120)],
        [new NoteName(WhiteKeyNoteName.d), new Note(new NoteName(WhiteKeyNoteName.d), 130)],
        [new NoteName(WhiteKeyNoteName.c), new Note(new NoteName(WhiteKeyNoteName.c), 140)],
        [new NoteName(WhiteKeyNoteName.B), new Note(new NoteName(WhiteKeyNoteName.B), 150)],
        [new NoteName(WhiteKeyNoteName.A), new Note(new NoteName(WhiteKeyNoteName.A), 160)],
        [new NoteName(WhiteKeyNoteName.G), new Note(new NoteName(WhiteKeyNoteName.G), 170)],
        [new NoteName(WhiteKeyNoteName.F), new Note(new NoteName(WhiteKeyNoteName.F), 180)],
        // above need additional staff
        [new NoteName(WhiteKeyNoteName.E), new Note(new NoteName(WhiteKeyNoteName.E), 190)],
        [new NoteName(WhiteKeyNoteName.D), new Note(new NoteName(WhiteKeyNoteName.D), 200)],
        [new NoteName(WhiteKeyNoteName.C), new Note(new NoteName(WhiteKeyNoteName.C), 210)],
        [new NoteName(WhiteKeyNoteName.B1), new Note(new NoteName(WhiteKeyNoteName.B1), 220)],
        [new NoteName(WhiteKeyNoteName.A1), new Note(new NoteName(WhiteKeyNoteName.A1), 230)],
    ]),
}

export const noteNames: Record<Clef, NoteName[]> = {
    [Clef.TREBLE]: notes[Clef.TREBLE].keys().toArray(),
    [Clef.BASS]: notes[Clef.BASS].keys().toArray()
}