import React from "react";
import SectionHeader from "../common/sectionHeader";
import ExperiencesItem from "./experiencesItem";

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
                <div className="pt-4 row justify-content-center">
                    <ExperiencesItem
                        imageUrl='images/amazon.jpeg'
                        title='Intern Software Development Engineer'
                        time='May 2023 - Aug 2023'
                        location='Amazon.com Inc, Seattle, WA'
                        descriptions={[
                            'Directed the design of backend database structures and GraphQL queries for Homepage Outfit Recommendation widget.',
                            'Implemented frontend user interface (Typescript) of the widget.',
                            'Led A/B testing on different interactive modes of the widget.'
                        ]}
                        link='https://www.aboutamazon.com/'
                        linkText='Amazon.com Inc Website'
                    ></ExperiencesItem>
                    <ExperiencesItem
                        imageUrl='images/bianjie.png'
                        title='Intern Federated Learning Algorithm Engineer'
                        time='May 2021 - Aug 2021'
                        location='Bianjie.AI, Shanghai, China'
                        descriptions={[
                            'Initiated research projects upon federated learning algorithm for 4 model types and hundreds of hyperparameter settings.',
                            'Created a federated learning SDK (Python) as a core module in company\'s final product.'
                        ]}
                        link='https://www.bianjie.ai/en/'
                        linkText='Bianjie.AI Company Website'
                    ></ExperiencesItem>
                    <ExperiencesItem
                        imageUrl='images/smec.jpg'
                        title='Intern IGBT Department Engineer'
                        time='Aug 2020 - Sept 2020'
                        location='SMEC, Shaoxing, Zhejiang, China'
                        descriptions={[
                            'Inspected the surface defects of wafers and verified the possible reasons based on the collected data and over 10 related academic essays.',
                            'delivered a 20-minute presentation proposing suggestions of surface defects, which brought 20% improvements on wafers yield.'
                        ]}
                        link='https://www.smecs.com/'
                        linkText='SMEC Company Website'
                    ></ExperiencesItem>
                </div>
            </div>
        );
    }
}

export default Experiences;