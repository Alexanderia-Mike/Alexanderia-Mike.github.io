import { ReactNode, useEffect, useRef, useState } from 'react'
import { ExtraClassNames, Hiddable } from '../common'
import clsx from 'clsx'

export interface SelectionOption<T> {
    label: string
    value: T
    render?: () => ReactNode
}

interface SelectionPanelProps<T> extends Hiddable, ExtraClassNames {
    elements: SelectionOption<T>[]
    onSelect: (value: T) => void
    defaultIndex: number
    label?: string
}

export function SelectionPanel<T>({
    elements,
    onSelect,
    hide,
    classNames,
    label,
    defaultIndex,
}: SelectionPanelProps<T>) {
    const [activeIndex, setActiveIndex] = useState<number>(defaultIndex)
    const menuBody = useRef<HTMLDivElement | null>(null)

    const options = (
        <div className="flex justify-center items-center mx-4 bg-transparent w-fit">
            {elements.map((elmt, idx) => (
                <div
                    className={clsx(
                        'flex my-1 px-2 border',
                        activeIndex == idx
                            ? 'shadow-inner bg-white'
                            : 'bg-white cursor-pointer hover:bg-slate-200 active:bg-slate-300 text-gray-400 active:text-black hover:text-black',
                        idx == 0 && 'rounded-s-full',
                        idx == elements.length - 1 && 'rounded-e-full',
                        idx != 0 && 'border-l-0'
                    )}
                    key={idx}
                    onClick={() => {
                        onSelect(elmt.value)
                        setActiveIndex(idx)
                    }}
                >
                    {elmt.render ? (
                        elmt.render()
                    ) : (
                        <div className="text-center my-1 py-2 px-2 whitespace-nowrap">
                            {elmt.label}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )

    return (
        <div
            ref={menuBody}
            className={clsx(
                'mx-5 my-3 flex flex-grow flex-shrink-0 justify-center items-center',
                classNames,
                hide && 'hidden'
            )}
        >
            {label && <div className="mr-2 whitespace-nowrap">{label}</div>}
            {options}
        </div>
    )
}
