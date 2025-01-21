import { useEffect, useState } from 'react'
import { getMidi, handleMidiMessages, midiToHelmholtz } from './lib/midi'
import { SubmitterInterface } from './submitter-interface'
import { generateNoteName, WhiteKeyNoteName } from '../../common/common'
import ReadonlyPiano from './lib/readonly-piano'

let lastTimestamp = 0

interface MIDIPianoProps extends SubmitterInterface {}

export default function MIDIPiano({
    currentNoteName,
    incrementCorrect,
    incrementTotal,
}: MIDIPianoProps) {
    const [errMessage, setErrMessage] = useState('')
    const [deviceMessage, setDeviceMessage] = useState('')
    const [feedback, setFeedback] = useState('')
    const [inputNoteName, setInputNoteName] = useState<WhiteKeyNoteName | undefined>(
        undefined
    )

    useEffect(() => {
        ;(async function () {
            try {
                const midiAccess = await getMidi()
                if (midiAccess.inputs.size == 0) {
                    throw Error('没有检测到 MIDI 设备!')
                }
                setDeviceMessage(
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
                        console.log(`${midiToHelmholtz(keyNote)} = ${keyNote}`)
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
            ? `正确✅！答案是${WhiteKeyNoteName[inputNoteName]}`
            : `错误❌！答案是${WhiteKeyNoteName[currentNoteName]}`
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
            <span className="text-center text-red-500 block">{errMessage}</span>
            <span className="text-center block">{deviceMessage}</span>
            <span className='text-center block'>{feedback}</span>
            <div className='h-5'></div>
            <ReadonlyPiano />
        </div>
    )
}
