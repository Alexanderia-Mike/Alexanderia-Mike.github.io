import { useContext, useEffect, useRef, useState } from 'react'
import { getMidi, handleMidiMessages, midiToNoteName } from './lib/midi'
import { SubmitterInterface } from './submitter-interface'
import ReadonlyPiano from './lib/readonly-piano'
import { ControlContext, NoteContext } from '../../common/context'
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
    const { triggerNewNote } = useContext(ControlContext)

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
            deviceSuccess(
                `当前连接到设备: [${midiAccess.inputs
                    .values()
                    .map((i) => i.name)
                    .toArray()}]`
            )
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

    const isFirst = useRef(true)
    useEffect(() => {
        console.log(`isFirst is ${isFirst.current}`)
        if (!isFirst.current) {
            const [_, displayContent] = checkAnswer(
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
        <div>
            <div className="flex flex-row justify-center items-center">
                <span
                    className={clsx(
                        'text-center flex text-lg',
                        deviceHealthy ? 'text-green-400' : 'text-red-500'
                    )}
                >
                    {deviceMessage}
                </span>
                <Button
                    label={'重新连接'}
                    onClick={setupMidi}
                    hide={deviceHealthy}
                />
            </div>
            <div className="my-2 flex flex-row justify-center items-center">
                <span
                    className={clsx('text-center flex text-sm text-gray-400')}
                >
                    请用数据线连接您的电脑和支持 MIDI API 的电子乐器
                </span>
            </div>
            <span className="text-center block">{feedback}</span>
            <div className="h-5"></div>
            <ReadonlyPiano
                correctKeys={currentNote ? [currentNote] : []}
                pressedKeys={inputNote ? [inputNote] : []}
                showColor={inputNote != undefined}
                grayed={!deviceHealthy}
            />
        </div>
    )
}
