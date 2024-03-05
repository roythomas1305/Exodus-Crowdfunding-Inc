import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Contact = () => {
  return (
    <Container className="my-5 py-4">
      <h1>Get in Touch</h1>
      <p>We're here to answer your questions and connect you with opportunities
        to make a difference. Feel free to reach out!</p>
      <Row className="mt-5">
        <Col md={6}>
          <h4>Phone Number</h4>
          <p>+91 95887 19633</p>
        </Col>
        <Col md={6}>
          <h4>Email Addresses</h4>
          <p>
            For general inquiries: <a href="mailto:info@exoduscfd.in">info@exoduscfd.in</a>
            <br />
            For administrative support: <a href="mailto:admin@exoduscfd.in">admin@exoduscfd.in</a>
          </p>
        </Col>
      </Row>


    </Container>
  );
};

export default Contact;


