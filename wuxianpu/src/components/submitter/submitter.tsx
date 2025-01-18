import { JSX } from 'react'
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'

const navigationPages: Record<string, JSX.Element> = {
    "a": <div></div>
}

export default function Submitter() {
    

    return (
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to={'/'}>Text Input</Link>
                    </li>
                    <li>
                        <Link to={'/virtual-piano'}>Virtual Piano</Link>
                    </li>
                    <li>
                        <Link to={'/bluetooth-piano'}>Bluetooth Piano</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<div>text input</div>} />
                <Route
                    path="/virtual-piano"
                    element={<div>virtual-piano</div>}
                />
                <Route
                    path="/bluetooth-piano"
                    element={<div>bluetooth-piano</div>}
                />
            </Routes>
        </Router>
    )
}
