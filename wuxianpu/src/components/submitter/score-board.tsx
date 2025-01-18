import clsx from 'clsx'
import { useState } from 'react'
import Button from '../../common/button/button'

export default function ScoreBoard({
    correct,
    setCorrect,
    total,
    setTotal,
}: {
    correct: number
    setCorrect: React.Dispatch<React.SetStateAction<number>>
    total: number
    setTotal: React.Dispatch<React.SetStateAction<number>>
}) {
    const resetButtonOnClick = () => {
        setCorrect(0)
        setTotal(0)
    }

    return (
        <div
            className={clsx(
                // total || 'hidden',
                'flex flex-grow justify-center items-center'
            )}
        >
            <span className="mx-5">正确: {correct}</span>
            <span className="mx-5">总共: {total}</span>
            <Button label={'重置计分表'} onClick={resetButtonOnClick} />
        </div>
    )
}
