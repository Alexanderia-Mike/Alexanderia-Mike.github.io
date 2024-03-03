import React, { ChangeEvent } from "react";
import * as Tone from 'tone'

import Button from "../utilities/button";
import { getNoteStr } from "./utils";

interface Props {
    note_count: number;
    note_period: number;
    note_count_updator: CallableFunction;
    notes_updator: CallableFunction;
};

class AudioGenerator extends React.Component<Props> {
    MAX_NOTE_COUNT: number = 10;
    NOTE_TAIL: number = 0.3;

    constructor(props: Props) {
        super(props);
        this.state = { note_count: 0 };
    }

    audioGeneratorFactory(note_count: number) {
        const new_note_count = Math.min(note_count, this.MAX_NOTE_COUNT);
        function getRandomInt(min: number, max: number) {
            return min + Math.floor(Math.random() * (max - min));
        }
        
        return async (e: React.MouseEvent) => {
            e.preventDefault();
            
            await Tone.start();
            const now = Tone.now();
            const synth = new Tone.Synth().toDestination();
            
            let start_time = now;
            let notes: number[] = [];
            for (let i = 0; i < new_note_count; ++i) {
                let note = getRandomInt(36, 61);
                notes.push(note);
            }
            this.props.notes_updator(notes);
            for (let note of notes) {
                let note_str = getNoteStr(note);
                synth.triggerAttackRelease(note_str, 
                    this.props.note_period - this.NOTE_TAIL, start_time);
                start_time += 1;
            }
        }
    }

    render(): React.ReactNode {
        const updateNoteCount = (e: ChangeEvent<HTMLInputElement>) => {
            const note_count = Number(e.target.value);
            const new_note_count = Math.min(note_count, this.MAX_NOTE_COUNT);
            this.props.note_count_updator(new_note_count);
        }
        const button_id = "audio_button";

        const note_count_value = this.props.note_count ? this.props.note_count : "";
        return (
            <div className="row justify-content-center mt-5">
                <label className="row justify-content-center mb-3">
                    <div className="col-9 col-md-7 col-lg-5 fs-4">
                        The number of notes (max {this.MAX_NOTE_COUNT}): 
                    </div>
                    <input  id="note_count"
                            value={note_count_value}
                            onChange={updateNoteCount}
                            className="col-3 col-lg-2 fs-4"
                    />
                </label>
                <Button
                    inline={true}
                    id={button_id}
                    name="Generate Audio"
                    clickHandler={this.audioGeneratorFactory(this.props.note_count)}
                    className="col-12 col-md-10 col-lg-7 fs-4"
                ></Button>
            </div>
        );
    }
}

export default AudioGenerator;