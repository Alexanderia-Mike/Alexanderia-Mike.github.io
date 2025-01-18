import { useRef } from 'react'
import Button from '../../../common/button/button'

export function TextSubmitter() {
    const inputRef = useRef<HTMLInputElement | null>(null)

    const submitButtonOnClick = () => {
        if (inputRef.current) {
            console.log(`value is ${inputRef.current.value}`)
            // TODO
        }
    }

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
        </>
    )
}
