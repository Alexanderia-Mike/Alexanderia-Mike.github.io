import React from 'react';

import Header from './components/header/header';
import Profile from './components/profile/profile';

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
            </div>
        );
    }
}

export default App;