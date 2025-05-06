// src/components/FAQSection.js
import React from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';

const faqs = [
  {
    eventKey: "0",
    header: "How much can I borrow and for how long?",
    body: "We offer loans from R500 up to R8,000, depending on your affordability assessment. Repayment terms range from 1 month up to 6 months for these short-term loans. Use our loan calculator for an estimate."
  },
  {
    eventKey: "1",
    header: "What do I need to apply?",
    body: "You need to be 18+, have a valid SA ID, a South African bank account, and proof of regular income (payslip, bank statements showing income, or proof of grant/pension)."
  },
  {
    eventKey: "2",
    header: "Are you registered with the NCR?",
    body: "Yes, we are a registered Credit Provider with the National Credit Regulator (NCR). Our registration number is NCRCPXXXXX. We adhere strictly to the National Credit Act."
  }
];

function FAQSection() {
  return (
    <section id="faq" className="py-5">
      <Container data-aos="fade-up">
        <h2 className="text-center mb-4 fw-bold">Frequently Asked Questions</h2>
        <Row className="justify-content-center">
          <Col md={9} lg={8}>
            <Accordion id="faqAccordion">
              {faqs.map((faq) => (
                <Accordion.Item eventKey={faq.eventKey} key={faq.eventKey}>
                  <Accordion.Header id={`heading${faq.eventKey}`}>{faq.header}</Accordion.Header>
                  <Accordion.Body>
                    {faq.body}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default FAQSection;