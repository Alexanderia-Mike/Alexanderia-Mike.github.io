import {
    parseWhiteKeyNoteName,
    NoteName,
    UpDownSymbol,
    WhiteKeyNoteName,
} from '../../../common/common'

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
        const errMessage = `错误! ${error.message}`
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

function midiToNoteHelper(noteNumber: number): [number, string, boolean] {
    const noteNames: [string, boolean][] = [
        // [note base name, whether sharp]
        ['C', false],
        ['C', false],
        ['D', false],
        ['D', true],
        ['E', false],
        ['F', false],
        ['F', true],
        ['G', false],
        ['G', true],
        ['A', false],
        ['A', true],
        ['B', false],
    ]
    const octave = Math.floor(noteNumber / 12) - 1 // MIDI starts octave numbering at -1
    const [noteName, isSharp] = noteNames[noteNumber % 12]
    return [octave, noteName, isSharp]
}

function midiToHelmholtzHelper(noteNumber: number): [string, boolean] {
    const [octave, noteName, isSharp] = midiToNoteHelper(noteNumber)
    // Convert to Helmholtz Pitch Notation
    if (octave < 3) {
        const suffix = 2 - octave > 0 ? 2 - octave : ''
        return [noteName.toUpperCase() + suffix, isSharp]
    } else {
        const suffix = octave - 3 > 0 ? octave - 3 : ''
        return [noteName.toLowerCase() + suffix, isSharp]
    }
}

export function midiToHelmholtz(noteNumber: number) {
    const [helmholtzBase, isSharp] = midiToHelmholtzHelper(noteNumber)
    return (isSharp ? '#' : '') + helmholtzBase
}

export function midiToNoteName(noteNumber: number) {
    const [helmholtzBase, isSharp] = midiToHelmholtzHelper(noteNumber)
    const whiteKeyNoteName = parseWhiteKeyNoteName(helmholtzBase)
    return (
        whiteKeyNoteName &&
        new NoteName(
            whiteKeyNoteName,
            isSharp ? UpDownSymbol.SHARP : UpDownSymbol.NONE
        )
    )
}
