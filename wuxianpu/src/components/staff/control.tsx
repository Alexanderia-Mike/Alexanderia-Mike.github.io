import { useContext, useEffect, useState } from 'react'
import Button from '../../common/button/button'
import { NoteName, OptionalNote, UpDownSymbol } from '../../common/common'
import Toggle from '../../common/toggle/toggle'
import { Clef } from './clef'
import { whiteKeyNoteNames } from './notes_mapping'
import clsx from 'clsx'
import { ControlContext } from '../../common/context'
import { DropdownMenu } from '../../common/dropdownmenu/dropdownmenu'
import { randomSelect } from '../../common/utils'

function generateRandomNoteName(
    clef: Clef,
    shengjiang: ShengJiangOption
): NoteName {
    // after adding 调号, will need to add Natural symbol to it
    const candidates = whiteKeyNoteNames[clef]
    const whiteKey = randomSelect(candidates)
    switch (shengjiang) {
        case ShengJiangOption.NO_SHENGJIANG:
            return whiteKey
        case ShengJiangOption.SHARP_ONLY:
            return whiteKey.copy(
                randomSelect([UpDownSymbol.SHARP, UpDownSymbol.DOUBLE_SHARP])
            )
        case ShengJiangOption.FLAT_ONLY:
            return whiteKey.copy(
                randomSelect([UpDownSymbol.FLAT, UpDownSymbol.DOUBLE_FLAT])
            )
        case ShengJiangOption.SHARP_FLAT_ONLY:
            return whiteKey.copy(
                randomSelect([
                    UpDownSymbol.SHARP,
                    UpDownSymbol.DOUBLE_SHARP,
                    UpDownSymbol.FLAT,
                    UpDownSymbol.DOUBLE_FLAT,
                ])
            )
        case ShengJiangOption.RANDOM_SHARP_FLAT:
            return whiteKey.copy(
                randomSelect([
                    UpDownSymbol.SHARP,
                    UpDownSymbol.DOUBLE_SHARP,
                    UpDownSymbol.FLAT,
                    UpDownSymbol.DOUBLE_FLAT,
                    // duplicate to increase the weight for NONE
                    UpDownSymbol.NONE,
                    UpDownSymbol.NONE,
                    UpDownSymbol.NONE,
                    UpDownSymbol.NONE,
                ])
            )
    }
}

function generateRandomClef(): Clef {
    return randomSelect([Clef.TREBLE, Clef.BASS])
}

enum ShengJiangOption {
    NO_SHENGJIANG = 1,
    SHARP_ONLY = 2,
    FLAT_ONLY = 3,
    SHARP_FLAT_ONLY = 4,
    RANDOM_SHARP_FLAT = 5,
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
    const [shengjiang, setShengjiang] = useState<ShengJiangOption>(
        ShengJiangOption.NO_SHENGJIANG
    )

    const { newNoteTrigger, triggerNewNote } = useContext(ControlContext)

    const clefToggleOnChange = () => {
        if (!randomClef) updateClef(clef == Clef.BASS ? Clef.TREBLE : Clef.BASS)
    }
    const randomClefToggleOnChange = () => setRandomClef(!randomClef)
    const autoGenerateToggleOnChange = () => {
        const newAutoGenerate = !autoGenerate
        setAutoGenerate(newAutoGenerate)
        if (newAutoGenerate) {
            triggerNewNote()
        }
    }

    const generateButtonOnClick = () => {
        let newClef = null
        if (randomClef) {
            newClef = generateRandomClef()
            updateClef(newClef)
        }
        updateNoteName(generateRandomNoteName(newClef || clef, shengjiang))
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
        <div className={clsx('flex flex-col')}>
            <div
                className={clsx(
                    'flex my-5 flex-row items-center flex-wrap',
                    'md:flex-col md:items-start md:justify-center'
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
                        {
                            label: '无升降音',
                            value: ShengJiangOption.NO_SHENGJIANG,
                        },
                        { label: '仅升音', value: ShengJiangOption.SHARP_ONLY },
                        { label: '仅降音', value: ShengJiangOption.FLAT_ONLY },
                        {
                            label: '仅升/降音',
                            value: ShengJiangOption.SHARP_FLAT_ONLY,
                        },
                        {
                            label: '随机升/降音',
                            value: ShengJiangOption.RANDOM_SHARP_FLAT,
                        },
                    ]}
                    onSelect={(value) => setShengjiang(value)}
                    label="升降号"
                    classNames="w-40"
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
