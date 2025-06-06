import * as Tone from 'tone'
import {
    Accidental,
    NoteName,
    NoteNameBase,
} from '../../../../common/notes-utils/notes'
import { PitchNotation } from '../../../../common/notes-utils/pitch-notation'

export function noteToSampleId(note: NoteName): string {
    switch (note.accidental) {
        case Accidental.NONE:
            return note.toString(PitchNotation.SCIENTIFIC)
        case Accidental.FLAT:
            return `${NoteNameBase[note.whiteKeyNote.noteNameBase]}b${
                note.whiteKeyNote.octave
            }`
        case Accidental.SHARP:
            return `${NoteNameBase[note.whiteKeyNote.noteNameBase]}#${
                note.whiteKeyNote.octave
            }`
        default:
            throw Error(
                `note ${note.toString(PitchNotation.SCIENTIFIC)} not allowed!`
            )
    }
}

// sources of audio data: https://theremin.music.uiowa.edu/MISpiano.html
function createNewSample() {
    return new Tone.Sampler({
        urls: {
            A0: 'assets/audio_compressed/Piano.ff.A0.mp3',
            Bb0: 'assets/audio_compressed/Piano.ff.Bb0.mp3',
            B0: 'assets/audio_compressed/Piano.ff.B0.mp3',
            C1: 'assets/audio_compressed/Piano.ff.C1.mp3',
            Db1: 'assets/audio_compressed/Piano.ff.Db1.mp3',
            D1: 'assets/audio_compressed/Piano.ff.D1.mp3',
            Eb1: 'assets/audio_compressed/Piano.ff.Eb1.mp3',
            E1: 'assets/audio_compressed/Piano.ff.E1.mp3',
            F1: 'assets/audio_compressed/Piano.ff.F1.mp3',
            Gb1: 'assets/audio_compressed/Piano.ff.Gb1.mp3',
            G1: 'assets/audio_compressed/Piano.ff.G1.mp3',
            Ab1: 'assets/audio_compressed/Piano.ff.Ab1.mp3',
            A1: 'assets/audio_compressed/Piano.ff.A1.mp3',
            Bb1: 'assets/audio_compressed/Piano.ff.Bb1.mp3',
            B1: 'assets/audio_compressed/Piano.ff.B1.mp3',
            C2: 'assets/audio_compressed/Piano.ff.C2.mp3',
            Db2: 'assets/audio_compressed/Piano.ff.Db2.mp3',
            D2: 'assets/audio_compressed/Piano.ff.D2.mp3',
            Eb2: 'assets/audio_compressed/Piano.ff.Eb2.mp3',
            E2: 'assets/audio_compressed/Piano.ff.E2.mp3',
            F2: 'assets/audio_compressed/Piano.ff.F2.mp3',
            Gb2: 'assets/audio_compressed/Piano.ff.Gb2.mp3',
            G2: 'assets/audio_compressed/Piano.ff.G2.mp3',
            Ab2: 'assets/audio_compressed/Piano.ff.Ab2.mp3',
            A2: 'assets/audio_compressed/Piano.ff.A2.mp3',
            Bb2: 'assets/audio_compressed/Piano.ff.Bb2.mp3',
            B2: 'assets/audio_compressed/Piano.ff.B2.mp3',
            C3: 'assets/audio_compressed/Piano.ff.C3.mp3',
            Db3: 'assets/audio_compressed/Piano.ff.Db3.mp3',
            D3: 'assets/audio_compressed/Piano.ff.D3.mp3',
            Eb3: 'assets/audio_compressed/Piano.ff.Eb3.mp3',
            E3: 'assets/audio_compressed/Piano.ff.E3.mp3',
            F3: 'assets/audio_compressed/Piano.ff.F3.mp3',
            Gb3: 'assets/audio_compressed/Piano.ff.Gb3.mp3',
            G3: 'assets/audio_compressed/Piano.ff.G3.mp3',
            Ab3: 'assets/audio_compressed/Piano.ff.Ab3.mp3',
            A3: 'assets/audio_compressed/Piano.ff.A3.mp3',
            Bb3: 'assets/audio_compressed/Piano.ff.Bb3.mp3',
            B3: 'assets/audio_compressed/Piano.ff.B3.mp3',
            C4: 'assets/audio_compressed/Piano.ff.C4.mp3',
            Db4: 'assets/audio_compressed/Piano.ff.Db4.mp3',
            D4: 'assets/audio_compressed/Piano.ff.D4.mp3',
            Eb4: 'assets/audio_compressed/Piano.ff.Eb4.mp3',
            E4: 'assets/audio_compressed/Piano.ff.E4.mp3',
            F4: 'assets/audio_compressed/Piano.ff.F4.mp3',
            Gb4: 'assets/audio_compressed/Piano.ff.Gb4.mp3',
            G4: 'assets/audio_compressed/Piano.ff.G4.mp3',
            Ab4: 'assets/audio_compressed/Piano.ff.Ab4.mp3',
            A4: 'assets/audio_compressed/Piano.ff.A4.mp3',
            Bb4: 'assets/audio_compressed/Piano.ff.Bb4.mp3',
            B4: 'assets/audio_compressed/Piano.ff.B4.mp3',
            C5: 'assets/audio_compressed/Piano.ff.C5.mp3',
            Db5: 'assets/audio_compressed/Piano.ff.Db5.mp3',
            D5: 'assets/audio_compressed/Piano.ff.D5.mp3',
            Eb5: 'assets/audio_compressed/Piano.ff.Eb5.mp3',
            E5: 'assets/audio_compressed/Piano.ff.E5.mp3',
            F5: 'assets/audio_compressed/Piano.ff.F5.mp3',
            Gb5: 'assets/audio_compressed/Piano.ff.Gb5.mp3',
            G5: 'assets/audio_compressed/Piano.ff.G5.mp3',
            Ab5: 'assets/audio_compressed/Piano.ff.Ab5.mp3',
            A5: 'assets/audio_compressed/Piano.ff.A5.mp3',
            Bb5: 'assets/audio_compressed/Piano.ff.Bb5.mp3',
            B5: 'assets/audio_compressed/Piano.ff.B5.mp3',
            C6: 'assets/audio_compressed/Piano.ff.C6.mp3',
            Db6: 'assets/audio_compressed/Piano.ff.Db6.mp3',
            D6: 'assets/audio_compressed/Piano.ff.D6.mp3',
            Eb6: 'assets/audio_compressed/Piano.ff.Eb6.mp3',
            E6: 'assets/audio_compressed/Piano.ff.E6.mp3',
            F6: 'assets/audio_compressed/Piano.ff.F6.mp3',
            Gb6: 'assets/audio_compressed/Piano.ff.Gb6.mp3',
            G6: 'assets/audio_compressed/Piano.ff.G6.mp3',
            Ab6: 'assets/audio_compressed/Piano.ff.Ab6.mp3',
            A6: 'assets/audio_compressed/Piano.ff.A6.mp3',
            Bb6: 'assets/audio_compressed/Piano.ff.Bb6.mp3',
            B6: 'assets/audio_compressed/Piano.ff.B6.mp3',
            C7: 'assets/audio_compressed/Piano.ff.C7.mp3',
            Db7: 'assets/audio_compressed/Piano.ff.Db7.mp3',
            D7: 'assets/audio_compressed/Piano.ff.D7.mp3',
            Eb7: 'assets/audio_compressed/Piano.ff.Eb7.mp3',
            E7: 'assets/audio_compressed/Piano.ff.E7.mp3',
            F7: 'assets/audio_compressed/Piano.ff.F7.mp3',
            Gb7: 'assets/audio_compressed/Piano.ff.Gb7.mp3',
            G7: 'assets/audio_compressed/Piano.ff.G7.mp3',
            Ab7: 'assets/audio_compressed/Piano.ff.Ab7.mp3',
            A7: 'assets/audio_compressed/Piano.ff.A7.mp3',
            Bb7: 'assets/audio_compressed/Piano.ff.Bb7.mp3',
            B7: 'assets/audio_compressed/Piano.ff.B7.mp3',
            C8: 'assets/audio_compressed/Piano.ff.C8.mp3',
        },
        onload: () => console.log('sampler loaded'),
        release: 1.5,
    })
}

const sampler = createNewSample()

let toneEnabled = false
export async function enableTone() {
    await Tone.start()
    await Tone.loaded()
    toneEnabled = true
}

export function disableTone() {
    toneEnabled = false
}

export function isToneEnabled(): boolean {
    return toneEnabled
}

export function getSampler(
    connectToMasterOutput: boolean = true,
    createNew: boolean = false
): Tone.Sampler {
    if (createNew) {
        if (connectToMasterOutput) {
            return createNewSample().toDestination()
        } else {
            return createNewSample()
        }
    } else {
        if (connectToMasterOutput) return sampler.toDestination()
        return sampler
    }
}
