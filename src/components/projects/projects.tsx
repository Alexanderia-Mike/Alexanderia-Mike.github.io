import React from "react";

import SectionHeader from "../common/sectionHeader";
import ProjectItem from "./projectItem";

interface Props {
    // TODO
};

class Projects extends React.Component<Props> {
    render(): React.ReactNode {
        return (
            <div id="Projects" style={{paddingTop: 60, paddingBottom: 60, backgroundColor: "#D2D3D590"}}>
                <SectionHeader
                    imageUrl="images/projects-header.png"
                ></SectionHeader>
                {/* header color: 8C7757 */}
                <div className="pt-4 d-flex flex-column align-items-center">
                    <ProjectItem
                        time="May 2023"
                        projectName="Parallel Four-color Map Solver"
                        location="CMU, Pittsburgh, PA"
                        description={[
                            'Innovated and implemented parallel breadth-first-search algorithm (C++) using OpenMP that minimizes inter-node dependencies and cache false-sharing. Achieved super-linear scaling (more than 10x speedup) on a cluster of 8 nodes.',
                            'Negotiated and collaborated with teammates on the interactive web client interface (JavaScript) using P5.js.', 
                            'Built a server (C++) on the backend cluster that communicates with web client through HTTP.'
                        ]}
                        iconColor='#77677A'
                        link='15618proj/index.html'
                        linkText="go to project page"
                    ></ProjectItem>
                    <ProjectItem
                        time="May 2023"
                        projectName="Intelligent Job Scheduler in Kubernates"
                        location="CMU, Pittsburgh, PA"
                        description={[
                            'Implemented a Kubernates job scheduler (Go) using Kube Batch for randomly arriving jobs with different scheduling preferences.',
                            'Deployed on a multi-rack data cluster consisting of heterogeneous hardwares, and achieved more than 3 times improvements compared to default scheduler in terms of average job completion time.'
                        ]}
                        iconColor='#013E41'
                    ></ProjectItem>
                    <ProjectItem
                        time="April 2023"
                        projectName="Apache Spark Interative Machine Learning Training"
                        location="CMU, Pittsburgh, PA"
                        description={[
                            'Developed a distributed logistic regression algorithm (Python) in Apache Spark that leverages sparse linear algebra and join-basedcommunication between distributed dataset.',
                            'Deployed on a cluster of 16 nodes and trained excessively huge models within reasonable time limits.'
                        ]}
                        iconColor='#8D91AA'
                    ></ProjectItem>
                    <ProjectItem
                        time="March 2023"
                        projectName="AWS Auto-Scaling Design"
                        location="CMU, Pittsburgh, PA"
                        description={[
                            'Designed an AWS auto-scaling controller (deployed via Terraform) that automatically collects work load metrics and adjust the number of running EC2 instances.',
                            'The controller increases aggregate request processing speed by twice, while decreases the aggregate EC2 cost by 7%.'
                        ]}
                        iconColor='#D8B0B0'
                    ></ProjectItem>
                    <ProjectItem
                        time="November 2022"
                        projectName="Santorini Game Development"
                        location="CMU, Pittsburgh, PA"
                        description={[
                            'Developed a board game called Santorini, using Java for backend, and Typescript & ReactJS for frontend.',
                            'Designed HTTP-based RESTful APIs between backend and frontend to achieve low-coupling and high cohesion of the entire program.',
                            'Deviced flexible framework interface in backend that allows users to add their own card plugins by implementing just a few lines of codes.'
                        ]}
                        iconColor='#A2886D'
                    ></ProjectItem>
                </div>
            </div>
        );
    }
}

export default Projects;