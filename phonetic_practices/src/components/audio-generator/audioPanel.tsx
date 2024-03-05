import React from "react";
import * as Tone from 'tone'
import "../utilities/utils.css";

import AudioGenerator from "./audioGenerator";
import NoteDisplay from "./noteDisplay";
import { delay, noteNumToStr } from "./utils";
import AudioVisualizer from "./audioVisualizer";
import PlayButton from "./playButton";

interface Props {
};

interface States {
    notes?: number[];
    note_lower?: number;
    note_upper?: number;
    notes_active?: boolean[];
}

class AudioPanel extends React.Component<Props, States> {
    private static NOTE_PERIOD: number = 1;
    private static NOTE_TAIL: number = 0.3;

    constructor(props: Props) {
        super(props);
        this.state = {
            notes: undefined,
            note_lower: undefined,
            note_upper: undefined,
            notes_active: undefined
        };
    }

    private audio_init = async () => {
        await Tone.start();
        return new Tone.Synth().toDestination();
    }

    private audio_trigger = async (synth: Tone.Synth) => {
        if (!this.state.notes) { return; }

        const now = Tone.now();
        let start_time = now;

        for (let note of this.state.notes) {
            const note_str = noteNumToStr(note);
        
            synth.triggerAttackRelease(note_str, 
                AudioPanel.NOTE_PERIOD - AudioPanel.NOTE_TAIL, start_time);
            start_time += 1;
        }
    }
    
    private visualizer_trigger = async () => {
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
            await delay(AudioPanel.NOTE_PERIOD * 1000);
        }
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

        const notes_str = this.state.notes?.map( num => noteNumToStr(num) );

        return [
            <AudioGenerator
                note_period={AudioPanel.NOTE_PERIOD}
                notes_updator={notes_updator}
            ></AudioGenerator>,
            <div className="position-relative">
                <NoteDisplay
                    notes={notes_str}
                    note_updator={note_updator}
                ></NoteDisplay>
                <AudioVisualizer
                    note_lower={this.state.note_lower}
                    note_upper={this.state.note_upper}
                    notes={this.state.notes}
                    note_period={AudioPanel.NOTE_PERIOD}
                    notes_active={this.state.notes_active}
                ></AudioVisualizer>
                <PlayButton
                    show={this.state.notes != undefined}
                    onClick={
                        async () => {
                            const synth = await this.audio_init();
                            this.audio_trigger(synth);
                            this.visualizer_trigger();
                    }}
                ></PlayButton>
            </div>
        ];
    }
}

export default AudioPanel;