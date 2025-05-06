// src/components/TestimonialsSection.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const testimonials = [
  { delay: "0", stars: 5, text: "\"Simple online process and quick payout. Really helped me out when I was in a bind.\"", author: "Andile M.", location: "Eastern Cape" },
  { delay: "100", stars: 4.5, text: "\"The calculator was accurate and helped me budget. Fair terms and good service.\"", author: "Sarah J.", location: "Gauteng" },
  { delay: "200", stars: 5, text: "\"Professional service and they explained everything clearly. Definitely recommend them.\"", author: "David K.", location: "KZN" }
];

const renderStars = (numStars) => {
  let stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= numStars) {
      stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
    } else if (i - 0.5 === numStars) {
      stars.push(<i key={i} className="bi bi-star-half text-warning"></i>);
    } else {
      stars.push(<i key={i} className="bi bi-star text-warning"></i>); // Or bi-star for empty
    }
  }
  return stars;
};

function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-5 bg-light-subtle">
      <Container data-aos="fade-up">
        <h2 className="text-center mb-4 fw-bold">What Our Customers Say</h2>
        <Row>
          {testimonials.map((testimonial, index) => (
            <Col md={4} key={index} className="mb-3" data-aos="fade-up" data-aos-delay={testimonial.delay}>
              <Card className="h-100 shadow-sm testimonial-card-alt">
                <Card.Body>
                  <div className="mb-2">{renderStars(testimonial.stars)}</div>
                  <p className="fst-italic">{testimonial.text}</p>
                </Card.Body>
                <Card.Footer className="bg-transparent border-0 pt-0">
                  <small className="fw-bold">{testimonial.author}</small>
                  <small className="text-muted"> - {testimonial.location}</small>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default TestimonialsSection;