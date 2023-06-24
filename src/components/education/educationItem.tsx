import React from "react";
import { PinMap } from "react-bootstrap-icons";

interface TimeBarProps {
    startTime: string;
    endTime: string;
};

interface EducationProps {
    location: string;
    description: string;
    relavantCourses: string[];
};

interface Props {
    startTime: string;
    endTime: string;
    location: string;
    description: string;
    imageUrl: string;
    schoolName: string;
    relavantCourses: string[];
}

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

class EducationData extends React.Component<EducationProps> {
    private putCourse(courseName: string): React.ReactNode {
        return (
            <li className="my-1">{courseName}</li>
        );
    }

    render(): React.ReactNode {
        return (
            <div className="d-flex flex-column align-items-start gap-2">
                <div className="d-flex flex-row align-items-center gap-2 mt-4">
                    <PinMap size={20}></PinMap>
                    <div>{this.props.location}</div>
                </div>
                <div>{this.props.description}</div>
                <div className="fw-bold mt-1">Relavant Courses:</div>
                <ul>
                    {this.props.relavantCourses.map((courseName, i) => this.putCourse(courseName))}
                </ul>
            </div>
        );
    }
}

class EducationItem extends React.Component<Props> {
    render(): React.ReactNode {
        return (
            <div className="container-sm col-xl-6 d-flex flex-row align-items-top pb-5">
                <div className="col-3 col-lg-3 d-flex flex-column align-items-end">
                    <img src={this.props.imageUrl} height={100}/>
                </div>
                <div className="col-9 d-flex flex-column ms-5 pe-4">
                    <div className="d-flex flex-column align-items-center">
                        <h4 className="fw-normal mb-2">{this.props.schoolName}</h4>
                        <TimeBar
                            startTime={this.props.startTime}
                            endTime={this.props.endTime}
                        ></TimeBar>
                    </div>
                    <div className="d-flex flex-column align-items-start border-control">
                        <EducationData
                            location={this.props.location}
                            description={this.props.description}
                            relavantCourses={this.props.relavantCourses}
                        ></EducationData>
                    </div>
                </div>
            </div>
        );
    }
}

export default EducationItem;