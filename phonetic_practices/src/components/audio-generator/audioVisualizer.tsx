import React from "react";
import "./audioVisualizer.css";
import { noteNumToStr } from "./utils";
import "../utilities/utils.css";

interface NoteLegendProps {
    note_lower: number;
    note_upper: number;
};

interface NoteVisualizerProps {
    id: number;
    note_lower: number;
    note_upper: number;
    note: number;
    note_period: number;
    note_active: boolean;
};

interface AudioVisualizerProps {
    note_lower?: number;
    note_upper?: number;
    notes?: number[];
    note_period: number;
    notes_active?: boolean[];
};

class NoteLegend extends React.Component<NoteLegendProps> {
    render(): React.ReactNode {
        let note_legends = [];
        for (let note = this.props.note_upper + 1;
            note >= this.props.note_lower - 1; 
            --note)
        {
            note_legends.push(
                <div
                    className="row align-items-center note-legend m-0 
                               fs-6 fw-lighter text-body-secondary"
                    key={note}
                >
                    {noteNumToStr(note)}
                </div>
            );
        }

        return (
            <div className="position-absolute note-legend-container">
                {note_legends}
            </div>
        );
    }
}

class NoteVisualizer extends React.Component<NoteVisualizerProps> {
    render(): React.ReactNode {
        const note_stacks: JSX.Element[] = [];
        for (let note = this.props.note_upper + 1;
            note >= this.props.note_lower - 1; 
            --note)
        {
            const is_target = note == this.props.note ? "target" : "";
            const active_bar = note == this.props.note ? 
                <div
                    className={
                        "position-absolute p-0 note-bar hidden_target" + 
                        (this.props.note_active ? " active" : "")
                    }
                    style={ {transitionDuration: `${this.props.note_period}s`} }
                ></div> : 
                undefined;
            note_stacks.push(
                <div 
                    className="position-relative row align-items-center note-stack m-0"
                    key={note}
                >
                    <div className={`p-0 note-bar ${is_target}`}></div>
                    {active_bar}
                </div>
            )
        }

        return (
            <div 
                className="col note-stack-container p-0"
                key={this.props.id}
            >
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
                    this.props.note_upper == undefined ||
                    this.props.notes_active == undefined ||
                    this.props.notes_active.length != this.props.notes?.length) 
                {
                    console.error("note visualizer: props invalid!");
                    return <></>;
                }
                return (
                    <NoteVisualizer
                        id = {idx}
                        note_lower={this.props.note_lower}
                        note_upper={this.props.note_upper}
                        note = {note}
                        note_period={this.props.note_period}
                        note_active={this.props.notes_active[idx]}
                    ></NoteVisualizer>
                );
            }
        );

        const note_legends = 
            (this.props.note_lower != undefined && 
                this.props.note_upper != undefined) ?
            <NoteLegend
                note_lower={this.props.note_lower}
                note_upper={this.props.note_upper}
            ></NoteLegend> :
            <></>;

        return (
            <div className="row justify-content-center mb-4">
                <div className="col-12 col-md-10 col-lg-7">
                    <div className="position-relative row justify-content-center">
                        {note_legends}
                        {note_visualizers}
                    </div>
                </div>
            </div>
        )
    }
}

export default AudioVisualizer;