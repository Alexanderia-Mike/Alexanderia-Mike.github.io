import { createContext } from 'react'
import { OptionalNote } from './notes-utils/notes'

interface NoteContextInterface {
    currentNote: OptionalNote
    updateCurrentNote: React.Dispatch<React.SetStateAction<OptionalNote>>
    inputNote: OptionalNote
    setInputNote: React.Dispatch<React.SetStateAction<OptionalNote>>
}

export const NoteContext = createContext<NoteContextInterface>({
    currentNote: undefined,
    updateCurrentNote: () => null,
    inputNote: undefined,
    setInputNote: () => null,
})

interface ControlContextInterface {
    newNoteTrigger: boolean
    triggerNewNote: () => void
}

export const ControlContext = createContext<ControlContextInterface>({
    newNoteTrigger: false,
    triggerNewNote: () => null,
})
