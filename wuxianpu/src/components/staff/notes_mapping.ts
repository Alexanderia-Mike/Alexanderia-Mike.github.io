import {
    ALL_WHITE_KEYS,
    NoteName,
    NoteNameBase,
    WhiteKeyNoteName,
} from '../../common/notes-utils/notes'
import { getIntervalWhiteKey } from '../../common/notes-utils/utils'
import { Clef } from './clef'

export class Note {
    constructor(name: NoteName, y: number) {
        this.name = name
        this.y = y
    }

    name: NoteName
    y: number
}

const TREBLE_LOWEST_KEY = new WhiteKeyNoteName(NoteNameBase.F, 3)
const TREBLE_HEIGHEST_KEY = new WhiteKeyNoteName(NoteNameBase.E, 6)
const BASS_LOWEST_KEY = new WhiteKeyNoteName(NoteNameBase.A, 1)
const BASS_HEIGHEST_KEY = new WhiteKeyNoteName(NoteNameBase.G, 4)

function getWhiteKeyHeight(
    clef: Clef,
    whiteKey: WhiteKeyNoteName
): number | undefined {
    let lowestKey, heighestKey
    switch (clef) {
        case Clef.TREBLE:
            lowestKey = TREBLE_LOWEST_KEY
            heighestKey = TREBLE_HEIGHEST_KEY
            break
        case Clef.BASS:
            lowestKey = BASS_LOWEST_KEY
            heighestKey = BASS_HEIGHEST_KEY
            break
    }
    if (whiteKey < lowestKey || whiteKey > heighestKey) {
        return undefined
    }
    return 30 + 10 * getIntervalWhiteKey(whiteKey, heighestKey)
}

export function noteNameToNote(
    noteName: NoteName,
    clef: Clef
): Note | undefined {
    const height = getWhiteKeyHeight(clef, noteName.whiteKeyNote)
    return height != undefined ? new Note(noteName, height) : undefined
}

export const whiteKeyNoteNames: Record<Clef, NoteName[]> = {
    [Clef.TREBLE]: ALL_WHITE_KEYS.filter(
        (wk) => wk < TREBLE_HEIGHEST_KEY && wk > TREBLE_LOWEST_KEY
    ).map((wk) => new NoteName(wk)),
    [Clef.BASS]: ALL_WHITE_KEYS.filter(
        (wk) => wk < BASS_HEIGHEST_KEY && wk > BASS_LOWEST_KEY
    ).map((wk) => new NoteName(wk)),
}
