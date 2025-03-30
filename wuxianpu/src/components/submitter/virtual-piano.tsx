import { useContext, useEffect, useRef, useState } from 'react'
import { ControlContext, NoteContext } from '../../common/context'
import { PlayableKey } from './lib/piano/piano-key'
import PlayablePiano from './lib/piano/playable-piano'
import { SubmitterInterface } from './submitter-interface'
import { checkAnswerNote } from './lib/check-answer'
import { SelectionPanel } from '../../common/selectionpanel/selectionpanel'
import { PitchNotation } from '../../common/notes-utils/pitch-notation'
import Toggle from '../../common/toggle/toggle'
import {
    disableTone,
    enableTone,
    isToneEnabled,
} from './lib/piano/piano-audios'

interface VirtualPianoProps extends SubmitterInterface {}

/**
 * TODO issues:
 *  3. scrollbar does not show on my phone, so need to implement a customized scrollbar in piano interface
 */
export default function VirtualPiano({
    incrementCorrect,
    incrementTotal,
}: VirtualPianoProps) {
    const { currentNote, inputNote, setInputNote } = useContext(NoteContext)
    const [feedback, setFeedback] = useState('')
    const { triggerNewNote } = useContext(ControlContext)
    const [pitchNotation, setPitchNotation] = useState(PitchNotation.HELMHOLTZ)

    const onPress = (k: PlayableKey) => {
        setInputNote(k.props.note)
    }

    const isFirst = useRef(true)
    useEffect(() => {
        if (!isFirst.current) {
            const [_, displayContent] = checkAnswerNote(
                inputNote,
                currentNote,
                incrementTotal,
                incrementCorrect,
                triggerNewNote
            )
            setFeedback(displayContent)
        }
        isFirst.current = false
    }, [inputNote])

    return (
        <div className="min-h-[500px]">
            <div className="flex justify-center items-center flex-wrap">
                <Toggle
                    label="开启扬声器"
                    onChange={isToneEnabled() ? disableTone : enableTone}
                    checked={isToneEnabled()}
                    classNames="flex-grow-0"
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
                    label="音高标记"
                    defaultIndex={0}
                    onSelect={(value) => setPitchNotation(value)}
                    classNames="flex-grow-0"
                />
            </div>
            <span className="text-center block">{feedback}</span>
            <div className="h-5"></div>
            <PlayablePiano
                correctKeys={currentNote ? [currentNote] : []}
                onPress={onPress}
                grayed={false}
                resizable={false}
                showColor={inputNote != undefined}
                displayNotes={pitchNotation}
            />
        </div>
    )
}
