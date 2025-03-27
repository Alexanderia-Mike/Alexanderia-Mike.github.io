import { useContext, useRef, useState } from 'react'
import Button from '../../common/button/button'
import {
    noteNameToSolfege,
    parseGeneralSolfege,
    parseNoteName,
} from '../../common/notes-utils/utils'
import { SubmitterInterface } from './submitter-interface'
import { ControlContext, NoteContext } from '../../common/context'
import { checkAnswerNote, checkAnswerSolfege } from './lib/check-answer'
import clsx from 'clsx'
import { DropdownMenu } from '../../common/dropdownmenu/dropdownmenu'
import { Sharp } from '../staff/symbols/accidentals/sharp'
import { Flat } from '../staff/symbols/accidentals/flat'
import { DoubleSharp } from '../staff/symbols/accidentals/double_sharp'
import { DoubleFlat } from '../staff/symbols/accidentals/double_flat'
import { PitchNotation } from '../../common/notes-utils/pitch-notation'
import { SelectionPanel } from '../../common/selectionpanel/selectionpanel'
import { GeneralSolfege } from '../../common/notes-utils/solfege'
import { NoteName } from '../../common/notes-utils/notes'

export function TextSubmitter({
    incrementCorrect,
    incrementTotal,
}: SubmitterInterface) {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const { currentNote, setInputNote, keySignature } = useContext(NoteContext)
    const { triggerNewNote } = useContext(ControlContext)
    const [useSolfege, setUseSolfege] = useState(false)

    const [accidentalString, setShengjiangString] = useState('')
    const [pitchNotation, setPitchNotation] = useState<PitchNotation>(
        PitchNotation.HELMHOLTZ
    )

    const submitButtonTemplate = <T,>(
        parseInput: (str: string) => T | undefined,
        checkAnswer: (v: T) => string
    ) => {
        if (inputRef.current) {
            const inputString = inputRef.current.value
            const combinedInputString = accidentalString + inputString
            console.log(`combinedInputString is ${combinedInputString}`)
            const parsed = parseInput(combinedInputString)
            if (parsed == undefined) {
                if (spanRef.current)
                    spanRef.current.innerText = `不能识别 ${inputRef.current.value}！`
            } else {
                const displayContent = checkAnswer(parsed)
                if (spanRef.current) {
                    spanRef.current.innerText = displayContent
                }
            }
        }
    }

    const submitButtonOnClick = () => {
        if (useSolfege) {
            submitButtonTemplate(
                parseGeneralSolfege,
                (solfege: GeneralSolfege) => {
                    const [_, displayContent] = checkAnswerSolfege(
                        solfege,
                        currentNote &&
                            noteNameToSolfege(currentNote, keySignature),
                        incrementTotal,
                        incrementCorrect,
                        triggerNewNote
                    )
                    return displayContent
                }
            )
        } else {
            submitButtonTemplate(
                (noteString: string) =>
                    parseNoteName(noteString, pitchNotation),
                (note: NoteName) => {
                    setInputNote(note)
                    const [_, displayContent] = checkAnswerNote(
                        note,
                        currentNote,
                        incrementTotal,
                        incrementCorrect,
                        triggerNewNote,
                        pitchNotation,
                        true
                    )
                    return displayContent
                }
            )
        }
    }

    const spanRef = useRef<HTMLSpanElement | null>(null)

    return (
        <div className="flex flex-col items-center justify-center mb-20">
            <SelectionPanel
                elements={[
                    { label: '音名 (固定调)', value: false },
                    { label: '唱名 (首调)', value: true },
                ]}
                label="训练目标"
                defaultIndex={0}
                onSelect={(value) => setUseSolfege(value)}
                classNames="flex-grow-0 mb-5"
            />
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
                hide={useSolfege}
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
                        },
                        {
                            label: '降号',
                            value: '降 ',
                        },
                        {
                            label: '重升号',
                            value: '重升 ',
                        },
                        {
                            label: '重降号',
                            value: '重降 ',
                        },
                        {
                            label: '三重升号',
                            value: '三重升 ',
                        },
                        {
                            label: '三重降号',
                            value: '三重降 ',
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
                    placeholder={`输入${useSolfege ? '唱名' : '音名'} (如 ${
                        useSolfege
                            ? '1, 2, 3'
                            : pitchNotation == PitchNotation.HELMHOLTZ
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
