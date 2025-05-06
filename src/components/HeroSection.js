// src/components/HeroSection.js
import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
// Make sure loan.jpg is in your public folder or import it
// import loanImg from '../assets/loan.jpg'; // if in src/assets

function HeroSection() {
  return (
    <section id="hero" className="hero-section text-center text-lg-start">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} data-aos="fade-right">
            <h1 className="display-4 fw-bold mb-3">Fast Online Loans from R500 to R8,000</h1>
            <p className="lead mb-4">
              Get the cash you need quickly and easily. Simple online application, responsible lending. <br />
              Registered Credit Provider NCRCPXXXXX.
            </p>
            <Button href="#apply" variant="accent" size="lg" className="fw-bold me-2 mb-2 mb-lg-0 btn-accent">
              Apply Online
            </Button>
            <Button href="#calculator" variant="outline-primary" size="lg" className="fw-bold mb-2 mb-lg-0">
              Use Calculator
            </Button>
          </Col>
          <Col lg={6} className="text-center" data-aos="fade-left" data-aos-delay="100">
            {/* If loan.jpg is in public folder: */}
            <Image src="/loan.jpg" fluid rounded className="hero-image" alt="Online Loan Application" />
            {/* If imported: <Image src={loanImg} fluid rounded className="hero-image" alt="Online Loan Application" /> */}
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default HeroSection;