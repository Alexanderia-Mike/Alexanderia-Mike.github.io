import { useState, useEffect, useRef } from 'react'
import {
    NoteName,
    NoteNameBase,
    WhiteKeyNoteName,
} from '../../common/notes-utils/notes'
import {
    disableTone,
    enableTone,
    getSampler,
    isToneEnabled,
    noteToSampleId,
} from '../submitter/lib/piano/piano-audios'
import { noteValueToNoteName } from '../../common/notes-utils/utils'
import Toggle from '../../common/toggle/toggle'
import * as Tone from 'tone'
import Button from '../../common/button/button'
import { PitchNotation } from '../../common/notes-utils/pitch-notation'

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

const higherSampler = getSampler(false, true)
const lowerSampler = getSampler(false, true)

export function HarmonyPlayer() {
    const [notes, setNotes] = useState<[NoteName, NoteName] | null>(null)
    const [volumeRatio, setVolumeRatio] = useState(100) // 0-200, representing percentage for lower note
    const [showAnswer, setShowAnswer] = useState(false)
    const [toneEnabled, setToneEnabled] = useState(isToneEnabled())

    const lowerNoteGainRef = useRef<Tone.Gain | null>(null)
    const higherNoteGainRef = useRef<Tone.Gain | null>(null)

    const playHarmony = (newNotes: [NoteName, NoteName]) => {
        if (!isToneEnabled()) return

        // stop first
        lowerSampler.triggerRelease(noteToSampleId(newNotes[0]))
        higherSampler.triggerRelease(noteToSampleId(newNotes[1]))

        lowerSampler.triggerAttack(noteToSampleId(newNotes[0]))
        higherSampler.triggerAttack(noteToSampleId(newNotes[1]))
    }

    const setVolumes = () => {
        if (lowerNoteGainRef.current === null) {
            const lowerNoteGain = new Tone.Gain(
                volumeRatio / 100
            ).toDestination()
            lowerSampler.connect(lowerNoteGain)
            lowerNoteGainRef.current = lowerNoteGain
        }
        if (higherNoteGainRef.current === null) {
            const higherNoteGain = new Tone.Gain(
                (200 - volumeRatio) / 100
            ).toDestination()
            higherSampler.connect(higherNoteGain)
            higherNoteGainRef.current = higherNoteGain
        }
        lowerNoteGainRef.current.gain.value = volumeRatio / 100
        higherNoteGainRef.current.gain.value = (200 - volumeRatio) / 100
    }

    // Update gain nodes when slider changes
    useEffect(setVolumes, [volumeRatio])

    const playNewButton = (
        <Button
            label={'播放新和声'}
            onClick={() => {
                const newNotes = getRandomHarmonyInterval()
                setNotes(newNotes)
                playHarmony(newNotes)
            }}
            hide={!toneEnabled}
            classNames="my-2"
        />
    )

    const replayButton = (
        <Button
            onClick={() => notes && playHarmony(notes)}
            label={'重新播放'}
            hide={!toneEnabled}
            classNames="my-2"
        />
    )

    return (
        <div className="flex flex-col items-center justify-center gap-4 p-4 mx-auto">
            <div className="flex my-5 flex-row justify-center items-center flex-wrap">
                <Toggle
                    label="开启扬声器"
                    onChange={() => {
                        if (isToneEnabled()) {
                            disableTone()
                        } else {
                            enableTone()
                            setVolumes()
                        }
                        setToneEnabled(!toneEnabled)
                    }}
                    checked={isToneEnabled()}
                    classNames="flex-grow-0"
                />
                {playNewButton}
                {notes && replayButton}
                <Toggle
                    label="显示音名"
                    onChange={() => setShowAnswer(!showAnswer)}
                    checked={showAnswer}
                    classNames="flex-grow-0"
                />
            </div>

            <div className="text-center w-full max-w-[600px]">
                <div className="w-full min-w-[300px]">
                    <input
                        type="range"
                        min="0"
                        max="200"
                        value={volumeRatio}
                        onChange={(e) => setVolumeRatio(Number(e.target.value))}
                        className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>低音: {volumeRatio}%</span>
                        <span>高音: {200 - volumeRatio}%</span>
                    </div>
                    {notes && showAnswer && (
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>
                                低音:{' '}
                                {notes[0].toString(PitchNotation.SCIENTIFIC)}
                            </span>
                            <span>
                                高音:{' '}
                                {notes[1].toString(PitchNotation.SCIENTIFIC)}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
