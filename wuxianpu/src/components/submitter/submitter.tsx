import { JSX, useContext, useState } from 'react'
import { NavLink, Route, HashRouter as Router, Routes } from 'react-router-dom'
import { TextSubmitter } from './text-submitter'
import clsx from 'clsx'
import ScoreBoard from './score-board'
import VirtualPiano from './virtual-piano'
import MIDIPiano from './midi-piano'
import { NoteContext } from '../../common/context'

export default function Submitter() {
    const [correct, setCorrect] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)

    const incrementCorrect = () => setCorrect(correct + 1)
    const incrementTotal = () => setTotal(total + 1)

    const {setInputNote} = useContext(NoteContext)

    const navigationPagesMapping: Map<string, [JSX.Element, string]> = new Map([
        [
            'text-submitter',
            [
                <TextSubmitter
                    incrementCorrect={incrementCorrect}
                    incrementTotal={incrementTotal}
                />,
                '手动输入',
            ],
        ],
        ['virtual-piano', [<VirtualPiano />, '虚拟钢琴']],
        [
            'bluetooth-piano',
            [
                <MIDIPiano
                    incrementCorrect={incrementCorrect}
                    incrementTotal={incrementTotal}
                />,
                'MIDI钢琴',
            ],
        ],
    ])

    function getNavigationLinks() {
        return navigationPagesMapping
            .entries()
            .map(([link, [_, text]], idx) => (
                <NavLink
                    className={({ isActive }) =>
                        clsx(
                            'mx-5 my-2 px-3 py-2 rounded-full hover:bg-white active:bg-slate-500',
                            isActive
                                ? 'bg-slate-200 border border-gray-400'
                                : 'bg-slate-300'
                        )
                    }
                    key={idx}
                    to={'/' + link}
                    onClick={() => setInputNote(undefined)}
                >
                    {text}
                </NavLink>
            ))
            .toArray()
    }

    function getNavigationRoutes() {
        return navigationPagesMapping
            .entries()
            .map(([link, [elmt, _]], idx) => {
                return <Route path={'/' + link} element={elmt} key={idx} />
            })
            .toArray()
    }

    const defaultSubmitter = (
        <div className="text-lg text-orange-400 text-center mt-10">
            请先从上方的菜单栏中选择您的答题方式!
        </div>
    )

    return (
        <Router>
            <ScoreBoard
                correct={correct}
                setCorrect={setCorrect}
                total={total}
                setTotal={setTotal}
            />
            <hr className="mb-5 mt-10" />
            <div className="mt-5">
                <nav className="mt-3 mb-10 py-3">{getNavigationLinks()}</nav>
                <Routes>
                    <Route path="*" element={defaultSubmitter} />
                    {getNavigationRoutes()}
                </Routes>
            </div>
        </Router>
    )
}
