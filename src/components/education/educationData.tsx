import React from "react";
import { PinMap } from "react-bootstrap-icons";

interface TimeBarProps {
    startTime: string;
    endTime: string;
};

interface Props {
    startTime: string;
    endTime: string;
    location: string;
    description: string;
};

class TimeBar extends React.Component<TimeBarProps> {
    render(): React.ReactNode {
        return (
            <div className="d-flex flex-row align-items-center gap-3">
                <div>{this.props.startTime}</div>
                <hr style={{width: "50pt"}}/>
                <div>{this.props.endTime}</div>
            </div>
        );
    }
}

class EducationData extends React.Component<Props> {
    render(): React.ReactNode {
        return (
            <div className="d-flex flex-column align-items-center gap-2">
                <TimeBar
                    startTime={this.props.startTime}
                    endTime={this.props.endTime}
                ></TimeBar>
                <div className="d-flex flex-row align-items-center gap-2">
                    <PinMap size={20}></PinMap>
                    <span>{this.props.location}</span>
                </div>
                <span>{this.props.description}</span>
            </div>
        );
    }
}

export default EducationData;