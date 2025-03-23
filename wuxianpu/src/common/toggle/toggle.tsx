import { ChangeEvent, ChangeEventHandler, ReactNode, useState } from 'react'
import './style.css'
import clsx from 'clsx'
import { Hiddable } from '../common'

interface ToggleProps extends Hiddable {
    onChange: ChangeEventHandler
    label: string
    render?: () => ReactNode
}

export default function Toggle({ onChange, hide, label, render }: ToggleProps) {
    const inputElmt = (
        <input
            type="checkbox"
            hidden
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                onChange(event)
            }}
        />
    )
    return (
        <div
            className={clsx(
                'toggle mx-5 flex flex-grow flex-shrink-0 my-3',
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
