import { useState } from 'react'
import Staff from './components/staff/staff'
import { OptionalNote } from './common/common'
import Submitter from './components/submitter/submitter'
import { NoteContext } from './common/context'

export default function App() {
    const [currentNote, updateCurrentNote] = useState<OptionalNote>(undefined)
    const [inputNote, setInputNote] = useState<OptionalNote>(undefined)

    return (
        <NoteContext.Provider
            value={{ currentNote, updateCurrentNote, inputNote, setInputNote }}
        >
            <h1 className="text-[#333] text-3xl mt-5">五线谱练习工具</h1>
            <Staff />
            <Submitter />
        </NoteContext.Provider>
    )
}
