import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandFist } from '@fortawesome/free-solid-svg-icons';

const Info = () => {
    return (
        <Container className="my-5 py-4">
            <Row className="align-items-center">
                <Col md={12}>
                    <h1>Empowering Changemakers, Catalyzing Solutions</h1>
                    <p>
                        Exodus Crowdfunding Inc. is your platform to make a tangible impact on
                        causes you care about. We connect passionate individuals with
                        progressive initiatives tackling the most pressing challenges of our time:
                    </p>
                    <ul style={{ listStyleType: "none" }}>
                        <li>Promoting Liberal Arts for critical thinking and creativity.</li>
                        <li>Championing Energy Conservation for a sustainable future.</li>
                        <li>Protecting Forests for clean air, water, and biodiversity.</li>
                        <li>Funding Advanced Viral Studies for health and well-being.</li>
                        <li>Combating Global Warming for a livable planet.</li>
                        <li>Preventing Suicide for mental health awareness and support.</li>
                    </ul>
                    <Button variant="dark" href="/">
                        <FontAwesomeIcon icon={faHandFist} /> Join the Movement
                    </Button>
                </Col>
            </Row>

            <Row className="mt-5">
                <Col>
                    <h2 className="text-center">Our Core Values</h2>
                </Col>
                <Row className="mt-3">
                    {coreValues.map((value, index) => (
                        <Col key={index} xs={12} md={4} className="mb-4">
                            <Card className="h-100">
                                <Card.Body>
                                    <h4>{value.title}</h4>
                                    <p>{value.description}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Row>
        </Container>
    );
};

const coreValues = [
    {
        title: 'Empowerment',
        icon: 'fa-hands-helping',
        description: 'Every individual has the potential to make a difference. We provide the tools and resources to turn your passion into action.',
    },
    {
        title: 'Impact',
        icon: 'fa-bullseye',
        description: 'We focus on causes with the potential to create real, positive change in the world, driving meaningful progress.',
    },
    {
        title: 'Transparency',
        icon: 'fa-eye',
        description: 'We believe in open communication and accountability, fostering trust and fostering community growth.',
    },
    {
        title: 'Inclusivity',
        icon: 'fa-users',
        description: 'We celebrate diversity and welcome all perspectives. Together, we create a more equitable and just world.',
    },
    {
        title: 'Sustainability',
        icon: 'fa-globe',
        description: 'We strive for a long-lasting platform that empowers change for generations to come, ensuring a brighter future for all.',
    },
    {
        title: 'Collaboration',
        icon: 'fa-seedling',
        description: 'We encourage creative solutions and collaborative efforts, bringing together diverse voices to tackle complex challenges.',
    },
];

export default Info;



