import React from 'react';
import { InView } from "react-intersection-observer";
import "./header.css";

interface NavItemProps {
    active: boolean;
    text: string;
    clickHandler: React.MouseEventHandler;
};

interface Props {
    nav_items: string[];
    in_views: boolean[];
};

class NavItem extends React.Component<NavItemProps> {
    render(): React.ReactNode {
        let className: string = "nav-link overwrite ";
        if (this.props.active) {
            className += "active";
        }
        let link: string;
        if (this.props.text == 'Home')
            link = 'index.html';
        else
        link = '#' + this.props.text;
        return (
            <li className="nav-item">
                <a href={link} onClick={this.props.clickHandler} className={className} aria-current="page">
                    {this.props.text}
                </a>
            </li>
        );
    }
}

class Header extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    createNavItem(itemName: string, is_active: boolean, clickHandler: React.MouseEventHandler): React.ReactNode {
        return (
            <NavItem
                active={is_active}
                text={itemName}
                clickHandler={clickHandler}
            />
        );
    }

    render(): React.ReactNode {
        return (
            <div className='w-100 sticky-top' style={{backgroundColor: "#F1F1F1"}}>
                <div className="container-xxl col-12 mb-5">
                    <header className="d-flex flex-wrap flex-wrap justify-content-center py-3 mb-4">
                        <a href="index.html" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                            <img className="bi me-2" height="60" src={'images/logo.png'}/>
                        </a>

                        <ul className="nav nav-pills">
                            {this.props.nav_items.map((itemName, i) => 
                                this.createNavItem(itemName, this.props.in_views[i], () => {}))}
                        </ul>
                    </header>
                </div>
            </div>
        );
    }
}

export default Header;