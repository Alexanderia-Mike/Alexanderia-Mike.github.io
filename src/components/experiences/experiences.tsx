import React from "react";
import SectionHeader from "../common/sectionHeader";

interface Props {
    // TODO
};

class Experiences extends React.Component<Props> {
    render(): React.ReactNode {
        return (
            <div id="Experiences" style={{paddingTop: 60, paddingBottom: 60}}>
                <SectionHeader
                    imageUrl="images/experiences-header.png"
                ></SectionHeader>
                {/* C9BEB7 */}
                <div className="pt-4">
                    // TODO
                </div>
            </div>
        );
    }
}

export default Experiences;