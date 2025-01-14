import { useState } from "react";
import Staff from "./components/staff/staff";

export default function App() {
    const [currentNote, updateCurrentNote] = useState<number>(0);
    return <Staff currentNote={currentNote} updateCurrentNote={updateCurrentNote}/>;
}