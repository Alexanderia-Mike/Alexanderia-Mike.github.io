import { useRef, useState } from 'react'
import Button from '../../common/button/button'
import { NoteName } from '../../common/common'
import Toggle from '../../common/toggle/toggle'
import { Clef } from './clef'
import { noteNames } from './notes_mapping'
import clsx from 'clsx'

function generateRandomNoteName(clef: Clef): NoteName {
    const candidates = noteNames[clef]
    const index = Math.floor(Math.random() * candidates.length)
    return candidates[index]
}

function generateRandomClef(): Clef {
    return Math.random() > 0.5 ? Clef.TREBLE : Clef.BASS
}

export default function Control({
    clef,
    updateNoteName,
    updateClef,
}: {
    clef: Clef
    updateNoteName: React.Dispatch<React.SetStateAction<NoteName | undefined>>
    updateClef: React.Dispatch<React.SetStateAction<Clef>>
}) {
    const [randomClef, setRandomClef] = useState<boolean>(false)
    const [correct, setCorrect] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)

    const resetButtonOnClick = () => {
        updateNoteName(undefined)
        setCorrect(0)
        setTotal(0)
    }

    const clefToggleOnChange = () => {
        if (!randomClef) updateClef(clef == Clef.BASS ? Clef.TREBLE : Clef.BASS)
    }

    const randomClefToggleOnChange = () => setRandomClef(!randomClef)

    const generateButtonOnClick = () => {
        let newClef = null
        if (randomClef) {
            newClef = generateRandomClef()
            updateClef(newClef)
        }
        updateNoteName(generateRandomNoteName(newClef || clef))
    }

    return (
        <div className={clsx(
            "flex flex-row",
            "md:flex-col"
        )}>
            <div
                className={clsx(
                    'flex my-5 justify-center',
                    'flex-row items-center',
                    'md:flex-col md:items-start'
                )}
            >
                <Toggle
                    onText="高音谱号"
                    offText="低音谱号"
                    onChange={clefToggleOnChange}
                    hide={randomClef}
                />
                <Toggle
                    onChange={randomClefToggleOnChange}
                    commonText="随机高低音谱"
                />
            </div>
            <div className="flex justify-center items-center">
                <div className="flex flex-grow justify-center items-center">
                    <Button
                        label={'生成练习题'}
                        onClick={generateButtonOnClick}
                    />
                </div>
                <div
                    className={clsx(
                        total || 'hidden',
                        'flex flex-grow justify-center items-center'
                    )}
                >
                    {/* <div className={clsx(total || 'hidden')}> */}
                    <span>正确 / 共计: </span>{' '}
                    <span className="ml-10">
                        {correct} / {total}
                    </span>
                    {/* </div> */}
                    <Button
                        label={'重置'}
                        onClick={resetButtonOnClick}
                        // hide={!total}
                    />
                </div>
            </div>
        </div>
    )
}
