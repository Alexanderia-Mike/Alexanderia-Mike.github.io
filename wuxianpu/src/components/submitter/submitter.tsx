import { JSX, useState } from 'react'
import { NavLink, Route, HashRouter as Router, Routes } from 'react-router-dom'
import { TextSubmitter } from './text-submitter/text-submitter'
import clsx from 'clsx'
import { NoteName } from '../../common/common'
import ScoreBoard from './score-board'

export default function Submitter({
    currentNoteName,
}: {
    currentNoteName: NoteName | undefined
}) {
    const [correct, setCorrect] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)

    const navigationPagesMapping: Map<string, [JSX.Element, string]> = new Map([
        [
            'text-submitter',
            [
                <TextSubmitter
                    currentNoteName={currentNoteName}
                    incrementCorrect={() => setCorrect(correct + 1)}
                    incrementTotal={() => setTotal(total + 1)}
                />,
                '手动输入',
            ],
        ],
        ['virtual-piano', [<div>virtual piano (TODO)</div>, '虚拟钢琴']],
        ['bluetooth-piano', [<div>bluetooth piano (TODO)</div>, '蓝牙钢琴']],
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
            <div className="mt-5">
                <nav className="mt-3 mb-10">{getNavigationLinks()}</nav>
                <Routes>
                    <Route path="/" element={defaultSubmitter} />
                    {getNavigationRoutes()}
                </Routes>
            </div>
        </Router>
    )
}
