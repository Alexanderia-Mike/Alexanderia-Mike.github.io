import React from "react";

interface Props {
    imageUrl: string;
    title: string;
    time: string;
    location: string;
    descriptions: string[];
    link?: string;
    linkText?: string;
}

class ExperiencesItem extends React.Component<Props> {
    private putBullet(bullet: string): React.ReactNode {
        return (
            <li className="mb-1">{bullet}</li>
        );
    }

    render(): React.ReactNode {
        let linkText = this.props.linkText || 'company website';
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
                        <strong className="d-inline-block mb-2 text-primary-emphasis">{this.props.location}</strong>
                        <h3 className="mb-0">{this.props.title}</h3>
                        <div className="mb-1 text-body-secondary">{this.props.time}</div>
                        <ul className="card-text mb-auto">
                            {this.props.descriptions.map((bullet, i) => this.putBullet(bullet))}
                        </ul>
                        {link}
                    </div>
                </div>
            </div>
        );
    }
}

export default ExperiencesItem;