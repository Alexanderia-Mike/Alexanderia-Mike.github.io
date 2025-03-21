import { OptionalNote } from '../../../common/common'
import { PitchNotation } from './pitch-notation'

export function checkAnswer(
    inputNote: OptionalNote,
    currentNote: OptionalNote,
    incrementTotal: () => void,
    incrementCorrect: () => void,
    triggerNewNote: () => void,
    pitchNotation: PitchNotation = PitchNotation.HELMHOLTZ
): [boolean, string] {
    console.log(`input note is ${inputNote}, correct note is ${currentNote}`)

    const isCorrect =
        (inputNote && currentNote && inputNote.toValue() == currentNote.toValue()) || false
    const displayContent = !currentNote
        ? '请先生成练习题！'
        : !inputNote
        ? ''
        : isCorrect
        ? `正确✅！答案是${inputNote.toString(pitchNotation)}`
        : `错误❌！答案是${currentNote.toString(pitchNotation)}`

    if (currentNote && inputNote) {
        incrementTotal()
        if (isCorrect) {
            incrementCorrect()
            triggerNewNote()
        }
    }

    return [isCorrect, displayContent]
}
