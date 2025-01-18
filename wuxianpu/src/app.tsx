import { useState } from 'react'
import Staff from './components/staff/staff'
import { NoteName } from './common/common'
import Submitter from './components/submitter/submitter'

export default function App() {
    const [currentNote, updateCurrentNote] = useState<NoteName | undefined>(
        undefined
    )
    return (
        <>
            <h1 className="text-[#333] text-3xl mt-5">五线谱练习工具</h1>
            <Staff
                currentNoteName={currentNote}
                updateCurrentNoteName={updateCurrentNote}
            />
            <hr className='my-5'/>
            <Submitter/>
        </>
    )
}
