import React from 'react'
import Toggle from '../../common/toggle/toggle'
import Button from '../../common/button/button'
import Canvas from './canvas'
import { Clef } from './clef'
import { NoteName } from '../../common/common'
import { Note } from './notes_mapping'

export default function Staff({
    currentNote,
    updateCurrentNote,
}: {
    currentNote: NoteName | null
    updateCurrentNote: React.Dispatch<React.SetStateAction<NoteName | null>>
}) {
    return (
        <div className="my-[20px] mx-auto p-[20px] max-w-[800px] bg-white border-solid border border-border-color rounded shadow-sm relative">
            <h1 className="text-[#333] text-3xl">五线谱练习工具</h1>
            <div className="flex my-5 justify-center items-center">
                <div className="flex flex-grow justify-center items-center">
                    <span>correct / total: </span>{' '}
                    <span className="w-20"></span>
                    <span id="correct"></span> <span id="division">/</span>{' '}
                    <span id="total"></span>
                    <Button
                        label={'重置'}
                        onClick={() => console.log('resetButton clicked')}
                    />
                </div>
                <Toggle
                    onChange={() => console.log('clef-toggle clicked')}
                    onText="高音谱号"
                    offText="低音谱号"
                />
                <Toggle
                    onChange={() => console.log('randomSwitch clicked')}
                    commonText="随机高低音谱"
                />
            </div>
            <Canvas note={new Note(NoteName.A1, 30)} clef={Clef.TREBLE} />
            <div className="mt-[20px]">
                <Button
                    label={'生成练习题'}
                    onClick={() => console.log('generateButton clicked')}
                />
                <input
                    type="text"
                    id="noteInput"
                    placeholder="输入音名 (如 C, D, E)"
                />
                <Button
                    label={'提交答案'}
                    onClick={() => console.log('submitButton clicked')}
                />
            </div>
            <p className="mt-[20px] text-lg text-slate-600"></p>
        </div>
    )
}
