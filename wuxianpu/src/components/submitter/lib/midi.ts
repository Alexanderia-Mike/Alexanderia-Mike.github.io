let midiAccess: MIDIAccess | null = null

export async function getMidi(): Promise<MIDIAccess> {
    try {
        if (!midiAccess) {
            midiAccess = await navigator.requestMIDIAccess()
            console.log('successfully get midiAccess')
        }
        return midiAccess
    } catch (e) {
        const error = e as Error
        const errMessage = `error! ${error.message}`
        console.log(errMessage)
        throw Error(errMessage)
    }
}

export function handleMidiMessages(
    midiAccess: MIDIAccess,
    messageHandler: (this: MIDIInput, _2: MIDIMessageEvent) => any
) {
    for (const input of midiAccess.inputs.values()) {
        input.onmidimessage = messageHandler
    }
}

export function midiToHelmholtz(noteNumber: number) {
    const noteNames = [
        'C',
        'C#',
        'D',
        'D#',
        'E',
        'F',
        'F#',
        'G',
        'G#',
        'A',
        'A#',
        'B',
    ]
    const octave = Math.floor(noteNumber / 12) - 1 // MIDI starts octave numbering at -1
    const noteIndex = noteNumber % 12
    const noteName = noteNames[noteIndex]

    // Convert to Helmholtz Pitch Notation
    if (octave < 3) {
        const suffix = 2 - octave
        return noteName.toUpperCase() + (suffix > 0 ? suffix : '')
    } else {
        const suffix = octave - 3
        return noteName.toLowerCase() + (suffix > 0 ? suffix : '')
    }
}
