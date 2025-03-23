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
    placeholder?: string
    label?: string
    defaultIndex?: number
}

export function DropdownMenu<T>({
    elements,
    onSelect,
    placeholder,
    hide,
    classNames,
    label,
    defaultIndex,
}: DropdownMenuProps<T>) {
    const [selectedElmt, updateSelectedElmt] =
        useState<DropdownElement<T> | null>(null)
    const [expand, updateExpand] = useState<boolean>(false)
    const menuBody = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (defaultIndex != undefined) {
            if (defaultIndex >= elements.length) {
                console.log(
                    `default index ${defaultIndex} is larger than the element length ${elements.length}`
                )
            } else {
                updateSelectedElmt(elements[defaultIndex])
            }
        }
    }, [])

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
            className="px-3 py-2 bg-slate-300 rounded-full min-w-24 text-center w-full max-w-52 cursor-pointer whitespace-nowrap"
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
        <div className="absolute mx-4 min-w-[calc(100%-2rem)] max-h-60 overflow-auto top-full bg-white bg-opacity-90 z-20 rounded-2xl shadow-lg w-fit">
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
                        <div className="text-center my-1 py-2 px-2 whitespace-nowrap cursor-pointer">
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
                classNames
            )}
        >
            {label && <div className="mr-2 whitespace-nowrap">{label}</div>}
            <div className={clsx('relative flex', hide && 'hidden')}>
                {dropdownButton}
                {expand && dropdownElements}
            </div>
        </div>
    )
}
