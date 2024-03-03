import React from 'react';

import AudioGenerator from './components/audio-generator/audioGenerator';
import AudioPanel from './components/audio-generator/audioPanel';

interface Props {
}

class App extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }
    
    componentDidMount(): void {}

    render(): React.ReactNode {
        return <AudioPanel></AudioPanel>;
    }
}

export default App;