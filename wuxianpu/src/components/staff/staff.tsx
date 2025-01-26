import { useContext, useState } from 'react'
import Canvas from './canvas'
import { Clef } from './clef'
import Control from './control'
import clsx from 'clsx'
import { NoteContext } from '../../common/context'

export default function Staff() {
    const [clef, updateClef] = useState<Clef>(Clef.TREBLE)
    const { currentNote, updateCurrentNote, setInputNote } =
        useContext(NoteContext)

    return (
        <div
            className={clsx(
                'flex justify-center items-center my-[20px] mx-auto max-w-[1200px] p-[20px] bg-white border-solid border border-border-color rounded shadow-sm relative',
                'flex-col', // on small devices
                'md:flex-row'
            )}
        >
            <Canvas noteName={currentNote} clef={clef} />
            <Control
                clef={clef}
                updateNoteName={updateCurrentNote}
                updateClef={updateClef}
                clearInputNote={() => setInputNote(undefined)}
            />
            <p className="mt-[20px] text-lg text-slate-600"></p>
        </div>
    )
}
