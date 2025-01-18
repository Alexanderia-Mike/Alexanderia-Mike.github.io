import { useEffect, useRef, useState } from 'react'
import Button from '../../../common/button/button'
import { NoteName } from '../../../common/common'

function generateNoteName(input: string): NoteName | undefined {
    return NoteName[input as keyof typeof NoteName]
}

export function TextSubmitter({
    currentNoteName,
}: {
    currentNoteName: NoteName | undefined
}) {
    const inputRef = useRef<HTMLInputElement | null>(null)

    const submitButtonOnClick = () => {
        if (inputRef.current) {
            console.log(`value is ${inputRef.current.value}`)
            const noteName = generateNoteName(inputRef.current.value)
            if (noteName) {
                setInputNoteName(noteName)
            }
            const displayContent = !currentNoteName
                ? '请先生成练习题！'
                : noteName == currentNoteName
                ? `正确✅！答案是${noteName}`
                : `错误❌！答案是${currentNoteName}`
            if (spanRef.current) {
                spanRef.current.innerText = displayContent
            }
        }
    }

    const spanRef = useRef<HTMLSpanElement | null>(null)
    const [inputNoteName, setInputNoteName] = useState<NoteName | undefined>(
        undefined
    )

    useEffect(() => {
        setInputNoteName(undefined)
        if (spanRef.current) {
            spanRef.current.innerText = ''
        }
    }, [currentNoteName])

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
            <span className="block mt-3 text-center" ref={spanRef}></span>
        </>
    )
}
