import clsx from 'clsx'
import { NoteName, WhiteKeyNoteName } from '../../../common/common'

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
    const getCommonKeyStyle = (i: number) => [
        'flex flex-grow max-w-5 border-r border-y h-full border-black',
        i == 0 && 'border-l',
    ]

    const colorKeyStyle = (
        key: WhiteKeyNoteName,
        isPreviousBlack: boolean = false
    ): string => {
        const isCorrect =
            correctKeys
                .map((k) => k.toValue())
                .includes(key + (isPreviousBlack ? -1 : 0)) && 'bg-green'
        const isPressed =
            pressedKeys
                .map((k) => k.toValue())
                .includes(key + (isPreviousBlack ? -1 : 0)) && 'bg-green'
        return isCorrect && isPressed
            ? 'bg-green'
            : isCorrect
            ? 'bg-yellow'
            : isPressed
            ? 'bg-red'
            : ''
    }

    const followingBlackKey = (key: WhiteKeyNoteName, i: number) =>
        ['d', 'e', 'g', 'a', 'b'].includes(
            WhiteKeyNoteName[key][0].toLowerCase()
        ) && i != 0

    return (
        <div className="flex h-52 justify-center relative">
            {keys.map((key, i) =>
                followingBlackKey(key, i) ? (
                    <div
                        key={i}
                        className={clsx(
                            'relative',
                            getCommonKeyStyle(i),
                            colorKeyStyle(key)
                        )}
                    >
                        <div
                            className={clsx(
                                'w-2/3 h-2/3 bg-black absolute -translate-x-1/2 z-10',
                                colorKeyStyle(key, true)
                            )}
                        ></div>
                    </div>
                ) : (
                    <div
                        key={i}
                        className={clsx(
                            getCommonKeyStyle(i),
                            colorKeyStyle(key)
                        )}
                    ></div>
                )
            )}
        </div>
    )
}
