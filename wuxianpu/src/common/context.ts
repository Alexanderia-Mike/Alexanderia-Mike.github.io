import { createContext } from 'react'
import { OptionalNote } from './common'

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
