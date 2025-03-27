import { NoteName, OptionalNote } from '../../../common/notes-utils/notes'
import { PitchNotation } from '../../../common/notes-utils/pitch-notation'
import {
    GeneralSolfege,
    OptionalSolfege,
} from '../../../common/notes-utils/solfege'

function checkAnswerCommon<T>(
    input: T | undefined,
    expected: T | undefined,
    isEqual: (a: T, b: T) => boolean,
    toDisplayString: (v: T) => string,
    incrementTotal: () => void,
    incrementCorrect: () => void,
    triggerNewNote: () => void
): [boolean, string] {
    console.log(`input is ${input}, answer is ${expected}`)

    const inputIsDefined = input != undefined
    const expectedIsDefined = expected != undefined

    const isCorrect =
        inputIsDefined && expectedIsDefined && isEqual(input, expected)
    const displayContent = !expectedIsDefined
        ? '请先生成练习题！'
        : !inputIsDefined
        ? ''
        : isCorrect
        ? `正确✅！答案是${toDisplayString(input)}`
        : `错误❌！答案是${toDisplayString(expected)}`

    if (expectedIsDefined && inputIsDefined) {
        incrementTotal()
        if (isCorrect) {
            incrementCorrect()
            triggerNewNote()
        }
    }

    return [isCorrect, displayContent]
}

export function checkAnswerNote(
    inputNote: OptionalNote,
    currentNote: OptionalNote,
    incrementTotal: () => void,
    incrementCorrect: () => void,
    triggerNewNote: () => void,
    pitchNotation: PitchNotation = PitchNotation.HELMHOLTZ,
    strict = false
): [boolean, string] {
    return checkAnswerCommon<NoteName>(
        inputNote,
        currentNote,
        (a, b) => (strict ? a.equals(b) : a.valueOf() == b.valueOf()),
        (n) => n.toString(pitchNotation),
        incrementTotal,
        incrementCorrect,
        triggerNewNote
    )
}

export function checkAnswerSolfege(
    inputSolfege: OptionalSolfege,
    currentSolfege: OptionalSolfege,
    incrementTotal: () => void,
    incrementCorrect: () => void,
    triggerNewNote: () => void
): [boolean, string] {
    return checkAnswerCommon<GeneralSolfege>(
        inputSolfege,
        currentSolfege,
        (a, b) => a.equals(b),
        (n) => n.toString(),
        incrementTotal,
        incrementCorrect,
        triggerNewNote
    )
}
