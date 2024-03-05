import React, { ChangeEvent, ChangeEventHandler } from "react";
import { noteStrToNum } from "./utils";
import Dropdown from "../utilities/dropdown";
import NOTES from "../utilities/note_string";
import "../utilities/utils.css";

interface NoteElementProps {
    id: number;
    note_str: string;
    note_updator: ChangeEventHandler<HTMLSelectElement>;
};

interface NoteDisplayProps {
    notes?: string[];
    note_updator: CallableFunction;
};

class NoteElement extends React.Component<NoteElementProps> {
    render(): React.ReactNode {
        return (
            <Dropdown
                options={NOTES}
                key={this.props.id}
                default_option={this.props.note_str}
                className="col my-fontsize text-center mx-0 mx-sm-2"
                onChange={this.props.note_updator}
            ></Dropdown>
        );
    }
}

class NoteDisplay extends React.Component<NoteDisplayProps> {
    changeEventHandlerFactory(idx: number) {
        return (e: ChangeEvent<HTMLSelectElement>) => {
            try {
                const note = noteStrToNum(e.target.value);
                this.props.note_updator(note, idx);
            } catch (e) {
                if (e instanceof Error) console.error(e.message);
            }
        }
    }

    render(): React.ReactNode {
        const renderNote = (note_str: string, idx: number) => {
            return <NoteElement
                id={idx}
                note_str={note_str}
                note_updator={this.changeEventHandlerFactory(idx)}
            ></NoteElement>
        }

        const note_elements = this.props.notes ? 
            this.props.notes.map( (note, idx) => renderNote(note, idx) ) :
            [];

        return (
            <div className="row justify-content-center my-4">
                <div className="col-12 col-md-10 col-lg-7">
                    <div className="row justify-content-evenly">
                        { note_elements }
                    </div>
                </div>
            </div>
        )
    }
}

export default NoteDisplay;