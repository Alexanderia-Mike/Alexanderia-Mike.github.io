import { useContext, useEffect, useState } from 'react'
import { getMidi, handleMidiMessages, midiToNoteName } from './lib/midi'
import { SubmitterInterface } from './submitter-interface'
import ReadonlyPiano from './lib/readonly-piano'
import { NoteContext } from '../../common/context'
import { checkAnswer } from './lib/check-answer'
import Button from '../../common/button/button'
import clsx from 'clsx'

let lastTimestamp = 0

interface MIDIPianoProps extends SubmitterInterface {}

export default function MIDIPiano({
    incrementCorrect,
    incrementTotal,
}: MIDIPianoProps) {
    const [deviceMessage, setDeviceMessage] = useState('')
    const [deviceHealthy, setDeviceHealthy] = useState(true)
    const [feedback, setFeedback] = useState('')
    const { currentNote, inputNote, setInputNote } = useContext(NoteContext)

    const deviceError = (message: string) => {
        setDeviceHealthy(false)
        setDeviceMessage(message)
    }

    const deviceSuccess = (message: string) => {
        setDeviceHealthy(true)
        setDeviceMessage(message)
    }

    const setupMidi = async function () {
        try {
            const midiAccess = await getMidi()
            if (midiAccess.inputs.size == 0) {
                throw Error('没有检测到 MIDI 设备!')
            }
            deviceSuccess(`当前连接到设备: [${midiAccess.inputs
                    .values()
                    .map((i) => i.name)
                    .toArray()}]`)
            handleMidiMessages(midiAccess, (message) => {
                if (message.data) {
                    const [eventType, keyNote, _] = message.data
                    if (eventType != 144) {
                        return
                    }
                    const timestamp = message.timeStamp
                    if (timestamp == lastTimestamp) {
                        return
                    }
                    lastTimestamp = timestamp
                    const noteName = midiToNoteName(keyNote)
                    setInputNote(noteName)
                }
            })
        } catch (e) {
            deviceError((e as Error).message)
        }
    }

    useEffect(() => {
        setupMidi()
    })

    useEffect(() => {
        const [_, displayContent] = checkAnswer(
            inputNote,
            currentNote,
            incrementTotal,
            incrementCorrect
        )
        setFeedback(displayContent)
    }, [inputNote])

    return (
        <div>
            <div className="flex flex-row justify-center items-center">
                <span className={clsx("text-center flex", deviceHealthy ? "text-green-400" : "text-red-500")}>
                    {deviceMessage}
                </span>
                <Button
                    label={'重新连接'}
                    onClick={setupMidi}
                    hide={deviceHealthy}
                />
            </div>
            <span className="text-center block">{feedback}</span>
            <div className="h-5"></div>
            <ReadonlyPiano
                correctKeys={currentNote ? [currentNote] : []}
                pressedKeys={inputNote ? [inputNote] : []}
                showColor={inputNote != undefined}
            />
        </div>
    )
}
