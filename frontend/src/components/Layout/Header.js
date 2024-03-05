import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';

export default function Carousels() {
    return (
        <div style={{ display: 'block', padding: 30 }}>
            <h4>Welcome to Exodus Crowdfunding Platform</h4>
            <h6>Some of the causes we provide to</h6>
            <Carousel>
                <Carousel.Item interval={1500}>
                    <img
                        className="d-block w-100 h-25"
                        src="https://greensheenpaint.com/wp-content/uploads/splash_v10_1920x630.jpg"
                        alt="ImageOne"
                    />
                    <Carousel.Caption>
                        <h3>Promoting Liberal Arts</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img
                        className="d-block w-100 h-25"
                        src="https://www.vfnlaw.com/wp-content/uploads/pa-landing-1.jpg"
                        alt="ImageTwo"
                    />
                    <Carousel.Caption>
                        <h3>Energy Conservation</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img
                        className="d-block w-100 h-25"
                        src="https://greensheenpaint.com/wp-content/uploads/splash_trees_v1_1920x630.jpg"
                        alt="ImageThree"
                    />
                    <Carousel.Caption>
                        <h3>Preservation of Forests</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img
                        className="d-block w-100 h-25"
                        src="https://magazine.lacsq.org/wp-content/uploads/2021/01/1920x630_virus.jpg"
                        alt="ImageFour"
                    />
                    <Carousel.Caption>
                        <h3>Advanced Viral Studies</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <h4 className='mt-3'>Our Vision</h4>
            <p>At the dawn of the 21st century, humanity stands at a crossroads. We are confronted by challenges that transcend borders and threaten the very fabric of our existence. Climate change looms large, casting a shadow over our future. Social and economic inequalities widen, breeding discontent and despair. The very systems that once propelled us forward now seem to falter, demanding new solutions and innovative approaches. It is in this climate of uncertainty that Exodus Crowdfunding Inc. rises, a beacon of hope and a catalyst for change. We are not just a platform; we are a movement, a community of passionate individuals united by a common purpose: to empower grassroots initiatives, champion progressive causes, and collectively forge a brighter future for all.</p>
            <h4 className='mt-3'>Our Mission</h4>
            <p>Exodus Crowdfunding Inc. exists to empower individuals and communities to become the architects of positive change. We achieve this by:
                <ul style={{ listStyleType: "none" }}>
                    <li><b>Providing a platform for impactful crowdfunding :</b> We connect passionate individuals with causes they care about, enabling them to directly contribute to solutions and make a tangible difference.</li>
                    <li><b>Championing progressive causes :</b> We focus on causes that address the most pressing challenges of our time, from environmental sustainability and social justice to scientific advancement and mental health awareness.</li>
                    <li><b>Fostering innovation and collaboration :</b> We encourage creative solutions and collaborative efforts, bringing together diverse voices and perspectives to tackle complex issues.</li>
                    <li><b>Building a global community of changemakers :</b> We create a supportive space where individuals can connect, share ideas, and inspire each other to take action.</li>
                </ul>
            </p>
            <h4 className='mt-3'>Join Us & Donate</h4>
            <p>Join us on this journey! Become part of the Exodus Crowdfunding Inc. community and make your contribution to a better world. Together, we can create a future where everyone has the opportunity to thrive.</p>
        </div>
    );
}


