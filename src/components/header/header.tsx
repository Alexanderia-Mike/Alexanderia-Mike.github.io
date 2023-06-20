import React from 'react';
import "./header.css";

interface Props {
    // TODO
}

class Header extends React.Component<Props> {
    render(): React.ReactNode {
        return (
            <div className="container-fluid col-10 mb-5" style={{backgroundColor: "#D7D6D100"}}>
                <header className="d-flex flex-wrap flex-wrap justify-content-center py-3 mb-4">
                    <a href="index.html" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                        <img className="bi me-2" height="60" src={'images/logo.png'}/>
                        {/* <span className="fs-4">Preface</span> */}
                    </a>

                    <ul className="nav nav-pills">
                        <li className="nav-item"><a href="#" className="nav-link active" aria-current="page">Home</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">Features</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">Pricing</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">FAQs</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">About</a></li>
                    </ul>
                </header>
            </div>
        );
    }
}

export default Header;