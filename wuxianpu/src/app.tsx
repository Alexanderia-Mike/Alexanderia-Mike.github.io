import { useState } from 'react'
import Staff from './components/staff/staff'
import { NoteName } from './common/common'

export default function App() {
    const [currentNote, updateCurrentNote] = useState<NoteName | null>(null)
    return (
        <Staff
            currentNote={currentNote}
            updateCurrentNote={updateCurrentNote}
        />
    )
}
