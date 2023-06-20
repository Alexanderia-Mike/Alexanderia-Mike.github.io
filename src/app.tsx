import React from 'react';

import Header from './components/header/header';
import Profile from './components/profile/profile';
import SelfIntro from './components/self-intro/self-intro';
import Footer from './components/footer/footer';

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
                <Footer></Footer>
            </div>
        );
    }
}

export default App;