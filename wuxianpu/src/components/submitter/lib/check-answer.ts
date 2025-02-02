import { OptionalNote } from '../../../common/common'

export function checkAnswer(
    inputNote: OptionalNote,
    currentNote: OptionalNote,
    incrementTotal: () => void,
    incrementCorrect: () => void,
    triggerNewNote: () => void
): [boolean, string] {
    console.log(`input note is ${inputNote}, correct note is ${currentNote}`)

    const displayContent = !currentNote
        ? '请先生成练习题！'
        : !inputNote
        ? ''
        : inputNote.equals(currentNote)
        ? `正确✅！答案是${inputNote}`
        : `错误❌！答案是${currentNote}`
    const isCorrect =
        (inputNote && currentNote && inputNote.equals(currentNote)) || false

    if (currentNote && inputNote) {
        incrementTotal()
        if (isCorrect) {
            incrementCorrect()
            triggerNewNote()
        }
    }

    return [isCorrect, displayContent]
}
