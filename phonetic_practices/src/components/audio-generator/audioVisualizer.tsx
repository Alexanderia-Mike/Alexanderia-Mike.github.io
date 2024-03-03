import React from "react";

interface Props {
    note_lower: number;
    note_upper: number;
    notes: string[];
};

class AudioVisualizer extends React.Component<Props> {
    render(): React.ReactNode {
        return (
            <div className="row justify-content-center mt-5">
                
            </div>
        )
    }
}

export default AudioVisualizer;