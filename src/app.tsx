import React from 'react';

import Header from './components/header/header';
import Profile from './components/profile/profile';
import SelfIntro from './components/self-intro/self-intro';
import Footer from './components/footer/footer';
import Education from './components/education/education';
import Projects from './components/projects/projects';
import Experiences from './components/experiences/experiences';
import Research from './components/research/research';
import Contact from './components/contact/contact';

interface Props {
}

class App extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }
    
    componentDidMount(): void {}

    render(): React.ReactNode {
        return (
            <div>
                <Header></Header>
                <Profile></Profile>
                <SelfIntro></SelfIntro>
                <Education></Education>
                <Projects></Projects>
                <Experiences></Experiences>
                <Research></Research>
                <Contact></Contact>
                <Footer></Footer>
            </div>
        );
    }
}

export default App;