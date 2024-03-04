import React from "react";

import AudioGenerator from "./audioGenerator";
import NoteDisplay from "./noteDisplay";
import { delay, noteNumToStr } from "./utils";
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

        const note_updator = 
            (note: number, idx: number, callback?:CallableFunction) => 
        {
            if (this.state.notes == undefined)  { return; }
            let new_notes = this.state.notes;
            new_notes[idx] = note;
            this.setState({
                ...this.state,
                notes: new_notes,
                note_lower: Math.min(...new_notes),
                note_upper: Math.max(...new_notes),
                notes_active: new_notes.map( _ => false )
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

        const notes_str = this.state.notes?.map( num => noteNumToStr(num) );

        return [
            <AudioGenerator
                note_period={this.NOTE_PERIOD}
                notes_updator={notes_updator}
                visualizer_updator={visualizer_updator}
            ></AudioGenerator>,
            <NoteDisplay
                notes={notes_str}
                note_updator={note_updator}
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