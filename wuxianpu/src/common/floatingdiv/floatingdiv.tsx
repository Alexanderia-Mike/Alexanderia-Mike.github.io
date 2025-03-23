import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'

interface FloatingDivProps {
    content: string
}

const BOUNDARY_THRESHOLD = 10
const FLOATING_VERTICAL_MARGIN = 10

export function FloatingDiv({ content }: FloatingDivProps) {
    const iconRef = useRef<SVGSVGElement | null>(null)
    const floatingRef = useRef<HTMLDivElement | null>(null)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [left, setLeft] = useState(0)
    const [belowIcon, setBelowIcon] = useState(true)

    useEffect(() => {
        const clickOutsideMenuEventListener = (event: MouseEvent) => {
            if (
                iconRef.current &&
                !iconRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', clickOutsideMenuEventListener)
        return () =>
            document.removeEventListener(
                'mousedown',
                clickOutsideMenuEventListener
            )
    }, [])

    useEffect(() => {
        console.log(
            `window.width: ${window.innerWidth}; floating.width: ${
                floatingRef.current?.clientWidth
            }; container.left: ${iconRef.current?.getBoundingClientRect().left}`
        )
        if (iconRef.current && floatingRef.current) {
            const containerRect = iconRef.current.getBoundingClientRect()
            const floatingRect = floatingRef.current.getBoundingClientRect()
            setLeft(
                Math.min(
                    0,
                    window.innerWidth -
                        containerRect.left -
                        floatingRect.width -
                        BOUNDARY_THRESHOLD
                )
            )
            setBelowIcon(
                containerRect.top +
                    containerRect.height +
                    FLOATING_VERTICAL_MARGIN +
                    floatingRect.width +
                    BOUNDARY_THRESHOLD <
                    window.innerHeight
            )
        }
    })

    return (
        <div className="relative">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
                ref={iconRef}
                onClick={() => setIsOpen(!isOpen)}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                />
            </svg>
            <div
                className={clsx(
                    'px-4 py-2 max-w-200 max-h-40 overflow-auto absolute bg-white bg-opacity-90 rounded-2xl shadow-xl z-30',
                    isOpen || 'hidden',
                    belowIcon ? `bottom-0 translate-y-full` : 'top-0 -translate-y-full'
                )}
                ref={floatingRef}
                style={{
                    left: `${left}px`
                }}
            >
                {content}
            </div>
        </div>
    )
}
