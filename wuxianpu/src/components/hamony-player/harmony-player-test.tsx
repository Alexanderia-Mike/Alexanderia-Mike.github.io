import { useState, useEffect, useRef } from 'react'
import {
    NoteName,
    NoteNameBase,
    WhiteKeyNoteName,
} from '../../common/notes-utils/notes'
import { PitchNotation } from '../../common/notes-utils/pitch-notation'
import {
    disableTone,
    enableTone,
    getSampler,
    isToneEnabled,
    noteToSampleId,
} from '../submitter/lib/piano/piano-audios'
import Toggle from '../../common/toggle/toggle'
import * as Tone from 'tone'

const sampler = getSampler(false, true)
const sampler2 = getSampler(false, true)

export function HarmonyPlayer() {
    const [volumeRatio, setVolumeRatio] = useState(50) // 0-100, representing percentage for lower note
    const [isPlaying, setIsPlaying] = useState(false)

    const gain = useRef<Tone.Gain | null>(null)
    const gain2 = useRef<Tone.Gain | null>(null)

    useEffect(() => {
        if (!isToneEnabled()) return

        if (!gain.current) {
            gain.current = new Tone.Gain(volumeRatio / 100).toDestination()
            sampler.connect(gain.current)
            console.log(`created gain with value ${gain.current.gain.value}`)
        }
        if (!gain2.current) {
            gain2.current = new Tone.Gain(
                (100 - volumeRatio) / 100
            ).toDestination()
            sampler2.connect(gain2.current)
            console.log(`created gain2 with value ${gain2.current.gain.value}`)
        }

        gain.current.gain.value = volumeRatio / 100
        gain2.current.gain.value = (100 - volumeRatio) / 100
        console.log(`changed gain to ${gain.current.gain.value}`)
        console.log(`changed gain2 to ${gain2.current.gain.value}`)

        // return () => {
        //     gain.current?.disconnect()
        // }
    }, [volumeRatio])

    const myNote = new NoteName(new WhiteKeyNoteName(NoteNameBase.A, 3))
    const myNote2 = new NoteName(new WhiteKeyNoteName(NoteNameBase.C, 4))

    const playHarmony = () => {
        if (!isToneEnabled()) return
        setIsPlaying(true)

        sampler.triggerAttack(noteToSampleId(myNote))
        sampler2.triggerAttack(noteToSampleId(myNote2))
    }

    const stopHarmony = () => {
        if (!isToneEnabled()) return

        sampler.triggerRelease(noteToSampleId(myNote))
        sampler2.triggerRelease(noteToSampleId(myNote2))
        setIsPlaying(false)
    }

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <Toggle
                label="开启扬声器"
                onChange={isToneEnabled() ? disableTone : enableTone}
                checked={isToneEnabled()}
                classNames="flex-grow-0"
            />
            <button
                onClick={isPlaying ? stopHarmony : playHarmony}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
                {isPlaying ? 'Stop' : 'Play Harmony'}
            </button>

            <div className="text-center">
                <p className="mb-2">
                    Playing: {myNote.toString(PitchNotation.SCIENTIFIC)}
                </p>
                <div className="w-64">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={volumeRatio}
                        onChange={(e) => setVolumeRatio(Number(e.target.value))}
                        className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>volumn ratio: {volumeRatio}%</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
