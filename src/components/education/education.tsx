import React from "react";
import { Bank, Book } from "react-bootstrap-icons";

import EducationItem from "./educationItem";
import SectionHeader from "../common/sectionHeader";

interface Props {
    // TODO
};

class Education extends React.Component<Props> {
    render(): React.ReactNode {
        return (
            <div id="Education" style={{paddingTop: 60, paddingBottom: 60, backgroundColor: "#EAEBE500"}}>
                <SectionHeader
                    imageUrl="images/education-header.png"
                ></SectionHeader>
                <div className="container-xxl pt-4 d-flex flex-column flex-xl-row align-items-top education-container">
                    <EducationItem
                        startTime="Sept 2018"
                        endTime="Aug 2022"
                        location="Shanghai, China"
                        description="GPA: 3.8/4.0; Rank: 5/158"
                        imageUrl="images/sjtu.png"
                        schoolName="Shanghai Jiao Tong University"
                        relavantCourses={[
                            'Data Structures and Algorithms',
                            'Electronic Circuits',
                            'Digital Integrated Circuits',
                            'Introduction to Logic Design',
                            'Intro to Computer Organization',
                            'Design of MCU Based System',
                            'Undergraduate Research (Circuit Automated Approximate Logic Synthesis)'
                        ]}
                    ></EducationItem>
                    <EducationItem
                        startTime="Sept 2022"
                        endTime="now"
                        location="Pittsburgh, PA, USA"
                        description="Expected to graduate in May 2024"
                        imageUrl="images/cmu.png"
                        schoolName="Carnegie Mellon University"
                        relavantCourses={[
                            'Principles of Software Construction -- Objects, Design, and Concurrency',
                            'Foundations of Computer Systems',
                            'Distributed Systems',
                            'Advanced Cloud Computing',
                            'Parallel Computer Architecture and Programming'
                        ]}
                    ></EducationItem>
                </div>
            </div>
        );
    }
}

export default Education;