import { useState } from 'react'
import Staff from './components/staff/staff'
import { OptionalNote } from './common/notes-utils/notes'
import Submitter from './components/submitter/submitter'
import { ControlContext, NoteContext } from './common/context'
import { KeySignature } from './common/notes-utils/key-signature'

export default function App() {
    const [currentNote, updateCurrentNote] = useState<OptionalNote>(undefined)
    const [inputNote, setInputNote] = useState<OptionalNote>(undefined)
    const [newNoteTrigger, setNewNoteTrigger] = useState<boolean>(false)
    const [keySignature, setKeySignature] = useState<KeySignature>(
        KeySignature.C
    )

    const triggerNewNote = () => {
        setNewNoteTrigger(!newNoteTrigger)
    }

    return (
        <NoteContext.Provider
            value={{
                currentNote,
                updateCurrentNote,
                inputNote,
                setInputNote,
                keySignature,
                setKeySignature,
            }}
        >
            <ControlContext.Provider value={{ newNoteTrigger, triggerNewNote }}>
                <h1 className="text-[#333] text-3xl mt-5">五线谱练习工具</h1>
                <Staff />
                <Submitter />
            </ControlContext.Provider>
        </NoteContext.Provider>
    )
}
