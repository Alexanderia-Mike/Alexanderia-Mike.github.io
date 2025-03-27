import { MouseEventHandler } from 'react'
import './style.css'
import { ExtraClassNames, Hiddable, WithChildren } from '../common'
import clsx from 'clsx'

interface ButtonProps extends Hiddable, ExtraClassNames, WithChildren {
    label: String
    onClick: MouseEventHandler<HTMLButtonElement>
}

export default function Button({
    label,
    onClick,
    hide,
    classNames,
    children,
}: ButtonProps) {
    // TODO: migrate css to classnames
    return (
        <button
            className={clsx(
                'rounded-full mx-4 my-auto px-3 py-2 border-none cursor-pointer',
                hide && 'hidden',
                classNames
            )}
            onClick={onClick}
        >
            {children}
            <span className="text-md text-white z-10 relative whitespace-nowrap">
                {label}
            </span>
        </button>
    )
}
