import { useContext, useEffect, useRef, useState } from 'react'
import { ControlContext, NoteContext } from '../../common/context'
import { PlayableKey } from './lib/piano/piano-interface'
import PlayablePiano from './lib/piano/playable-piano'
import { SubmitterInterface } from './submitter-interface'
import { checkAnswerNote } from './lib/check-answer'

interface VirtualPianoProps extends SubmitterInterface {}

/**
 * TODO issues:
 *  2. once released, the color changes immediately -- need to freeze the color when released
 *  3. scrollbar does not show on my phone, so need to implement a customized scrollbar in piano interface
 *  4. need to play sound when pressing keys
 *  5. show key names
 */
export default function VirtualPiano({
    incrementCorrect,
    incrementTotal,
}: VirtualPianoProps) {
    const { currentNote, inputNote, setInputNote } = useContext(NoteContext)
    const [feedback, setFeedback] = useState('')
    const { triggerNewNote } = useContext(ControlContext)

    const onPress = (k: PlayableKey) => {
        // TODO: check answer
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
        <div className="mb-20">
            <span className="text-center block">{feedback}</span>
            <PlayablePiano
                correctKeys={currentNote ? [currentNote] : []}
                onPress={onPress}
                grayed={false}
                resizable={false}
                showColor={true}
            />
        </div>
    )
}
