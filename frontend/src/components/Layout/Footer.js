import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <footer className="bg-dark text-light py-3 mt-auto mb-0">
            <Container>
                <Row>
                    <Col>
                        <img src='https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/67380/anchor-and-ship-wheel-clipart-xl.png' alt='kgml' fluid style={{ height: "100px", width: "100px" }}></img>
                        <h4>Exodus Crowdfunding Inc.</h4>
                        <p>&copy; 2024 Exodus Crowdfunding Inc. All rights reserved.</p>
                    </Col>
                    <Col className="text-right">
                        <a href="https://www.facebook.com/" className="text-light me-2">
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                        <a href="https://twitter.com/" className="text-light me-2">
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                        <a href="https://www.instagram.com/" className="text-light me-2">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a href="https://www.linkedin.com/" className="text-light">
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                        <hr></hr>
                        <h6>Contact</h6>
                        <p>+91 95887 19633</p>
                        <p>info@exoduscfd.in</p>
                        <p>admin@exoduscfd.in</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;



