import React from "react";

interface Props {
    id?: string;
    name: string;
    clickHandler: React.MouseEventHandler;
};

class Button extends React.Component<Props> {
    render(): React.ReactNode {
        let button_id = "";
        if (this.props.id) {
            button_id = this.props.id;
        }
        return (
            <button type="button" 
                    id={button_id}
                    className="btn btn-secondary" 
                    onClick={this.props.clickHandler}>
                {this.props.name}
            </button>
        );
    }
}

export default Button;