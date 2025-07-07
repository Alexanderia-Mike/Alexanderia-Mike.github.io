import React from 'react'
import { Linkedin, Github, Instagram, Facebook } from 'react-bootstrap-icons'

interface Props {
    // TODO
}

class Footer extends React.Component<Props> {
    render(): React.ReactNode {
        return (
            <div className="container-xxl">
                <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4">
                    <div className="col-md-4 d-flex align-items-center">
                        <a
                            href="index.html"
                            className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
                        >
                            <img
                                className="bi me-2"
                                height="40"
                                src={'images/logo.png'}
                            />
                        </a>
                        {/* <span className="mb-3 mb-md-0 text-body-secondary">&copy; Chenfei Lou</span> */}
                    </div>

                    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                        <li className="ms-3">
                            <a
                                className="text-body-secondary"
                                href="https://www.linkedin.com/in/mike-lou/"
                            >
                                <Linkedin size={30} />
                            </a>
                        </li>
                        <li className="ms-3">
                            <a
                                className="text-body-secondary"
                                href="https://www.github.com/Alexanderia-Mike"
                            >
                                <Github size={30} />
                            </a>
                        </li>
                        <li className="ms-3">
                            <a
                                className="text-body-secondary"
                                href="https://www.instagram.com/chenfeilou/"
                            >
                                <Instagram size={30} />
                            </a>
                        </li>
                        <li className="ms-3">
                            <a
                                className="text-body-secondary"
                                href="https://www.facebook.com/profile.php?id=100090004454027"
                            >
                                <Facebook size={30} />
                            </a>
                        </li>
                    </ul>
                </footer>
            </div>
        )
    }
}

export default Footer
