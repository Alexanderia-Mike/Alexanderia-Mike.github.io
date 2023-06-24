import React from "react";
import SectionHeader from "../common/sectionHeader";

interface Props {
    // TODO
};

class Research extends React.Component<Props> {
    render(): React.ReactNode {
        return (
            <div id="Research" style={{paddingTop: 60, paddingBottom: 60, backgroundColor: "#D2D3D590"}}>
                <SectionHeader
                    imageUrl="images/research-header.png"
                ></SectionHeader>
                {/* 999999 */}
                <div className="pt-4">
                    // TODO
                </div>
            </div>
        );
    }
}

export default Research;