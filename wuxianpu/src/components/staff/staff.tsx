import React, { useState } from 'react'
import Toggle from '../../common/toggle/toggle'
import Button from '../../common/button/button'
import Canvas from './canvas'
import { Clef } from './clef'
import { WhiteKeyNoteName } from '../../common/common'
import Control from './control'
import clsx from 'clsx'

export default function Staff({
    currentNoteName,
    updateCurrentNoteName: updateCurrentNoteName,
}: {
    currentNoteName: WhiteKeyNoteName | undefined
    updateCurrentNoteName: React.Dispatch<
        React.SetStateAction<WhiteKeyNoteName | undefined>
    >
}) {
    const [clef, updateClef] = useState<Clef>(Clef.TREBLE)

    return (
        <div
            className={clsx(
                'flex justify-center items-center my-[20px] mx-auto max-w-[1200px] p-[20px] bg-white border-solid border border-border-color rounded shadow-sm relative',
                'flex-col', // on small devices
                'md:flex-row'
            )}
        >
            <Canvas noteName={currentNoteName} clef={clef} />
            <Control
                clef={clef}
                updateNoteName={updateCurrentNoteName}
                updateClef={updateClef}
            />
            <p className="mt-[20px] text-lg text-slate-600"></p>
        </div>
    )
}
