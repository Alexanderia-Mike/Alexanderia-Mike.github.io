import { useEffect, useState } from 'react'
import { getMidi, handleMidiMessages, midiToHelmholtz } from './lib/midi'
import { SubmitterInterface } from './submitter-interface'
import { generateNoteName, NoteName } from '../../common/common'

let lastTimestamp = 0

interface BluetoothPianoProps extends SubmitterInterface {}

export default function BluetoothPiano({
    currentNoteName,
    incrementCorrect,
    incrementTotal,
}: BluetoothPianoProps) {
    const [errMessage, setErrMessage] = useState('')
    const [deviceMessage, setDeviceMessage] = useState('')
    const [feedback, setFeedback] = useState('')
    const [inputNoteName, setInputNoteName] = useState<NoteName | undefined>(
        undefined
    )

    useEffect(() => {
        ;(async function () {
            try {
                const midiAccess = await getMidi()
                if (midiAccess.inputs.size == 0) {
                    throw Error('no midi device connected!')
                }
                setDeviceMessage(
                    `currently connected devices: [${midiAccess.inputs
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
                        const noteName = generateNoteName(
                            midiToHelmholtz(keyNote)
                        )
                        setInputNoteName(noteName)
                    }
                })
            } catch (e) {
                setErrMessage((e as Error).message)
            }
        })()
    })

    useEffect(() => {
        // TODO: change it to use piano interface
        const displayContent = !currentNoteName
            ? '请先生成练习题！'
            : inputNoteName == currentNoteName
            ? `正确✅！答案是${NoteName[inputNoteName]}`
            : `错误❌！答案是${NoteName[currentNoteName]}`
        setFeedback(displayContent)
        if (currentNoteName) {
            incrementTotal()
            if (inputNoteName == currentNoteName) {
                incrementCorrect()
            }
        }
    }, [inputNoteName])

    return (
        <div>
            <span className="text-center block">{errMessage}</span>
            <span className="text-center block">{deviceMessage}</span>
            <span className='text-center block'>{feedback}</span>
        </div>
    )
}
