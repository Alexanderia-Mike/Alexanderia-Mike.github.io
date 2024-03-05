import React, { ChangeEvent } from "react";
import "../utilities/utils.css";

import Button from "../utilities/button";

interface Props {
    note_period: number;
    notes_updator: CallableFunction;
};

interface States {
    note_count: number;
}

class AudioGenerator extends React.Component<Props, States> {
    private static MAX_NOTE_COUNT: number = 5;

    constructor(props: Props) {
        super(props);
        this.state = { note_count: 0 };
    }

    audioGeneratorFactory(note_count: number) {
        const new_note_count = Math.min(note_count, AudioGenerator.MAX_NOTE_COUNT);
        function getRandomInt(min: number, max: number) {
            return min + Math.floor(Math.random() * (max - min));
        }
        
        return async (e: React.MouseEvent) => {
            e.preventDefault();
            let notes: number[] = [];
            for (let i = 0; i < new_note_count; ++i) {
                let note = getRandomInt(36, 61);
                notes.push(note);
            }
            
            this.props.notes_updator(notes);
        }
    }

    render(): React.ReactNode {
        const updateNoteCount = (e: ChangeEvent<HTMLInputElement>) => {
            const note_count = Number(e.target.value);
            const new_note_count = Math.min(note_count, AudioGenerator.MAX_NOTE_COUNT);
            this.setState({ note_count: new_note_count });
        }
        const button_id = "audio_button";

        const note_count_value = this.state.note_count == 0 ? "" : this.state.note_count;
        return (
            <div className="row justify-content-center my-5">
                <label className="row justify-content-center mb-3">
                    <div className="col-9 col-md-7 col-lg-5 my-fontsize">
                        The number of notes (max {AudioGenerator.MAX_NOTE_COUNT}): 
                    </div>
                    <input  id="note_count"
                            value={note_count_value}
                            onChange={updateNoteCount}
                            className="col-3 col-lg-2 my-fontsize"
                    />
                </label>
                <Button
                    inline={true}
                    id={button_id}
                    name="Generate Random Audio"
                    clickHandler={this.audioGeneratorFactory(this.state.note_count)}
                    className="col-12 col-md-10 col-lg-7 my-fontsize"
                ></Button>
            </div>
        );
    }
}

export default AudioGenerator;