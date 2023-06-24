import React from "react";
import SectionHeader from "../common/sectionHeader";

interface Props {
    // TODO
};

class Contact extends React.Component<Props> {
    render(): React.ReactNode {
        return (
            <div id="Contact" style={{paddingTop: 60, paddingBottom: 60}}>
                <SectionHeader
                    imageUrl="images/contact-header.png"
                ></SectionHeader>
                {/* C9BEB7 */}
                <div className="pt-4">
                    // TODO
                </div>
            </div>
        );
    }
}

export default Contact;