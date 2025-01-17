import React, { useState } from 'react'
import Toggle from '../../common/toggle/toggle'
import Button from '../../common/button/button'
import Canvas from './canvas'
import { Clef } from './clef'
import { NoteName } from '../../common/common'
import Control from './control'

export default function Staff({
    currentNoteName,
    updateCurrentNoteName: updateCurrentNoteName,
}: {
    currentNoteName: NoteName | undefined
    updateCurrentNoteName: React.Dispatch<React.SetStateAction<NoteName | undefined>>
}) {
    const [clef, updateClef] = useState<Clef>(Clef.TREBLE);

    return (
        <div className="my-[20px] mx-auto p-[20px] max-w-[800px] bg-white border-solid border border-border-color rounded shadow-sm relative">
            <Canvas noteName={currentNoteName} clef={clef} />
            <Control clef={clef} updateNoteName={updateCurrentNoteName} updateClef={updateClef}/>
            <p className="mt-[20px] text-lg text-slate-600"></p>
        </div>
    )
}
