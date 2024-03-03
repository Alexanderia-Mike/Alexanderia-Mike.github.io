import React from "react";

import AudioGenerator from "./audioGenerator";

interface Props {
};

interface States {
    note_count: number;
}

class AudioPanel extends React.Component<Props, States> {
    MAX_NOTE_COUNT: number = 5;

    constructor(props: Props) {
        super(props);
        this.state = { note_count: 0 };
    }

    render(): React.ReactNode {
        const note_count_updator = (note_count: number) => {
            this.setState({
                note_count: note_count
            })
        }

        // TODO: how to share state between components
        return (
            <AudioGenerator
                note_count={this.state.note_count}
                note_count_updator={note_count_updator}
            ></AudioGenerator>
        );
    }
}

export default AudioPanel;