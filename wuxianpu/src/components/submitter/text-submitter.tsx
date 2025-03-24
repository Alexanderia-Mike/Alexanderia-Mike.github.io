import { useContext, useRef, useState } from 'react'
import Button from '../../common/button/button'
import { parseNoteName } from '../../common/notes-utils/notes'
import { SubmitterInterface } from './submitter-interface'
import { ControlContext, NoteContext } from '../../common/context'
import { checkAnswer } from './lib/check-answer'
import clsx from 'clsx'
import { DropdownMenu } from '../../common/dropdownmenu/dropdownmenu'
import { Sharp } from '../staff/symbols/accidentals/sharp'
import { Flat } from '../staff/symbols/accidentals/flat'
import { DoubleSharp } from '../staff/symbols/accidentals/double_sharp'
import { DoubleFlat } from '../staff/symbols/accidentals/double_flat'
import { PitchNotation } from '../../common/notes-utils/pitch-notation'
import { SelectionPanel } from '../../common/selectionpanel/selectionpanel'

export function TextSubmitter({
    incrementCorrect,
    incrementTotal,
}: SubmitterInterface) {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const { currentNote, setInputNote } = useContext(NoteContext)
    const { triggerNewNote } = useContext(ControlContext)

    const [shengjiangString, setShengjiangString] = useState('')
    const [pitchNotation, setPitchNotation] = useState<PitchNotation>(
        PitchNotation.HELMHOLTZ
    )

    const submitButtonOnClick = () => {
        if (inputRef.current) {
            const whiteKeyNoteName = inputRef.current.value
            const combinedNoteString = shengjiangString + whiteKeyNoteName
            console.log(`combinedNoteString is ${combinedNoteString}`)
            const noteName = parseNoteName(combinedNoteString, pitchNotation)
            if (noteName == undefined) {
                if (spanRef.current)
                    spanRef.current.innerText = `不能识别 ${inputRef.current.value}！`
            } else {
                setInputNote(noteName)
                const [_, displayContent] = checkAnswer(
                    noteName,
                    currentNote,
                    incrementTotal,
                    incrementCorrect,
                    triggerNewNote,
                    pitchNotation
                )
                if (spanRef.current) {
                    spanRef.current.innerText = displayContent
                }
            }
        }
    }

    const spanRef = useRef<HTMLSpanElement | null>(null)

    return (
        <div className="flex flex-col items-center justify-center mb-10">
            <SelectionPanel
                elements={[
                    {
                        label: '亥姆霍茲音高记号',
                        value: PitchNotation.HELMHOLTZ,
                    },
                    {
                        label: '科学音高记号',
                        value: PitchNotation.SCIENTIFIC,
                    },
                ]}
                label="音高记号"
                defaultIndex={0}
                onSelect={(value) => setPitchNotation(value)}
                classNames="flex-grow-0 mb-5"
            />
            <div
                className={clsx(
                    'flex items-center justify-center',
                    'flex-col', // on phone
                    'md:flex-row' // other devices
                )}
            >
                <DropdownMenu
                    elements={[
                        { label: '无', value: '' },
                        {
                            label: '升号',
                            value: '升 ',
                            render: () => (
                                <div className="w-full h-10 relative">
                                    <Sharp
                                        x_percent={50}
                                        y_percent={50}
                                        width={30}
                                    />
                                </div>
                            ),
                        },
                        {
                            label: '降号',
                            value: '降 ',
                            render: () => (
                                <div className="w-full h-10 relative">
                                    <Flat
                                        x_percent={50}
                                        y_percent={50}
                                        width={30}
                                    />
                                </div>
                            ),
                        },
                        {
                            label: '重升号',
                            value: '重升 ',
                            render: () => (
                                <div className="w-full h-10 relative">
                                    <DoubleSharp
                                        x_percent={50}
                                        y_percent={50}
                                        width={17}
                                    />
                                </div>
                            ),
                        },
                        {
                            label: '重降号',
                            value: '重降 ',
                            render: () => (
                                <div className="w-full h-10 relative">
                                    <DoubleFlat
                                        x_percent={50}
                                        y_percent={50}
                                        width={30}
                                    />
                                </div>
                            ),
                        },
                    ]}
                    onSelect={(value) => setShengjiangString(value)}
                    label="升降号"
                    defaultIndex={0}
                    classNames="flex-grow-0"
                />
                <input
                    type="text"
                    id="noteInput"
                    ref={inputRef}
                    placeholder={`输入音名 (如 ${
                        pitchNotation == PitchNotation.HELMHOLTZ
                            ? 'c, D, e2'
                            : 'C3, D2, E5'
                    })`}
                    className="rounded-full mx-4 mt-2 mb-4 sm:mb-2 px-3 py-2 text-md border border-solid border-slate-400 min-w-10"
                />
                <Button label={'提交答案'} onClick={submitButtonOnClick} />
            </div>
            <span
                className="mt-3 text-center text-orange-400"
                ref={spanRef}
            ></span>
        </div>
    )
}
