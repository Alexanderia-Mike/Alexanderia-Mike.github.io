import { useContext, useEffect, useState } from 'react'
import Button from '../../common/button/button'
import {
    NoteName,
    OptionalNote,
    Accidental,
} from '../../common/notes-utils/notes'
import Toggle from '../../common/toggle/toggle'
import { Clef } from './clef'
import { whiteKeyNoteNames } from './notes_mapping'
import clsx from 'clsx'
import { ControlContext, NoteContext } from '../../common/context'
import { DropdownMenu } from '../../common/dropdownmenu/dropdownmenu'
import { randomSelect } from '../../common/utils'
import { FloatingDiv } from '../../common/floatingdiv/floatingdiv'
import { KeySignature } from '../../common/notes-utils/key-signature'

function generateRandomNoteName(
    clef: Clef,
    accidental: ShengJiangOption
): NoteName {
    // after adding 调号, will need to add Natural symbol to it
    const candidates = whiteKeyNoteNames[clef]
    const whiteKey = randomSelect(candidates)
    switch (accidental) {
        case ShengJiangOption.NO_SHENGJIANG:
            return whiteKey
        case ShengJiangOption.SHARP_ONLY:
            return whiteKey.copy(
                randomSelect([Accidental.SHARP, Accidental.DOUBLE_SHARP])
            )
        case ShengJiangOption.FLAT_ONLY:
            return whiteKey.copy(
                randomSelect([Accidental.FLAT, Accidental.DOUBLE_FLAT])
            )
        case ShengJiangOption.SHARP_FLAT_ONLY:
            return whiteKey.copy(
                randomSelect([
                    Accidental.SHARP,
                    Accidental.DOUBLE_SHARP,
                    Accidental.FLAT,
                    Accidental.DOUBLE_FLAT,
                ])
            )
        case ShengJiangOption.RANDOM_SHARP_FLAT:
            return whiteKey.copy(
                randomSelect([
                    Accidental.SHARP,
                    Accidental.DOUBLE_SHARP,
                    Accidental.FLAT,
                    Accidental.DOUBLE_FLAT,
                    // duplicate to increase the weight for NONE
                    Accidental.NONE,
                    Accidental.NONE,
                    Accidental.NONE,
                    Accidental.NONE,
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
    const [accidental, setShengjiang] = useState<ShengJiangOption>(
        ShengJiangOption.NO_SHENGJIANG
    )

    const { newNoteTrigger, triggerNewNote } = useContext(ControlContext)
    const { setKeySignature } = useContext(NoteContext)

    const clefDropdownOnSelect = (value: Clef | undefined) => {
        if (value == undefined) {
            setRandomClef(true)
        } else {
            updateClef(value)
        }
    }
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
        updateNoteName(generateRandomNoteName(newClef || clef, accidental))
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
                    onChange={autoGenerateToggleOnChange}
                    label="自动出题"
                    render={() => (
                        <div className="flex items-center">
                            <span className="mr-1">自动出题 </span>
                            <FloatingDiv
                                content="当回答正确后，自动出下一题"
                                width={20}
                            />
                        </div>
                    )}
                />
                <DropdownMenu
                    elements={[
                        { label: '高音谱号', value: Clef.TREBLE },
                        { label: '低音谱号', value: Clef.BASS },
                        { label: '随机高低音', value: undefined },
                    ]}
                    onSelect={clefDropdownOnSelect}
                    defaultIndex={0}
                    label="谱号"
                    classNames="w-40"
                />
                <DropdownMenu
                    // TODO: implements other 调号
                    elements={[
                        { label: 'C大调 / A小调', value: KeySignature.C },
                        { label: 'D大调 / B小调', value: KeySignature.D },
                        { label: 'E大调 / #C小调', value: KeySignature.E },
                        { label: 'F大调 / D小调', value: KeySignature.F },
                        { label: 'G大调 / E小调', value: KeySignature.G },
                        { label: 'A大调 / #F小调', value: KeySignature.A },
                        { label: 'B大调 / #G小调', value: KeySignature.B },
                        {
                            label: 'bC大调 / bA小调',
                            value: KeySignature.FLAT_C,
                        },
                        {
                            label: 'bD大调 / bB小调',
                            value: KeySignature.FLAT_D,
                        },
                        { label: 'bE大调 / C小调', value: KeySignature.FLAT_E },
                        {
                            label: '#F大调 / #D小调',
                            value: KeySignature.SHARP_F,
                        },
                        {
                            label: 'bG大调 / bE小调',
                            value: KeySignature.FLAT_G,
                        },
                        { label: 'bA大调 / F小调', value: KeySignature.FLAT_A },
                        { label: 'bB大调 / G小调', value: KeySignature.FLAT_B },
                    ]}
                    onSelect={(value) => {
                        setKeySignature(value)
                    }}
                    defaultIndex={0}
                    label="调号"
                    classNames="w-40"
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
                    defaultIndex={0}
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
