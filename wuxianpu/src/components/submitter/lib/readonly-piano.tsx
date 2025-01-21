import clsx from 'clsx'
import {
    NoteName,
    WhiteKeyNoteName,
} from '../../../common/common'
import { useRef } from 'react'

const keys = Object.entries(WhiteKeyNoteName)
    .filter(([_, v]) => typeof v == 'number')
    .map(([_, v]) => v as WhiteKeyNoteName)
    .sort((a, b) => a - b)
console.log(keys)

export default function ReadonlyPiano({
    correctKeys = [],
    pressedKeys = [],
}: {
    correctKeys?: NoteName[]
    pressedKeys?: NoteName[]
}) {
    const containerRef = useRef<HTMLDivElement | null>(null)
    if (containerRef.current) {
        const whitKeyWidth = Math.min(containerRef.current.clientWidth / 52, 20)
        const blackKeyWidth = (whitKeyWidth * 2) / 3
    }

    return (
        <div className="flex h-52 justify-center relative" ref={containerRef}>
            {keys.map((key, i) =>
                ['d', 'e', 'g', 'a', 'b'].includes(
                    WhiteKeyNoteName[key][0].toLowerCase()
                ) && i != 0 ? (
                    <div
                        key={i}
                        className={clsx("w-[12%] max-w-5 border-r border-y h-full border-black relative", i == 0 && "border-l")}
                    >
                        <div
                            // TODO: class names are not working, so need to set styles directly using javascript
                            className={clsx(
                                'w-2/3 h-2/3 bg-black',
                                'absolute -translate-x-1/2 z-10'
                            )}
                        ></div>
                    </div>
                ) : (
                    <div
                        key={i}
                        className={clsx("w-[12%] max-w-5 border-r border-y h-full border-black", i == 0 && "border-l")}
                    ></div>
                )
            )}
        </div>
    )
}
