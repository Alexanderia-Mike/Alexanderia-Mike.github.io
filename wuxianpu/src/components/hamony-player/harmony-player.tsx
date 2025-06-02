import { useState, useEffect } from 'react'
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
import { noteValueToNoteName } from '../../common/notes-utils/utils'
import Toggle from '../../common/toggle/toggle'
import * as Tone from 'tone' // Import Tone.js

function getRandomNotePairInRange(
    minNote: NoteName,
    maxNote: NoteName,
    maxDifference: number
): [NoteName, NoteName] {
    const minValue = minNote.valueOf()
    const maxValue = maxNote.valueOf()

    let num1: number, num2: number

    do {
        num1 = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue
        num2 = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue
    } while (Math.abs(num1 - num2) > maxDifference || num1 === num2)

    // Ensure num1 is the smaller number
    if (num1 > num2) {
        ;[num1, num2] = [num2, num1]
    }

    return [noteValueToNoteName(num1), noteValueToNoteName(num2)]
}

function getRandomHarmonyInterval(): [NoteName, NoteName] {
    const [note1, note2] = getRandomNotePairInRange(
        new NoteName(new WhiteKeyNoteName(NoteNameBase.A, 2)),
        new NoteName(new WhiteKeyNoteName(NoteNameBase.D, 5)),
        12 // Max difference of 12 semitones (1 octave)
    )

    return [note1, note2]
}

export function HarmonyPlayer() {
    const [notes, setNotes] = useState<[NoteName, NoteName] | null>(null)
    const [volumeRatio, setVolumeRatio] = useState(50) // 0-100, representing percentage for lower note
    const [isPlaying, setIsPlaying] = useState(false)

    const sampler = getSampler()
    const lowerNoteGain = new Tone.Gain(volumeRatio / 100).toDestination()
    const higherNoteGain = new Tone.Gain(
        (100 - volumeRatio) / 100
    ).toDestination()

    sampler.connect(lowerNoteGain)
    sampler.connect(higherNoteGain)

    const playHarmony = () => {
        if (!isToneEnabled()) return

        const newNotes = getRandomHarmonyInterval()
        setNotes(newNotes)
        setIsPlaying(true)

        // Play both notes routed through their respective gain nodes
        sampler.triggerAttack(noteToSampleId(newNotes[0]))
        sampler.triggerAttack(noteToSampleId(newNotes[1]))
    }

    const stopHarmony = () => {
        if (!isToneEnabled() || !notes) return

        sampler.triggerRelease(noteToSampleId(notes[0]))
        sampler.triggerRelease(noteToSampleId(notes[1]))
        setIsPlaying(false)
    }

    // Update gain nodes when slider changes
    useEffect(() => {
        lowerNoteGain.gain.value = volumeRatio / 100
        higherNoteGain.gain.value = (100 - volumeRatio) / 100
    }, [volumeRatio])

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

            {notes && (
                <div className="text-center">
                    <p className="mb-2">
                        Playing: {notes[0].toString(PitchNotation.SCIENTIFIC)}{' '}
                        and {notes[1].toString(PitchNotation.SCIENTIFIC)}
                    </p>
                    <div className="w-64">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={volumeRatio}
                            onChange={(e) =>
                                setVolumeRatio(Number(e.target.value))
                            }
                            className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Lower Note: {volumeRatio}%</span>
                            <span>Higher Note: {100 - volumeRatio}%</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
