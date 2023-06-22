import React from 'react';
import "./header.css";

interface NavItemProps {
    active: boolean;
    text: string;
    clickHandler: React.MouseEventHandler;
};

interface Props {
    // TODO
};

interface State {
    activeNavItem: string;
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

class Header extends React.Component<Props, State> {
    private static readonly defaultNavItemName: string = 'Home';

    constructor(props: Props) {
        super(props);
        this.state = {
            activeNavItem: Header.defaultNavItemName
        };
    }

    createNavItem(itemName: string, activeNavItem: string, clickHandler: React.MouseEventHandler): React.ReactNode {
        return (
            <NavItem
                active={itemName == activeNavItem}
                text={itemName}
                clickHandler={clickHandler}
            />
        );
    }

    private clickHandlerGenerator = (itemName: string) => {
        let clickHandler = (e: React.MouseEvent) => {
            // e.preventDefault();
            this.setState({
                activeNavItem: itemName
            });
        }
        return clickHandler;
    }

    render(): React.ReactNode {
        let navItemList: string[] = [Header.defaultNavItemName, 'Education', 'Projects', 'Experiences', 'Researches', 'Publications'];
        return (
            <div className="container-xxl col-10 mb-5" style={{backgroundColor: "#D7D6D100"}}>
                <header className="d-flex flex-wrap flex-wrap justify-content-center py-3 mb-4">
                    <a href="index.html" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                        <img className="bi me-2" height="60" src={'images/logo.png'}/>
                    </a>

                    <ul className="nav nav-pills">
                        {navItemList.map((itemName, i) => 
                            this.createNavItem(itemName, this.state.activeNavItem, this.clickHandlerGenerator(itemName)))}
                    </ul>
                </header>
            </div>
        );
    }
}

export default Header;