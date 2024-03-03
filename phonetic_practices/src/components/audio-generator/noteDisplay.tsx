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
            <div className="col fs-1 text-center" key={this.props.id}>
                { this.props.note_str }
            </div>
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
            <div className="row justify-content-center mt-4">
                <div className="col-12 col-md-10 col-lg-7">
                    <div className="row justify-content-center">
                        { note_elements }
                    </div>
                </div>
            </div>
        )
    }
}

export default NoteDisplay;