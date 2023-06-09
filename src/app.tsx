import React from 'react';

/**
 * Define the type of the props field for a React component
 */
interface Props {
}

class App extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }
    
    componentDidMount(): void {}

    render(): React.ReactNode {
        return (
            <div></div>
        );
    }
}

export default App;