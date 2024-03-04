import React from "react";

import AudioGenerator from "./audioGenerator";
import NoteDisplay from "./noteDisplay";
import { delay, getNoteStr } from "./utils";
import AudioVisualizer from "./audioVisualizer";

interface Props {
};

interface States {
    notes?: number[];
    note_lower?: number;
    note_upper?: number;
    notes_active?: boolean[];
}

class AudioPanel extends React.Component<Props, States> {
    NOTE_PERIOD: number = 1;

    constructor(props: Props) {
        super(props);
        this.state = {
            notes: undefined,
            note_lower: undefined,
            note_upper: undefined,
            notes_active: undefined
        };
    }

    render(): React.ReactNode {
        const notes_updator = 
            (notes: number[], callback?:CallableFunction) => 
        {
            this.setState({
                ...this.state,
                notes: notes,
                note_lower: Math.min(...notes),
                note_upper: Math.max(...notes),
                notes_active: notes.map( _ => false )
            }, async () => {
                await delay(10);
                if (callback)   { callback(); }
            });
        }

        const visualizer_updator = async () => {
            if (!this.state.notes) { return; }

            const note_count = this.state.notes.length;
            if (!this.state.notes_active || 
                this.state.notes_active.length != note_count)
            {
                console.error("visualizer_updator: invalid notes_active!");
                return;
            }

            for (let i = 0; i < note_count; ++i) {
                let active = this.state.notes_active;
                active[i] = true;
                this.setState({
                    ...this.state,
                    notes_active: active
                });
                await delay(this.NOTE_PERIOD * 1000);
            }
        }

        const notes_str = this.state.notes?.map( num => getNoteStr(num) );

        return [
            <AudioGenerator
                note_period={this.NOTE_PERIOD}
                notes_updator={notes_updator}
                visualizer_updator={visualizer_updator}
            ></AudioGenerator>,
            <NoteDisplay
                notes={notes_str}
            >
            </NoteDisplay>,
            <AudioVisualizer
                note_lower={this.state.note_lower}
                note_upper={this.state.note_upper}
                notes={this.state.notes}
                note_period={this.NOTE_PERIOD}
                notes_active={this.state.notes_active}
            ></AudioVisualizer>
        ];
    }
}

export default AudioPanel;