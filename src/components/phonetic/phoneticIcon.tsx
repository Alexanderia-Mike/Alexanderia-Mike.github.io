import React from "react";
import { MusicNoteBeamed } from 'react-bootstrap-icons';
import "./phoneticIcon.css"

interface Props {
    // TODO
};

class PhoneticIcon extends React.Component<Props> {
    render(): React.ReactNode {
        return (
            <a className="position-fixed bottom-0 end-0 me-5 mb-5 p-3 
                rounded-circle bg-white shadow-lg"
                id="music_icon"
                href="./phonetic_practices/index.html"
            >
                <MusicNoteBeamed size={50} color="black"/>
            </a>
        )
    }
}

export default PhoneticIcon;