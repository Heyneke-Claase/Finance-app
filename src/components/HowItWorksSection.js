// src/components/HowItWorksSection.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const steps = [
  {
    delay: "0",
    icon: "bi-pencil-square",
    title: "Apply Online",
    text: "Complete our quick and secure online application form in minutes."
  },
  {
    delay: "100",
    icon: "bi-check2-circle",
    title: "Get Assessed",
    text: "We perform a quick, responsible credit assessment based on NCR guidelines."
  },
  {
    delay: "200",
    icon: "bi-cash-coin",
    title: "Receive Funds",
    text: "Once approved, the cash is deposited directly into your bank account."
  }
];

function HowItWorksSection() {
  return (
    <section id="process" className="py-5">
      <Container>
        <h2 className="text-center mb-5 fw-bold" data-aos="fade-up">Get Your Loan in 3 Easy Steps</h2>
        <Row className="text-center">
          {steps.map((step, index) => (
            <Col md={4} key={index} className="mb-4" data-aos="fade-up" data-aos-delay={step.delay}>
              <div className="step-icon mb-3 mx-auto">
                <i className={`bi ${step.icon} display-4 text-primary`}></i>
                <span className="step-number">{index + 1}</span>
              </div>
              <h4 className="fw-bold fs-5">{step.title}</h4>
              <p className="text-muted px-3 small">{step.text}</p>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default HowItWorksSection;