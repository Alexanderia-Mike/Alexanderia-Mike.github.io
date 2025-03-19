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

const whiteKeyToHeightMapping: Record<Clef, Map<WhiteKeyNoteName, number>> = {
    [Clef.TREBLE]: new Map([
        [WhiteKeyNoteName.e3, 30],
        [WhiteKeyNoteName.d3, 40],
        [WhiteKeyNoteName.c3, 50],
        [WhiteKeyNoteName.b2, 60],
        [WhiteKeyNoteName.a2, 70],
        // below need additional staff
        [WhiteKeyNoteName.g2, 80],
        [WhiteKeyNoteName.f2, 90],
        [WhiteKeyNoteName.e2, 100],
        [WhiteKeyNoteName.d2, 110],
        [WhiteKeyNoteName.c2, 120],
        [WhiteKeyNoteName.b1, 130],
        [WhiteKeyNoteName.a1, 140],
        [WhiteKeyNoteName.g1, 150],
        [WhiteKeyNoteName.f1, 160],
        [WhiteKeyNoteName.e1, 170],
        [WhiteKeyNoteName.d1, 180],
        // above need additional staff
        [WhiteKeyNoteName.c1, 190],
        [WhiteKeyNoteName.b, 200],
        [WhiteKeyNoteName.a, 210],
        [WhiteKeyNoteName.g, 220],
        [WhiteKeyNoteName.f, 230],
    ]),
    [Clef.BASS]: new Map([
        [WhiteKeyNoteName.g1, 30],
        [WhiteKeyNoteName.f1, 40],
        [WhiteKeyNoteName.e1, 50],
        [WhiteKeyNoteName.d1, 60],
        [WhiteKeyNoteName.c1, 70],
        // below need additional staff
        [WhiteKeyNoteName.b, 80],
        [WhiteKeyNoteName.a, 90],
        [WhiteKeyNoteName.g, 100],
        [WhiteKeyNoteName.f, 110],
        [WhiteKeyNoteName.e, 120],
        [WhiteKeyNoteName.d, 130],
        [WhiteKeyNoteName.c, 140],
        [WhiteKeyNoteName.B, 150],
        [WhiteKeyNoteName.A, 160],
        [WhiteKeyNoteName.G, 170],
        [WhiteKeyNoteName.F, 180],
        // above need additional staff
        [WhiteKeyNoteName.E, 190],
        [WhiteKeyNoteName.D, 200],
        [WhiteKeyNoteName.C, 210],
        [WhiteKeyNoteName.B1, 220],
        [WhiteKeyNoteName.A1, 230],
    ]),
}

export function noteNameToNote(
    noteName: NoteName,
    clef: Clef
): Note | undefined {
    const height = whiteKeyToHeightMapping[clef].get(noteName.whiteKeyNote)
    return height != undefined ? new Note(noteName, height) : undefined
}

export const whiteKeyNoteNames: Record<Clef, NoteName[]> = {
    [Clef.TREBLE]: whiteKeyToHeightMapping[Clef.TREBLE]
        .keys()
        .map((wk) => new NoteName(wk))
        .toArray(),
    [Clef.BASS]: whiteKeyToHeightMapping[Clef.BASS]
        .keys()
        .map((wk) => new NoteName(wk))
        .toArray(),
}
