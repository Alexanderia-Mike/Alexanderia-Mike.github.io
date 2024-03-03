import React from "react";

import AudioGenerator from "./audioGenerator";
import NoteDisplay from "./noteDisplay";

interface Props {
};

interface States {
    note_count: number;
    notes?: string[];
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

        const notes_updator = (notes: string[]) => {
            this.setState({
                ...this.state,
                notes: notes
            })
        }

        return [
            <AudioGenerator
                note_count={this.state.note_count}
                note_period={this.NOTE_PERIOD}
                note_count_updator={note_count_updator}
                notes_updator={notes_updator}
            ></AudioGenerator>,
            <NoteDisplay
                notes={this.state.notes}
            >
            </NoteDisplay>
        ];
    }
}

export default AudioPanel;