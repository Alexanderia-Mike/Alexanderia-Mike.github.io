import { JSX } from 'react'
import {
    Link,
    NavLink,
    Route,
    BrowserRouter as Router,
    Routes,
} from 'react-router-dom'
import { TextSubmitter } from './text-submitter/text-submitter'
import clsx from 'clsx'

const navigationPagesMapping: Map<string, JSX.Element> = new Map([
    ['text-submitter', <TextSubmitter />],
    ['virtual-piano', <div>virtual piano (TODO)</div>],
    ['bluetooth-piano', <div>bluetooth piano (TODO)</div>],
])

function getNavigationLinks() {
    return navigationPagesMapping
        .keys()
        .map((link, idx) => {
            const text = link
                .split('-')
                .map((s) => s.toUpperCase())
                .join(' ')
            return (
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
            )
        })
        .toArray()
}

function getNavigationRoutes() {
    return navigationPagesMapping
        .entries()
        .map(([link, elmt], idx) => {
            return <Route path={'/' + link} element={elmt} key={idx} />
        })
        .toArray()
}

export default function Submitter() {
    const defaultSubmitter = (
        <div className="text-lg text-orange-400 text-center mt-10">
            Please select a submitter from the navigation bar above!
        </div>
    )
    return (
        <Router>
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
