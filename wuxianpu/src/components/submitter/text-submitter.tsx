import { useContext, useEffect, useRef } from 'react'
import Button from '../../common/button/button'
import { parseNoteName } from '../../common/common'
import { SubmitterInterface } from './submitter-interface'
import { NoteContext } from '../../common/context'
import { checkAnswer } from './lib/check-answer'

export function TextSubmitter({
    incrementCorrect,
    incrementTotal,
}: SubmitterInterface) {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const { currentNote, setInputNote } = useContext(NoteContext)

    const submitButtonOnClick = () => {
        if (inputRef.current) {
            const noteName = parseNoteName(inputRef.current.value)
            if (noteName) {
                setInputNote(noteName)
            }
            const [_, displayContent] = checkAnswer(
                noteName,
                currentNote,
                incrementTotal,
                incrementCorrect
            )
            if (spanRef.current) {
                spanRef.current.innerText = displayContent
            }
        }
    }

    const spanRef = useRef<HTMLSpanElement | null>(null)

    return (
        <>
            <input
                type="text"
                id="noteInput"
                ref={inputRef}
                placeholder="输入音名 (如 C, D, E)"
                className="rounded-full mx-4 my-2 px-3 py-2 text-md border border-solid border-slate-400 min-w-10"
            />
            <Button label={'提交答案'} onClick={submitButtonOnClick} />
            <span
                className="block mt-3 text-center text-orange-400"
                ref={spanRef}
            ></span>
        </>
    )
}
