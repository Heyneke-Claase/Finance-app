// src/components/WhyUsSection.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const features = [
  { delay: "0", icon: "bi-lightning-charge-fill", title: "Fast Applications", text: "Quick online form and assessment process." },
  { delay: "100", icon: "bi-sliders", title: "Flexible Options", text: "Choose loan amounts and terms that fit." },
  { delay: "200", icon: "bi-shield-check", title: "NCR Compliant", text: "Registered and responsible lending practices." },
  { delay: "300", icon: "bi-calculator", title: "Transparent Costs", text: "Clear information on interest and fees." }
];

function WhyUsSection() {
  return (
    <section id="why-us" className="py-5 bg-light-subtle">
      <Container>
        <h2 className="text-center mb-5 fw-bold" data-aos="fade-up">Why Choose Us?</h2>
        <Row className="text-center justify-content-center">
          {features.map((feature, index) => (
            <Col md={4} lg={3} key={index} className="mb-4" data-aos="fade-up" data-aos-delay={feature.delay}>
              <div className="icon-box-alt bg-white shadow-sm p-4 rounded mb-3">
                <i className={`bi ${feature.icon} text-primary display-6`}></i>
              </div>
              <h4 className="fw-bold fs-6">{feature.title}</h4>
              <p className="text-muted small px-2">{feature.text}</p>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default WhyUsSection;