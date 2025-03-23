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

    const { setInputNote } = useContext(NoteContext)

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
        const activeNavDecoratorStart = (
            <div className="absolute bg-white w-3 h-3 -translate-x-full bottom-0 left-0">
                <div className="w-full h-full bg-custom-bg rounded-ee-xl"></div>
            </div>
        )
        const activeNavDecoratorEnd = (
            <div className="absolute bg-white w-3 h-3 translate-x-full bottom-0 right-0">
                <div className="w-full h-full bg-custom-bg rounded-es-xl"></div>
            </div>
        )
        return Array.from(navigationPagesMapping.entries()).map(
            ([link, [_, text]], idx) => (
                <NavLink
                    className={({ isActive }) =>
                        clsx(
                            'mt-2 px-1 py-1 flex flex-grow-0 relative',
                            isActive
                                ? 'bg-white rounded-ss-xl rounded-se-xl'
                                : 'bg-transparent'
                        )
                    }
                    key={idx}
                    to={'/' + link}
                    onClick={() => setInputNote(undefined)}
                >
                    {({ isActive }) => (
                        <>
                            {isActive && activeNavDecoratorStart}
                            <div className="py-2 px-5 rounded-xl hover:bg-white hover:z-10 active:bg-slate-500 active:z-10">
                                {text}
                            </div>
                            {isActive && activeNavDecoratorEnd}
                        </>
                    )}
                </NavLink>
            )
        )
    }

    function getNavigationRoutes() {
        return Array.from(navigationPagesMapping.entries()).map(
            ([link, [elmt, _]], idx) => {
                return <Route path={'/' + link} element={elmt} key={idx} />
            }
        )
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
                <nav className="mt-3 pt-3 flex justify-center items-center">
                    {getNavigationLinks()}
                </nav>
                <div className="bg-white pt-10 flow-root">
                    <Routes>
                        <Route path="*" element={defaultSubmitter} />
                        {getNavigationRoutes()}
                    </Routes>
                </div>
            </div>
        </Router>
    )
}
