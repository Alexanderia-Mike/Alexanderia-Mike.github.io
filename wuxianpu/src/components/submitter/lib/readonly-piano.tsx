import clsx from 'clsx'
import {
    ALL_WHITE_KEYS,
    NoteName,
    NoteNameBase,
    WhiteKeyNoteName,
} from '../../../common/notes-utils/notes'

const keys = ALL_WHITE_KEYS

export default function ReadonlyPiano({
    correctKeys = [],
    pressedKeys = [],
    showColor = false,
    grayed = false,
}: {
    correctKeys?: NoteName[]
    pressedKeys?: NoteName[]
    showColor?: boolean
    grayed?: boolean
}) {
    const getCommonKeyStyle = (i: number) => [
        'flex flex-grow max-w-5 border-r border-y h-full',
        grayed && 'border-gray-300',
        !grayed && 'border-black',
        i == 0 && 'border-l',
    ]

    const colorKeyStyle = (
        key: WhiteKeyNoteName,
        isPreviousBlack: boolean = false
    ): React.CSSProperties => {
        if (!showColor) {
            return {}
        }
        const isCorrect = correctKeys
            .map((k) => k.valueOf())
            .includes(key.valueOf() + (isPreviousBlack ? -1 : 0))
        const isPressed = pressedKeys
            .map((k) => k.valueOf())
            .includes(key.valueOf() + (isPreviousBlack ? -1 : 0))
        return isCorrect && isPressed
            ? { backgroundColor: '#7CFC00' }
            : isCorrect
            ? { backgroundColor: 'yellow' }
            : isPressed
            ? { backgroundColor: 'red' }
            : {}
    }

    const followingBlackKey = (key: WhiteKeyNoteName, i: number) =>
        ['d', 'e', 'g', 'a', 'b'].includes(
            NoteNameBase[key.noteNameBase][0].toLowerCase()
        ) && i != 0

    return (
        <div
            className={clsx(
                'flex justify-center relative',
                'h-14',
                'sm:h-20',
                'md:h-32',
                'lg:h-40'
            )}
        >
            {keys.map((key, i) =>
                followingBlackKey(key, i) ? (
                    <div
                        key={i}
                        className={clsx('relative', getCommonKeyStyle(i))}
                        style={colorKeyStyle(key)}
                    >
                        <div
                            className={clsx(
                                'w-2/3 h-2/3 absolute -translate-x-1/2 z-10',
                                grayed && 'bg-gray-300',
                                !grayed && 'bg-black'
                            )}
                            style={colorKeyStyle(key, true)}
                        ></div>
                    </div>
                ) : (
                    <div
                        key={i}
                        className={clsx(getCommonKeyStyle(i))}
                        style={colorKeyStyle(key)}
                    ></div>
                )
            )}
        </div>
    )
}
