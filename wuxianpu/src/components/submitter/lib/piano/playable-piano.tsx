import clsx from 'clsx'
import {
    Accidental,
    ALL_WHITE_KEYS,
    NoteName,
} from '../../../../common/notes-utils/notes'
import { followingBlackKey, PlayableKey } from './piano-interface'

const keys = ALL_WHITE_KEYS

interface PlayablePianoProps {
    correctKeys: NoteName[]
    scrollable: boolean // if true, piano will be scrollable when the window is small
    onPress: () => void
    grayed?: boolean
}

export default function PlayablePiano({
    correctKeys,
    scrollable,
    onPress,
    grayed = false,
}: PlayablePianoProps) {
    return (
        <div
            className={clsx(
                'flex justify-center relative h-14',
                scrollable && 'sm:h-20 md:h-32 lg:h-40',
                !scrollable && 'min-w-[1100px] overflow-auto'
            )}
        >
            {keys.map((key, i) => {
                const correctKeyValues = correctKeys.map((k) => k.valueOf())
                return followingBlackKey(key, i) ? (
                    <PlayableKey
                        onPress={onPress}
                        idx={i}
                        note={new NoteName(key)}
                        isCorrect={correctKeyValues.includes(key.valueOf())}
                        isWhite={true}
                        grayed={grayed}
                    >
                        <PlayableKey
                            onPress={onPress}
                            idx={i}
                            note={new NoteName(key, Accidental.FLAT)}
                            isCorrect={correctKeyValues.includes(
                                key.valueOf() - 1
                            )}
                            isWhite={false}
                            grayed={grayed}
                        />
                    </PlayableKey>
                ) : (
                    <PlayableKey
                        onPress={onPress}
                        idx={i}
                        note={new NoteName(key)}
                        isCorrect={correctKeyValues.includes(key.valueOf())}
                        isWhite={true}
                        grayed={grayed}
                    />
                )
            })}
        </div>
    )
}
