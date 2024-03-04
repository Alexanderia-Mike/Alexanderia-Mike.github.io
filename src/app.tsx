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
import PhoneticIcon from './components/phonetic/phoneticIcon';
import { InView } from 'react-intersection-observer';

interface Props {
}

interface States {
    in_views: boolean[];
}

class App extends React.Component<Props, States> {
    private static readonly defaultNavItemName: string = 'Home';
    private static navItemList: string[] = [
        App.defaultNavItemName, 
        'Education', 
        'Projects', 
        'Experiences', 
        'Researches', 
        'Contact'
    ];

    constructor(props: Props) {
        super(props);
        this.state ={
            in_views: App.navItemList.map(_ => false)
        };
    }
    
    componentDidMount(): void {}

    scrollChangeHandlerFactory(idx: number) {
        return (in_view: boolean) => {
            let in_views = this.state.in_views;
            in_views[idx] = in_view;
            this.setState({
                ...this.state,
                in_views: in_views
            });
        };
    }

    render(): React.ReactNode {
        let elements = [
            <div>
                <Profile></Profile>
                <SelfIntro></SelfIntro>
            </div>,
            <Education></Education>,
            <Projects></Projects>,
            <Experiences></Experiences>,
            <Research></Research>,
            <Contact></Contact>
        ]
        return (
            <div>
                <Header
                    nav_items={App.navItemList}
                    in_views={this.state.in_views}
                ></Header>,
                {elements.map((elmt, idx) => (
                    <InView
                        onChange={this.scrollChangeHandlerFactory(idx)}
                        threshold={0.2}
                    >
                        {elmt}
                    </InView>
                ))}
                <Footer></Footer>
                <PhoneticIcon></PhoneticIcon>
            </div>
        );
    }
}

export default App;