import React, { ChangeEventHandler } from "react";

interface Props {
    options: string[];
    default_option?: string;
    className?: string;
    onChange?: ChangeEventHandler<HTMLSelectElement>;
};

class Dropdown extends React.Component<Props> {
    render(): React.ReactNode {
        const options = this.props.options.map(
            (option, idx) => {
                return (
                    <option 
                        key={idx}
                        value={option}
                    >
                        {option}
                    </option>
                );
            }
        );

        const extra_classes = this.props.className || "";
        return (
            <select 
                className={"form-select " + extra_classes} 
                id="floatingSelect" 
                aria-label="Floating label select"
                defaultValue={this.props.default_option}
                onChange={this.props.onChange}
            >
                {options}
            </select>
        );
    }
}

export default Dropdown;