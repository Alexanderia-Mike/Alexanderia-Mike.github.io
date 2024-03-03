import React, { ChangeEvent } from "react";
import * as Tone from 'tone'

import Button from "../utilities/button";

interface Props {
    note_count: number;
    note_count_updator: CallableFunction;
};

class AudioGenerator extends React.Component<Props> {
    MAX_NOTE_COUNT: number = 10;

    constructor(props: Props) {
        super(props);
        this.state = { note_count: 0 };
    }

    audioGeneratorFactory(note_count: number) {
        const new_note_count = Math.min(note_count, this.MAX_NOTE_COUNT);
        function getRandomInt(min: number, max: number) {
            return min + Math.floor(Math.random() * (max - min));
        }

        function getNoteStr(note: number) {
            let base = Math.floor(note / 12)
            let remainder = note % 12
            let note_level = ""
            if (remainder == 0) note_level += "C"
            else if (remainder == 1) note_level += "Db"
            else if (remainder == 2) note_level += "D"
            else if (remainder == 3) note_level += "Eb"
            else if (remainder == 4) note_level += "E"
            else if (remainder == 5) note_level += "F"
            else if (remainder == 6) note_level += "Gb"
            else if (remainder == 7) note_level += "G"
            else if (remainder == 8) note_level += "Ab"
            else if (remainder == 9) note_level += "A"
            else if (remainder == 10) note_level += "Bb"
            else note_level += "B"
            return note_level + base
        }
        
        return async (e: React.MouseEvent) => {
            e.preventDefault();
            
            await Tone.start()
            const now = Tone.now()
            const synth = new Tone.Synth().toDestination()
            
            let start_time = now
            console.log("---------")
            for (let i = 0; i < new_note_count; ++i) {
                let note = getRandomInt(36, 61)
                let note_str = getNoteStr(note)
                console.log(`note is ${note_str}`)
                synth.triggerAttackRelease(note_str, "2n", start_time)
                start_time += 1
            }
        }
    }

    render(): React.ReactNode {
        const updateNoteCount = (e: ChangeEvent<HTMLInputElement>) => {
            const note_count = Number(e.target.value)
            const new_note_count = Math.min(note_count, this.MAX_NOTE_COUNT);
            this.props.note_count_updator(new_note_count)
        }
        const button_id = "audio_button"

        const note_count_value = this.props.note_count ? this.props.note_count : "";
        return (
            <div className="container row justify-content-center mt-5">
                <label className="row justify-content-center mb-3">
                    <div className="col-5">
                        The number of notes (max {this.MAX_NOTE_COUNT}): 
                    </div>
                    <input  id="note_count"
                            value={note_count_value}
                            onChange={updateNoteCount}
                            className="col-2"
                    />
                </label>
                <Button
                    inline={true}
                    id={button_id}
                    name="Generate Audio"
                    clickHandler={this.audioGeneratorFactory(this.props.note_count)}
                    className="col-7"
                ></Button>
            </div>
        );
    }
}

export default AudioGenerator;