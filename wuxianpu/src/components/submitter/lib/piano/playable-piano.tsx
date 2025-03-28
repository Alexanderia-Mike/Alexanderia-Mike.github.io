import clsx from 'clsx'
import {
    Accidental,
    ALL_WHITE_KEYS,
    NoteName,
} from '../../../../common/notes-utils/notes'
import { PlayableKey } from './piano-interface'
import { followingBlackKey } from './utils'
import { ReactNode } from 'react'

const keys = ALL_WHITE_KEYS

interface PlayablePianoProps {
    correctKeys: NoteName[]
    scrollable: boolean // if true, piano will be scrollable when the window is small
    onPress: () => void
    showColor: boolean
    grayed?: boolean
}

export default function PlayablePiano({
    correctKeys,
    scrollable,
    onPress,
    showColor,
    grayed = false,
}: PlayablePianoProps) {
    const getKey = (
        i: number,
        key: NoteName,
        isWhite: boolean,
        children?: ReactNode
    ) => (
        <PlayableKey
            onPress={onPress}
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
    return (
        <div
            className={clsx(
                'flex justify-center relative h-14',
                scrollable && 'sm:h-20 md:h-32 lg:h-40',
                !scrollable && 'min-w-[1100px] overflow-auto'
            )}
        >
            {keys.map((key, i) =>
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
