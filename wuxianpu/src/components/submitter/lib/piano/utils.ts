import {
    WhiteKeyNoteName,
    NoteNameBase,
} from '../../../../common/notes-utils/notes'

export function followingBlackKey(key: WhiteKeyNoteName, i: number) {
    return (
        ['d', 'e', 'g', 'a', 'b'].includes(
            NoteNameBase[key.noteNameBase][0].toLowerCase()
        ) && i != 0
    )
}
