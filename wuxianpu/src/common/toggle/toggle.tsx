import { ChangeEvent, ChangeEventHandler, ReactNode, useState } from 'react'
import './style.css'
import clsx from 'clsx'
import { ExtraClassNames, Hiddable } from '../common'

interface ToggleProps extends Hiddable, ExtraClassNames {
    onChange: ChangeEventHandler
    label: string
    render?: () => ReactNode
    checked?: boolean // default status at initalization
}

export default function Toggle({
    onChange,
    hide,
    label,
    checked,
    render,
    classNames,
}: ToggleProps) {
    const inputElmt = (
        <input
            type="checkbox"
            hidden
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                onChange(event)
            }}
            defaultChecked={checked}
        />
    )
    return (
        <div
            className={clsx(
                'toggle mx-5 flex flex-grow flex-shrink-0 my-3',
                classNames,
                hide && 'hidden'
            )}
        >
            <label className="slider">{inputElmt}</label>
            <span className="label whitespace-nowrap" id="slider-label">
                {render ? render() : label}
            </span>
        </div>
    )
}
