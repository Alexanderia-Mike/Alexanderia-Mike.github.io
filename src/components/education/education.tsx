import React from "react";
import { Bank, Book } from "react-bootstrap-icons";

import EducationData from "./educationData";

import "./education.css";

interface Props {
    // TODO
};

// class Date {
//     year: number;
//     month: number;
//     now: boolean;
// };

// interface EducationItemProps {
//     schoolName: string;
//     icon: React.ReactNode;
//     degreeName: string;
//     startDate: Date;
//     endDate: Date;
//     location: string;
//     otherDescriptions: React.ReactNode;
// };

class EducationHeader extends React.Component {
    render(): React.ReactNode {
        return (
            <div className="container flex-row align-items-center mb-5">
                {/* <center className="display-1" style={{color: "#C9BFB7"}}>EDUCATION</center> */}
                <center><img src={"images/education-header.png"}/></center>
            </div>
        );
    }
}

class Education extends React.Component<Props> {
    render(): React.ReactNode {
        return (
            <div id="Education" style={{paddingTop: 60, paddingBottom: 60, backgroundColor: "#EAEBE5"}}>
                <EducationHeader></EducationHeader>
                <div className="container-xxl d-flex flex-column flex-lg-row align-items-top education-container">
                    <div className="col-lg-6 d-flex flex-column align-items-center py-5 border-control">
                        <Book size={100} className="mb-3"></Book>
                        <h2 className="fw-normal mb-5">Shanghai Jiao Tong University</h2>
                        <EducationData
                            startTime="Sept 2018"
                            endTime="Aug 2022"
                            location="Shanghai, China"
                            description="GPA: 3.8/4.0; Rank: 5/158"
                        ></EducationData>
                    </div>
                    <div className="col-lg-6 d-flex flex-column align-items-center py-5">
                    <Bank size={100} className="mb-3"></Bank>
                        <h2 className="fw-normal mb-5">Carnegie Mellon University</h2>
                        <EducationData
                            startTime="Sept 2022"
                            endTime="now"
                            location="Pittsburgh, PA, USA"
                            description="Expected to graduate in May 2024"
                        ></EducationData>
                    </div>
                </div>
            </div>
        );
    }
}

export default Education;