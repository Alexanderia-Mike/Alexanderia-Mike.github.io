import React from "react";

interface NoteElementProps {
    id: number;
    note_str: string;
};

interface NoteDisplayProps {
    notes?: string[];
};

class NoteElement extends React.Component<NoteElementProps> {
    render(): React.ReactNode {
        return (
            <input
                className="col fs-2 text-center mx-2 form-control"
                key={this.props.id}
                value={this.props.note_str}
            />
        );
    }
}

class NoteDisplay extends React.Component<NoteDisplayProps> {
    render(): React.ReactNode {
        const renderNote = (note_str: string, idx: number) => {
            return <NoteElement
                id={idx}
                note_str={note_str}
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