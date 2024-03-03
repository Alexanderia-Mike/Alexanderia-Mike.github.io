import React from "react";
import "./audioVisualizer.css";

interface NoteVisualizerProps {
    id: number;
    note_lower: number;
    note_upper: number;
    note: number;
};

interface AudioVisualizerProps {
    note_lower?: number;
    note_upper?: number;
    notes?: number[];
};

class NoteVisualizer extends React.Component<NoteVisualizerProps> {
    render(): React.ReactNode {
        const note_stacks: JSX.Element[] = [];
        for (let note = this.props.note_upper + 1;
            note >= this.props.note_lower - 1; 
            --note)
        {
            const is_active = note == this.props.note ? "active" : "";
            note_stacks.push(
                <div 
                    className={`border-bottom note-stack ${is_active}`} 
                    key={this.props.id}
                ></div>
            )
        }

        return (
            <div className="col note-stack-container p-0">
                {note_stacks}
            </div>
        )
    }
}

class AudioVisualizer extends React.Component<AudioVisualizerProps> {
    render(): React.ReactNode {
        const note_visualizers = this.props.notes?.map(
            (note, idx) => {
                if (this.props.note_lower == undefined || 
                    this.props.note_upper == undefined) 
                {
                    console.error("note_lower or note_upper is not defined!");
                    return <></>;
                }
                return (
                    <NoteVisualizer
                        id = {idx}
                        note_lower={this.props.note_lower}
                        note_upper={this.props.note_upper}
                        note = {note}
                    ></NoteVisualizer>
                );
            }
        );

        return (
            <div className="row justify-content-center mb-4">
                <div className="col-12 col-md-10 col-lg-7">
                    <div className="row justify-content-center">
                        {note_visualizers}
                    </div>
                </div>
            </div>
        )
    }
}

export default AudioVisualizer;