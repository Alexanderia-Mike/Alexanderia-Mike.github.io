import { MouseEventHandler } from 'react'
import './style.css'
import { Hiddable } from '../common'
import clsx from 'clsx'

interface ButtonProps extends Hiddable {
    label: String
    onClick: MouseEventHandler<HTMLButtonElement>
}

export default function Button({ label, onClick, hide }: ButtonProps) {
    // TODO: migrate css to classnames
    // TODO: add a parameter for extra class names
    return (
        <button
            className={clsx(
                'rounded-full mx-4 my-auto px-3 py-2 text-md border-none text-white cursor-pointer',
                hide && 'hidden'
            )}
            onClick={onClick}
        >
            {label}
        </button>
    )
}
