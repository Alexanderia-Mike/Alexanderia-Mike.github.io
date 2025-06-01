import { useState } from "react";
import { ControlContext } from "../common/context";
import { NoteContext } from "../common/context";
import Staff from "../components/staff/staff";
import Submitter from "../components/submitter/submitter";
import { KeySignature } from "../common/notes-utils/key-signature";
import { OptionalNote } from "../common/notes-utils/notes";

export default function Wuxianpu() {
    const [currentNote, updateCurrentNote] = useState<OptionalNote>(undefined)
    const [inputNote, setInputNote] = useState<OptionalNote>(undefined)
    const [newNoteTrigger, setNewNoteTrigger] = useState<boolean>(false)
    const [keySignature, setKeySignature] = useState<KeySignature>(
        KeySignature.C
    )

    const triggerNewNote = () => {
        setNewNoteTrigger(!newNoteTrigger)
    }

    return (
        <NoteContext.Provider
            value={{
                currentNote,
                updateCurrentNote,
                inputNote,
                setInputNote,
                keySignature,
                setKeySignature,
            }}
        >
            <ControlContext.Provider value={{ newNoteTrigger, triggerNewNote }}>
            <div className="bg-custom-bg">
                <h1 className="text-[#333] text-3xl mt-5">五线谱练习工具</h1>
                    <Staff />
                    <Submitter />
                </div>
            </ControlContext.Provider>

        </NoteContext.Provider>
    )
}