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
                <div className="container pt-4 px-5">
                    <div className="row g-3">
                        <div className="col-md-4">
                            <label htmlFor="firstName" className="form-label">First name</label>
                            <input type="text" className="form-control" id="firstName" placeholder=""/>
                        </div>

                        <div className="col-md-4">
                            <label htmlFor="lastName" className="form-label">Last name</label>
                            <input type="text" className="form-control" id="lastName" placeholder=""/>
                        </div>
                        
                        <div className="col-md-4">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="text" className="form-control" id="email" placeholder="you@example.com"/>
                        </div>

                        <div className="col-12">
                            <label htmlFor="subject" className="form-label">Subject <span className="text-body-secondary">(Optional)</span></label>
                            <input type="text" className="form-control" id="subject" placeholder="Subject"/>
                        </div>
                        
                        <div className="col-12">
                            <label htmlFor="subject" className="form-label">Message</label>
                            <textarea className="form-control" id="message" placeholder="Message" style={{height: "150px"}}/>
                        </div>
                    </div>

                    <center className="mt-5">
                        <div className="col-12">
                                <div className="alert alert-primary alert-dismissible fade show" role="alert">
                                    This section is just a mock. Clicking the button does not have actual effect!
                                </div>
                        </div>
                        <button className="w-100 btn btn-secondary btn-lg" type="submit">Send your message</button>
                    </center>
                </div>
            </div>
        );
    }
}

export default Contact;