import Button from '../../common/button/button'
import { NoteName } from '../../common/common'
import Toggle from '../../common/toggle/toggle'
import { Clef } from './clef'

export default function Control({
    updateNoteName,
    updateClef,
}: {
    updateNoteName: React.Dispatch<React.SetStateAction<NoteName | undefined>>
    updateClef: React.Dispatch<React.SetStateAction<Clef>>
}) {
    return (
        <>
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
            <div className="mt-[40px]">
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
        </>
    )
}
