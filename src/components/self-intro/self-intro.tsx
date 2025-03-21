import React from 'react';
import './self-intro.css';

interface Props {
    // TODO
};

class SelfIntro extends React.Component<Props> {
    render(): React.ReactNode  {
        return (
            <div className="container-fluid p-0" id='selfIntro' style={{marginTop: 80}}>
                <div className='container-xxl d-flex flex-column flex-xl-row p-0 align-items-center justify-content-center'>
                    <div className='col-xl-7 self-intro-text fs-6' style={{paddingLeft: 30, paddingRight: 80, paddingTop: 25, paddingBottom: 25}}>
                        Hi, I'm Chenfei Lou. You can also call me Mike. <br/>
                        I obtained my becholar's degree in Electrical and Computer Engineering from Shanghai Jiao Tong 
                        University, China. 
                        I'm currently a Carnegie Mellon University Master Student majoring in Electrical and Computer Engineering, 
                        and focusing on software system design and development. I'm determined to become a full-stack
                        software development engineer, and my dream is to establish my own software company someday in 
                        the future (really an ambitious dream though XD). <br/>
                        I have many hobbies, including badminton, fitness, magic cube, swimming and, above all, travelling! 
                        I've travelled to many places. The only continent that I've not put my footprint on is the Antarctica. 
                        I love travelling because it helps me to embrace different cultures and traditions. Sometimes it's 
                        so astonishing and fascinating to see that lives are so radically different in different places, but 
                        after digging in to explore the historical and cultural reasons behind, those specific life styles 
                        that look weird first suddenly become so logical and wise. That's why I believe travelling is one of 
                        the most intelligent teacher. <br/>
                    </div>
                    <div className='col-xl-5 position-relative' id='self-intro-image'>
                        <div className='position-absolute w-100 h-100' id='background-blur'></div>
                        <img src={'images/profile-9.JPG'} width={'100%'}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default SelfIntro;