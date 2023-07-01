import React from "react";
import SectionHeader from "../common/sectionHeader";
import ResearchItem from "./researchItem";

interface Props {
    // TODO
};

class Research extends React.Component<Props> {
    render(): React.ReactNode {
        return (
            <div id="Researches" style={{paddingTop: 60, paddingBottom: 60, backgroundColor: "#D2D3D590"}}>
                <SectionHeader
                    imageUrl="images/research-header.png"
                ></SectionHeader>
                {/* 999999 */}
                <div className="pt-4 row justify-content-center">
                    <ResearchItem
                        imageUrl='images/icml.png'
                        title='Deep Neural Network Fusion via Graph Matching with Applications to Model Ensemble and Federated Learning'
                        time='Proceedings of the 39th International Conference on Machine Learning, PMLR (2022)'
                        location='ThinkLab, Shanghai Jiao Tong University, China'
                        locationLink="https://thinklab.sjtu.edu.cn/"
                        abstract='Model fusion without accessing training data in machine learning has attracted increasing interest due 
                        to the practical resource-saving and data privacy issues. During the training process, the neural weights of each 
                        model can be randomly permuted, and we have to align ...'
                        link='https://proceedings.mlr.press/v162/liu22k.html'
                        linkText='Go to the paper link'
                    ></ResearchItem>
                    <ResearchItem
                        imageUrl='images/aaai.png'
                        title='Predictive Exit: Prediction of Fine-Grained Early Exits for Computation- and Energy-Efficient Inference'
                        time='Proceedings of the 37th AAAI Conference on Artificial Intelligence (2022)'
                        location='Shanghai Jiao Tong University, China'
                        abstract='By adding exiting layers to the deep learning networks, early exit can terminate the inference earlier 
                        with accurate results. However, the passive decision-making of whether to exit or continue the next layer has to 
                        go through every pre-placed exiting layer until it exits ...'
                        link='https://ojs.aaai.org/index.php/AAAI/article/view/26042'
                        linkText='Go to the paper link'
                    ></ResearchItem>
                    <ResearchItem
                        imageUrl='images/iscas.png'
                        title='Quantified Satisfiability-based Simultaneous Selection of Multiple Local Approximate Changes under Maximum Error Bound'
                        time='IEEE International Symposium on Circuits and Systems, ISCAS (2022)'
                        location='ECTL, Shanghai Jiao Tong University, China'
                        locationLink="https://umji.sjtu.edu.cn/~wkqian/people.html"
                        abstract='Approximate computing is an emerging low-power design technique for error-tolerant applications. One key 
                        enabling technique for approximate circuit design is approximate logic synthesis (ALS). Many ALS methods are based 
                        on a scheme that iteratively selects one ...'
                        link='https://ieeexplore.ieee.org/abstract/document/9937529'
                        linkText='Go to the paper link'
                    ></ResearchItem>
                </div>
            </div>
        );
    }
}

export default Research;