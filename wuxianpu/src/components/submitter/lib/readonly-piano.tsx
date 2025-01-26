import clsx from 'clsx'
import { NoteName, WhiteKeyNoteName } from '../../../common/common'

const keys = Object.entries(WhiteKeyNoteName)
    .filter(([_, v]) => typeof v == 'number')
    .map(([_, v]) => v as WhiteKeyNoteName)
    .sort((a, b) => a - b)

export default function ReadonlyPiano({
    correctKeys = [],
    pressedKeys = [],
    showColor = false,
}: {
    correctKeys?: NoteName[]
    pressedKeys?: NoteName[]
    showColor?: boolean
}) {
    const getCommonKeyStyle = (i: number) => [
        'flex flex-grow max-w-5 border-r border-y h-full border-black',
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
            .map((k) => k.toValue())
            .includes(key + (isPreviousBlack ? -1 : 0))
        const isPressed = pressedKeys
            .map((k) => k.toValue())
            .includes(key + (isPreviousBlack ? -1 : 0))
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
            WhiteKeyNoteName[key][0].toLowerCase()
        ) && i != 0

    return (
        <div className="flex h-40 justify-center relative">
            {keys.map((key, i) =>
                followingBlackKey(key, i) ? (
                    <div
                        key={i}
                        className={clsx('relative', getCommonKeyStyle(i))}
                        style={colorKeyStyle(key)}
                    >
                        <div
                            className="w-2/3 h-2/3 bg-black absolute -translate-x-1/2 z-10"
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
