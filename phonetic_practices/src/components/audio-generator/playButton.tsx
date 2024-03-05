import React, { MouseEventHandler } from "react";
import { PlayCircle } from "react-bootstrap-icons";
import "../utilities/utils.css";
import "./playButton.css";

interface Props {
    show: boolean;
    onClick: MouseEventHandler;
};

class PlayButton extends React.Component<Props> {
    render(): React.ReactNode {
        return this.props.show ?
        (
            <div className="row justify-content-center play_button_container">
                <button
                    type="button"
                    className="btn btn-link play_button col-4 col-sm-12"
                    onClick={this.props.onClick}
                >
                    <PlayCircle 
                        className="play_button_icon mb-5"
                    ></PlayCircle>
                </button>
            </div>
        ) : <></>;
    }
}

export default PlayButton;