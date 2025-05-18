// src/components/HeroSection.js
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function HeroSection() {
  return (
    <section id="hero" className="hero-section text-center text-lg-start">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} data-aos="fade-right">
            <h1 className="display-4 fw-bold mb-3">
              Fast Online Loans from R500 to R8,000
            </h1>
            <p className="lead mb-4">
              Get the cash you need quickly and easily. Simple online application, responsible lending. <br />
              Registered Credit Provider NCRCPXXXXX.
            </p>
            <Button
              href="#apply"
              variant="accent"
              size="lg"
              className="fw-bold me-2 mb-2 mb-lg-0 btn-accent"
            >
              Apply Online
            </Button>
            <Button
              href="#calculator"
              variant="outline-primary"
              size="lg"
              className="fw-bold mb-2 mb-lg-0"
            >
              Use Calculator
            </Button>
          </Col>

          <Col lg={6} className="text-center" data-aos="fade-left" data-aos-delay="100">
            <picture>
              <source srcSet="/loan.webp" type="image/webp" />
              <img
                src="/loan.jpg"
                alt="Online Loan Application"
                className="img-fluid rounded hero-image"
                width="1200"
                height="800"
                loading="eager"
                decoding="async"
                fetchpriority="high"
              />
            </picture>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default HeroSection;
