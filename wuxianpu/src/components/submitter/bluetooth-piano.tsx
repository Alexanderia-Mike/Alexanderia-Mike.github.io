import { useEffect, useState } from 'react'
import { getMidi, handleMidiMessages, midiToHelmholtz } from './lib/midi'

let lastTimestamp = 0

export default function BluetoothPiano() {
    const [errMessage, setErrMessage] = useState('')
    const [deviceMessage, setDeviceMessage] = useState('')

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
                        console.log(midiToHelmholtz(keyNote))
                    }
                })
            } catch (e) {
                setErrMessage((e as Error).message)
            }
        })()
    })

    return (
        <div>
            <span className="text-center">{errMessage}</span>
            <span className="text-center">{deviceMessage}</span>
        </div>
    )
}
