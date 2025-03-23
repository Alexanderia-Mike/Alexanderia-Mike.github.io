import { Accidental, NoteName, WhiteKeyNoteName } from './notes'
import { GeneralSolfege, Solfege } from './solfege'

export enum KeySignature {}
// TODO

export function whiteKeyNoteToSolfege(
    whiteKeyNote: WhiteKeyNoteName,
    keySignature: KeySignature
): Solfege {
    // TODO
    return Solfege.Do
}

export function noteNameToSolfege(
    noteName: NoteName,
    keySignature: KeySignature
): GeneralSolfege {
    // TODO
    return new GeneralSolfege(Solfege.Do, Accidental.NONE)
}
