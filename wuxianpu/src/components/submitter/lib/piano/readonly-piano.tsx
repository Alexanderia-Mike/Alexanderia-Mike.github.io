import clsx from 'clsx'
import {
    Accidental,
    ALL_WHITE_KEYS,
    NoteName,
} from '../../../../common/notes-utils/notes'
import { followingBlackKey, ReadOnlyKey, whiteKeys } from './piano-interface'

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
            {whiteKeys.map((key, i) => {
                return followingBlackKey(key, i) ? (
                    <ReadOnlyKey
                        isPressed={pressedKeyValues.includes(key.valueOf())}
                        idx={i}
                        note={new NoteName(key)}
                        isCorrect={correctKeyValues.includes(key.valueOf())}
                        isWhite={true}
                        showColor={showColor}
                        grayed={grayed}
                    >
                        <ReadOnlyKey
                            isPressed={pressedKeyValues.includes(
                                key.valueOf() - 1
                            )}
                            idx={i}
                            note={new NoteName(key, Accidental.FLAT)}
                            isCorrect={correctKeyValues.includes(
                                key.valueOf() - 1
                            )}
                            isWhite={false}
                            showColor={showColor}
                            grayed={grayed}
                        />
                    </ReadOnlyKey>
                ) : (
                    <ReadOnlyKey
                        isPressed={pressedKeyValues.includes(key.valueOf())}
                        idx={i}
                        note={new NoteName(key)}
                        isCorrect={correctKeyValues.includes(key.valueOf())}
                        isWhite={true}
                        showColor={showColor}
                        grayed={grayed}
                    />
                )
            })}
        </div>
    )
}
