// src/components/AppFooter.js
import React, { useState } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';

function AppFooter() {
  const currentYear = new Date().getFullYear();
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  return (
    <>
      <footer id="contact" className="footer-section bg-dark text-white pt-5 pb-4">
        <Container>
          <Row>
            <Col md={4} className="mb-4">
              <h5 className="fw-bold text-white mb-3">YourBrand Loans</h5>
              <p className="small text-white-50">
                Providing accessible and responsible online loans across South Africa. Committed to transparency and customer service.
              </p>
              <p className="small text-white-50 mb-0">Registered Credit Provider NCRCPXXXXX</p>
            </Col>
            <Col md={3} className="mb-4">
              <h5 className="fw-bold text-white mb-3">Quick Links</h5>
              <ul className="list-unstyled small footer-links">
                <li><a href="#calculator">Calculator</a></li>
                <li><a href="#process">How It Works</a></li>
                <li><a href="#apply">Apply Now</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li>
                  <a href="#terms" onClick={(e) => { e.preventDefault(); setShowTermsModal(true); }}>
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#privacy" onClick={(e) => { e.preventDefault(); setShowPrivacyModal(true); }}>
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </Col>
            <Col md={4} className="mb-4 ms-md-auto">
              <h5 className="fw-bold text-white mb-3">Contact Us</h5>
              <ul className="list-unstyled small footer-links">
                <li><i className="bi bi-telephone-fill me-2"></i> <a href="tel:+27101234567">010 123 4567</a></li>
                <li><i className="bi bi-envelope-fill me-2"></i> <a href="mailto:support@yourbrand.co.za">support@yourbrand.co.za</a></li>
                <li><i className="bi bi-info-circle-fill me-2"></i> <span className="text-white-50">Mon-Fri: 8:00 AM - 5:00 PM</span></li>
              </ul>
            </Col>
          </Row>
          <hr className="border-light opacity-25 my-4" />
          <p className="text-center small text-white-50 mb-0">
            &copy; {currentYear} YourBrand Loans (Pty) Ltd. All Rights Reserved.
          </p>
        </Container>
      </footer>

      {/* Terms Modal */}
      <Modal show={showTermsModal} onHide={() => setShowTermsModal(false)} size="lg" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Terms & Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Placeholder for Terms and Conditions...</p>
          {/* Add your detailed terms here */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTermsModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Privacy Modal */}
      <Modal show={showPrivacyModal} onHide={() => setShowPrivacyModal(false)} size="lg" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Privacy Policy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Placeholder for Privacy Policy...</p>
          {/* Add your detailed privacy policy here */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPrivacyModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AppFooter;