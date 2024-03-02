import React, { ChangeEvent } from "react";
import * as Tone from 'tone'

import Button from "../utilities/button";

interface Props {
};

interface States {
    note_count: number;
}

class AudioGenerator extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = { note_count: 0 };
    }

    audioGeneratorFactory(note_count: number) {
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
            for (let i = 0; i < note_count; ++i) {
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
            this.setState({
                note_count: Number(e.target.value)
            });
        }
        const button_id = "audio_button"

        return (
            <div>
                <label>
                    Provide the number of notes: 
                    <input  id="note_count"
                            value={this.state.note_count}
                            onChange={updateNoteCount}
                    />
                </label>
                <Button
                    id={button_id}
                    name="Generate Audio"
                    clickHandler={this.audioGeneratorFactory(this.state.note_count)}
                ></Button>
            </div>
        );
    }
}

export default AudioGenerator;