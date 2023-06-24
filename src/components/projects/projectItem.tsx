import React from "react";
import { PenFill } from "react-bootstrap-icons";

interface Props {
    time: string;
    projectName: string;
    location: string;
    description: string[];
    iconColor: string;
    link?: string;
    linkText?: string;
};

class ProjectItem extends React.Component<Props> {
    private putBullet(bullet: string): React.ReactNode {
        return (
            <li className="mb-1">{bullet}</li>
        );
    }

    render(): React.ReactNode {
        let linkText = this.props.linkText || 'view details';
        let link: React.ReactNode
        if (this.props.link)
            link = (
                <p>
                    <a href={this.props.link} target="_blank" className="gap-1 btn btn-secondary mt-2">
                        {linkText}
                    </a>
                </p>
            );
        else
            link = <></>;

        return (
            <div className="col-md-8">
                <div className="row g-0 rounded overflow-hidden flex-md-row mb-4">
                    <div className="col-4 col-md-3 col-xl-2 d-flex flex-row align-items-center p-4
                                    justify-content-center border-end border-white position-relative">
                        <div className="text-center">{this.props.time}</div>
                        <div className="position-absolute top-50 start-100 translate-middle">
                            <PenFill size={50} color={this.props.iconColor}></PenFill>
                        </div>
                    </div>
                    <div className="col my-4 ms-5 ps-4 d-flex flex-column">
                        <h3 className="mb-0">{this.props.projectName}</h3>
                        <div className="mb-1 text-body-secondary">{this.props.location}</div>
                        <ul className="card-text mb-auto">
                            {this.props.description.map((bullet, i) => this.putBullet(bullet))}
                        </ul>
                        {link}
                    </div>
                </div>
            </div>
        );
    }
}

export default ProjectItem;