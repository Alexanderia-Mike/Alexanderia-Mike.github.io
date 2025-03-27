import clsx from 'clsx'
import {
    ALL_WHITE_KEYS,
    NoteName,
    NoteNameBase,
    WhiteKeyNoteName,
} from '../../../../common/notes-utils/notes'
import { PianoKey, PianoKeyProps, WhiteKey } from './piano-interface'

const keys = ALL_WHITE_KEYS

interface ReadOnlyPianoProps {
    correctKeys: NoteName[]
    pressedKeys?: NoteName[]
    scrollable: boolean // if true, piano will be scrollable when the window is small
    grayed?: boolean
}

export default function ReadOnlyPiano({
    correctKeys,
    pressedKeys,
    scrollable,
    grayed = false,
}: ReadOnlyPianoProps) {
    const followingBlackKey = (key: WhiteKeyNoteName, i: number) =>
        ['d', 'e', 'g', 'a', 'b'].includes(
            NoteNameBase[key.noteNameBase][0].toLowerCase()
        ) && i != 0

    return (
        <div
            className={clsx(
                'flex justify-center relative h-14',
                scrollable && ['sm:h-20 md:h-32 lg:h-40'],
                !scrollable && 'min-w-[1100px] overflow-auto'
            )}
        >
            {keys.map((key, i) =>
                followingBlackKey(key, i) ? (
                    <WhiteKey
                        followingBlackKey={true}
                        idx={i}
                        note={new NoteName(key)}
                        isCorrect={keyIsCorrect}
                    />
                ) : (
                    // <div
                    //     key={i}
                    //     className={clsx('relative', getCommonKeyStyle(i))}
                    //     style={colorKeyStyle(key)}
                    // >
                    //     <div
                    //         className={clsx(
                    //             'w-2/3 h-2/3 absolute -translate-x-1/2 z-10',
                    //             grayed && 'bg-gray-300',
                    //             !grayed && 'bg-black'
                    //         )}
                    //         style={colorKeyStyle(key, true)}
                    //     ></div>
                    // </div>
                    <div
                    // key={i}
                    // className={clsx(getCommonKeyStyle(i))}
                    // style={colorKeyStyle(key)}
                    ></div>
                )
            )}
        </div>
    )
}
