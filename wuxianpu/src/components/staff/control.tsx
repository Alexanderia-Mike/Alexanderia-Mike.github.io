import { useContext, useEffect, useState } from 'react'
import Button from '../../common/button/button'
import { NoteName, OptionalNote } from '../../common/common'
import Toggle from '../../common/toggle/toggle'
import { Clef } from './clef'
import { noteNames } from './notes_mapping'
import clsx from 'clsx'
import { ControlContext } from '../../common/context'
import { DropdownMenu } from '../../common/dropdownmenu/dropdownmenu'

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
    clearInputNote,
}: {
    clef: Clef
    updateNoteName: React.Dispatch<React.SetStateAction<OptionalNote>>
    updateClef: React.Dispatch<React.SetStateAction<Clef>>
    clearInputNote: () => void
}) {
    const [randomClef, setRandomClef] = useState<boolean>(false)
    const [autoGenerate, setAutoGenerate] = useState<boolean>(false)
    const [scanAnimate, setScanAnimate] = useState<boolean>(false)

    const { newNoteTrigger } = useContext(ControlContext)

    const clefToggleOnChange = () => {
        if (!randomClef) updateClef(clef == Clef.BASS ? Clef.TREBLE : Clef.BASS)
    }

    const randomClefToggleOnChange = () => setRandomClef(!randomClef)
    const autoGenerateToggleOnChange = () => setAutoGenerate(!autoGenerate)

    const generateButtonOnClick = () => {
        let newClef = null
        if (randomClef) {
            newClef = generateRandomClef()
            updateClef(newClef)
        }
        updateNoteName(generateRandomNoteName(newClef || clef))
        clearInputNote()
    }

    useEffect(() => {
        if (autoGenerate) {
            setScanAnimate(true)
            const timeout = setTimeout(() => {
                generateButtonOnClick()
                setScanAnimate(false)
            }, 1000)
            return () => clearTimeout(timeout)
        }
    }, [newNoteTrigger])

    return (
        <div className={clsx('flex flex-row', 'md:flex-col')}>
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
                <Toggle
                    onChange={autoGenerateToggleOnChange}
                    commonText="自动出题"
                />
                <DropdownMenu
                    elements={[
                        {label: "aha", value: 1},
                        {label: "ihi", value: 2},
                    ]}
                    onSelect={value => console.log(value)}
                    label='升降号'
                />
            </div>
            <div className="flex justify-center items-center">
                <div className="flex flex-grow justify-center items-center">
                    <Button
                        label={'生成练习题'}
                        onClick={generateButtonOnClick}
                        classNames="relative overflow-hidden"
                    >
                        {autoGenerate && scanAnimate && (
                            <span className="absolute inset-0 bg-[#46a823] w-full h-full left-[-100%] animate-scan"></span>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}
