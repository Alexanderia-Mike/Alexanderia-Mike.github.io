import { NoteName, WhiteKeyNoteName } from "./notes";

// interval from note1 rising to note2. Negative if note1 is higher than note2
export function getIntervalWhiteKey(note1: WhiteKeyNoteName, note2: WhiteKeyNoteName): number {
    return note2 - note1
}

export function getInterval(note1: NoteName, note2: NoteName): number {
    return getIntervalWhiteKey(note1.whiteKeyNote, note2.whiteKeyNote)
}

// number of seminotes from note1 rising to note2. Negative if note1 is higher than note2
export function getSemitoneCount(note1: NoteName, note2: NoteName): number {
    return note2.toValue() - note1.toValue()
}