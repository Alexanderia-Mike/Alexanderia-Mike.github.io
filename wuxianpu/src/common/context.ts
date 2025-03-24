import { createContext } from 'react'
import { OptionalNote } from './notes-utils/notes'
import { KeySignature } from './notes-utils/key-signature'

interface NoteContextInterface {
    currentNote: OptionalNote
    updateCurrentNote: React.Dispatch<React.SetStateAction<OptionalNote>>
    inputNote: OptionalNote
    setInputNote: React.Dispatch<React.SetStateAction<OptionalNote>>
    keySignature: KeySignature
    setKeySignature: React.Dispatch<React.SetStateAction<KeySignature>>
}

export const NoteContext = createContext<NoteContextInterface>({
    currentNote: undefined,
    updateCurrentNote: () => null,
    inputNote: undefined,
    setInputNote: () => null,
    keySignature: KeySignature.C,
    setKeySignature: () => null,
})

interface ControlContextInterface {
    newNoteTrigger: boolean
    triggerNewNote: () => void
}

export const ControlContext = createContext<ControlContextInterface>({
    newNoteTrigger: false,
    triggerNewNote: () => null,
})
