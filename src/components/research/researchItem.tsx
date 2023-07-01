import React from "react";
import "./research.css";

interface Props {
    imageUrl: string;
    title: string;
    time: string;
    location: string;
    locationLink?: string;
    abstract: string;
    link?: string;
    linkText?: string;
}

class ResearchItem extends React.Component<Props> {
    render(): React.ReactNode {
        let linkText = this.props.linkText || 'paper link';
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
            <div className="col-10 col-md-9">
                <div className="row g-0 flex-md-row mb-4 shadow-sm">
                    <a href={this.props.link || '#'} target="_blank" className="col-auto d-none d-xl-block">
                        <img src={this.props.imageUrl} height={300} width={300}/>
                    </a>
                    <div className="col overflow-auto py-3 ps-4 pe-2 d-flex flex-column" style={{height: "300px"}}>
                        <a href={this.props.locationLink || "#"} target="_blank" className={this.props.locationLink ? "" : "nonClickable"}>
                            <strong className="d-inline-block mb-2 text-primary-emphasis">{this.props.location}</strong>
                        </a>
                        <h4 className="mb-0">{this.props.title}</h4>
                        <div className="mb-1 text-body-secondary">{this.props.time}</div>
                        <div className="card-text mb-auto mt-2">
                            <strong>Abstract: </strong>{this.props.abstract}
                        </div>
                        {link}
                    </div>
                </div>
            </div>
        );
    }
}

export default ResearchItem;