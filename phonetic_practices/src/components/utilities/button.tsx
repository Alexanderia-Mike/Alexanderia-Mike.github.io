import React from "react";

interface Props {
    id?: string;
    inline?: boolean;
    className?: string;
    name: string;
    clickHandler: React.MouseEventHandler;
};

class Button extends React.Component<Props> {
    render(): React.ReactNode {
        let button_id = this.props.id ? this.props.id : "";
        let class_name = this.props.inline ? "" : "row";
        class_name += this.props.className ? " " + this.props.className : "";
        return (
            <button type="button" 
                    id={button_id}
                    className={"btn btn-secondary " + class_name}
                    onClick={this.props.clickHandler}>
                {this.props.name}
            </button>
        );
    }
}

export default Button;