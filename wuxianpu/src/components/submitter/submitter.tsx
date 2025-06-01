import { useContext, useState } from 'react'
import { TextSubmitter } from './text-submitter'
import ScoreBoard from './score-board'
import VirtualPiano from './virtual-piano'
import MIDIPiano from './midi-piano'
import { NoteContext } from '../../common/context'
import { Router, RouteConfig } from '../../common/router/router'

export default function Submitter() {
    const [correct, setCorrect] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)
    const { setInputNote } = useContext(NoteContext)

    const incrementCorrect = () => setCorrect(correct + 1)
    const incrementTotal = () => setTotal(total + 1)

    const defaultSubmitter = (
        <div className="text-lg text-orange-400 text-center pt-10 min-h-[500px]">
            请先从上方的菜单栏中选择您的答题方式!
        </div>
    )

    const routes: RouteConfig[] = [
        {
            path: 'text-submitter',
            element: (
                <TextSubmitter
                    incrementCorrect={incrementCorrect}
                    incrementTotal={incrementTotal}
                />
            ),
            label: '手动输入',
        },
        {
            path: 'virtual-piano',
            element: (
                <VirtualPiano
                    incrementCorrect={incrementCorrect}
                    incrementTotal={incrementTotal}
                />
            ),
            label: '虚拟钢琴',
        },
        {
            path: 'bluetooth-piano',
            element: (
                <MIDIPiano
                    incrementCorrect={incrementCorrect}
                    incrementTotal={incrementTotal}
                />
            ),
            label: 'MIDI钢琴',
        },
    ]

    return (
        <>
            <ScoreBoard
                correct={correct}
                setCorrect={setCorrect}
                total={total}
                setTotal={setTotal}
            />
            <hr className="mb-5 mt-10" />
            <div className="mt-5">
                <Router
                    routes={routes}
                    defaultElement={defaultSubmitter}
                    onRouteChange={() => setInputNote(undefined)}
                    classNames={{
                        navColor: 'bg-custom-bg',
                        contentColor: 'bg-white'
                    }}
                />
            </div>
        </>
    )
}
