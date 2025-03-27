import clsx from 'clsx'
import {
    Accidental,
    ALL_WHITE_KEYS,
    NoteName,
} from '../../../../common/notes-utils/notes'
import { followingBlackKey, ReadOnlyKey, whiteKeys } from './piano-interface'
import { ReactNode } from 'react'

interface ReadOnlyPianoProps {
    correctKeys: NoteName[]
    pressedKeys: NoteName[]
    scrollable: boolean // if true, piano will be scrollable when the window is small
    showColor: boolean
    grayed?: boolean
}

export default function ReadOnlyPiano({
    correctKeys,
    pressedKeys,
    scrollable,
    showColor,
    grayed = false,
}: ReadOnlyPianoProps) {
    const getKey = (
        i: number,
        key: NoteName,
        isWhite: boolean,
        children?: ReactNode
    ) => (
        <ReadOnlyKey
            isPressed={pressedKeyValues.includes(key.valueOf())}
            idx={i}
            key={i}
            note={key}
            isCorrect={correctKeyValues.includes(key.valueOf())}
            isWhite={isWhite}
            showColor={showColor}
            grayed={grayed}
            children={children}
        />
    )

    const correctKeyValues = correctKeys.map((k) => k.valueOf())
    const pressedKeyValues = pressedKeys.map((k) => k.valueOf())
    return (
        <div
            className={clsx(
                'flex justify-center relative h-14',
                !scrollable && 'sm:h-20 md:h-24 lg:h-32',
                scrollable && 'w-[1100px] overflow-auto'
            )}
        >
            {whiteKeys.map((key, i) =>
                getKey(
                    i,
                    new NoteName(key),
                    true,
                    followingBlackKey(key, i)
                        ? getKey(i, new NoteName(key, Accidental.FLAT), false)
                        : undefined
                )
            )}
        </div>
    )
}
