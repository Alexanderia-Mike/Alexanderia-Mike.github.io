import { ChangeEvent, ChangeEventHandler, useState } from 'react'
import './style.css'
import clsx from 'clsx'
import { Hiddable } from '../common'

interface ToggleProps extends Hiddable {
    onChange: ChangeEventHandler
    commonText?: string
    onText?: string
    offText?: string
}

export default function Toggle({
    onChange,
    hide,
    onText,
    offText,
    commonText
}: ToggleProps) {
    const [checked, setChecked] = useState(false)
    const inputElmt = (
        <input
            type="checkbox"
            hidden
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const checked = event.target.checked
                setChecked(checked)
                onChange(event)
            }}
        />
    )
    return (
        <label className={clsx('toggle', hide && 'hidden')}>
            {inputElmt}
            <span className="slider"></span>
            <span className="label" id="slider-label">
                {commonText || (checked ? onText || '' : offText || '')}
            </span>
        </label>
    )
}
