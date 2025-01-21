import { useState } from 'react'
import Staff from './components/staff/staff'
import { WhiteKeyNoteName } from './common/common'
import Submitter from './components/submitter/submitter'

export default function App() {
    // migrate WhiteKeyNoteName to NoteName to allow sharp and flat
    const [currentNote, updateCurrentNote] = useState<WhiteKeyNoteName | undefined>(
        undefined
    )

    return (
        <>
            <h1 className="text-[#333] text-3xl mt-5">五线谱练习工具</h1>
            <Staff
                currentNoteName={currentNote}
                updateCurrentNoteName={updateCurrentNote}
            />
            <Submitter currentNoteName={currentNote}/>
        </>
    )
}
