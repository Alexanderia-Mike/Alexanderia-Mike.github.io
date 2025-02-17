import { ReactNode, useEffect, useRef, useState } from 'react'
import { ExtraClassNames, Hiddable } from '../common'
import clsx from 'clsx'

export interface DropdownElement<T> {
    label: string
    value: T
    render?: () => ReactNode
}

interface DropdownMenuProps<T> extends Hiddable, ExtraClassNames {
    elements: DropdownElement<T>[]
    onSelect: (value: T) => void
    // without placeholder, will select first element by default
    placeholder?: string
    label?: string
}

export function DropdownMenu<T>({
    elements,
    onSelect,
    placeholder,
    hide,
    classNames,
    label,
}: DropdownMenuProps<T>) {
    const [selectedElmt, updateSelectedElmt] =
        useState<DropdownElement<T> | null>(null)
    const [expand, updateExpand] = useState<boolean>(false)
    const menuBody = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const clickOutsideMenuEventListener = (event: MouseEvent) => {
            if (
                menuBody.current &&
                !menuBody.current.contains(event.target as Node)
            ) {
                updateExpand(false)
            }
        }
        document.addEventListener('mousedown', clickOutsideMenuEventListener)
        return () =>
            document.removeEventListener(
                'mousedown',
                clickOutsideMenuEventListener
            )
    }, [])

    const dropdownButton = (
        <div
            className="px-3 py-2 bg-slate-300 rounded-full min-w-24 text-center"
            onClick={() => updateExpand(!expand)}
        >
            {selectedElmt
                ? selectedElmt.render
                    ? selectedElmt.render()
                    : selectedElmt.label
                : placeholder || '请选择'}
        </div>
    )

    const dropdownElements = (
        <div className="absolute mx-4 w-[calc(100%-2rem)] top-full bg-slate-100 z-20 rounded-sm">
            {elements.map((elmt, idx) => (
                <div
                    className="my-1 hover:bg-slate-200 active:bg-slate-300"
                    key={idx}
                    onClick={() => {
                        updateExpand(!expand)
                        onSelect(elmt.value)
                        updateSelectedElmt(elmt)
                    }}
                >
                    {elmt.render ? (
                        elmt.render()
                    ) : (
                        <div className="text-center">{elmt.label}</div>
                    )}
                </div>
            ))}
        </div>
    )

    return (
        <div
            ref={menuBody}
            className="mx-5 my-3 flex justify-center items-center"
        >
            {label && <div className="mr-2 whitespace-nowrap">{label}</div>}
            <div
                className={clsx(
                    'relative flex flex-grow flex-shrink-0',
                    hide && 'hidden',
                    classNames
                )}
            >
                {dropdownButton}
                {expand && dropdownElements}
            </div>
        </div>
    )
}
