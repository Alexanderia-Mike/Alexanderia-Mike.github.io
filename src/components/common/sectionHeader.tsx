import React from "react";

import "./sectionHeader.css";

interface Props {
    imageUrl: string;
};

class SectionHeader extends React.Component<Props> {
    render(): React.ReactNode {
        return (
            <div className="container flex-row align-items-center mb-5 shadow">
                {/* <center className="display-1" style={{color: "#C9BFB7"}}>EDUCATION</center> */}
                <center><img src={this.props.imageUrl}/></center>
            </div>
        );
    }
}

export default SectionHeader;