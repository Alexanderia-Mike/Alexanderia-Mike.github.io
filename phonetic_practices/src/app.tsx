import React from 'react';

import AudioGenerator from './components/audio-generator/audioGenerator';

interface Props {
}

class App extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }
    
    componentDidMount(): void {}

    render(): React.ReactNode {
        return <AudioGenerator></AudioGenerator>;
    }
}

export default App;