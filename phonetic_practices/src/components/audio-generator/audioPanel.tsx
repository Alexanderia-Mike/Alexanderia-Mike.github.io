import React from "react";

import AudioGenerator from "./audioGenerator";
import NoteDisplay from "./noteDisplay";
import { getNoteStr } from "./utils";
import AudioVisualizer from "./audioVisualizer";

interface Props {
};

interface States {
    note_count: number;
    notes?: number[];
    note_lower?: number;
    note_upper?: number;
}

class AudioPanel extends React.Component<Props, States> {
    NOTE_PERIOD: number = 1;

    constructor(props: Props) {
        super(props);
        this.state = { note_count: 0 };
    }

    render(): React.ReactNode {
        const note_count_updator = (note_count: number) => {
            this.setState({
                ...this.state,
                note_count: note_count
            })
        }

        const notes_updator = (notes: number[]) => {
            this.setState({
                ...this.state,
                notes: notes,
                note_lower: Math.min(...notes),
                note_upper: Math.max(...notes)
            })
        }

        const notes_str = this.state.notes?.map( num => getNoteStr(num) );

        return [
            <AudioGenerator
                note_count={this.state.note_count}
                note_period={this.NOTE_PERIOD}
                note_count_updator={note_count_updator}
                notes_updator={notes_updator}
            ></AudioGenerator>,
            <NoteDisplay
                notes={notes_str}
            >
            </NoteDisplay>,
            <AudioVisualizer
                note_lower={this.state.note_lower}
                note_upper={this.state.note_upper}
                notes={this.state.notes}
            ></AudioVisualizer>
        ];
    }
}

export default AudioPanel;