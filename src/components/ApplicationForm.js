// src/components/ApplicationForm.js
import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Modal, Spinner } from 'react-bootstrap';

function ApplicationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    email: '',
    phone: '',
    desiredAmount: '',
    desiredTerm: '',
    employmentStatus: '',
    termsAccepted: false,
  });
  const [attachment, setAttachment] = useState(null);
  const [validated, setValidated] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState({ type: '', text: '' });


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    if (form.checkValidity() === false || !formData.termsAccepted) {
      setValidated(true);
      return;
    }
    setValidated(true);
    setIsSubmitting(true);
    setSubmissionMessage({ type: '', text: '' });


    const data = new FormData();
    // In server.js, it expects 'first-name' and 'last-name'
    // Splitting fullName for this example, adjust as needed
    const nameParts = formData.fullName.split(' ');
    data.append('first-name', nameParts[0] || '');
    data.append('last-name', nameParts.slice(1).join(' ') || '');
    data.append('id-number', formData.idNumber);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('loan-amount', formData.desiredAmount);
    data.append('repayment-period', formData.desiredTerm);
    data.append('employment-status', formData.employmentStatus);
    // The server expects 'monthly-income', which is not in the original HTML form.
    // Add it here if needed, or adjust server.js
    // data.append('monthly-income', formData.monthlyIncome || '0'); 
    if (attachment) {
      data.append('documents', attachment); // server.js expects 'documents' (as an array)
    }
    // termsAccepted is not typically sent to backend, but used for client-side validation

    // The endpoint in your script.js is /api/submit-loan,
    // but in server.js it's /api/applications
    const serverUrl = '/api/applications'; // Assuming proxy is set up or same origin

    try {
      const response = await fetch(serverUrl, {
        method: 'POST',
        body: data, // FormData is sent directly
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmissionMessage({ type: 'success', text: 'Application submitted successfully!' });
        form.reset();
        setFormData({
            fullName: '', idNumber: '', email: '', phone: '',
            desiredAmount: '', desiredTerm: '', employmentStatus: '', termsAccepted: false,
        });
        setAttachment(null);
        setValidated(false);
      } else {
        throw new Error(result.message || 'Submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Submission Error:', error);
      setSubmissionMessage({ type: 'danger', text: `Error: ${error.message}` });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <section id="apply" className="py-5">
      <Container>
        <h2 className="text-center mb-4 fw-bold" data-aos="fade-up">Apply Securely Online</h2>
        <Row className="justify-content-center">
          <Col md={10} lg={8} data-aos="fade-up" data-aos-delay="100">
            <Card className="shadow-sm p-4 p-lg-5">
              {submissionMessage.text && (
                <div className={`alert alert-${submissionMessage.type}`} role="alert">
                  {submissionMessage.text}
                </div>
              )}
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="g-4">
                  <Col md={6}>
                    <Form.Group controlId="fullName">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} size="lg" required />
                      <Form.Control.Feedback type="invalid">Please enter your full name.</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="idNumber">
                      <Form.Label>South African ID Number</Form.Label>
                      <Form.Control type="text" name="idNumber" value={formData.idNumber} onChange={handleInputChange} size="lg" required pattern="\d{13}" title="Valid 13-digit SA ID number" />
                      <Form.Control.Feedback type="invalid">Please enter a valid 13-digit SA ID number.</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="email">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control type="email" name="email" value={formData.email} onChange={handleInputChange} size="lg" required />
                      <Form.Control.Feedback type="invalid">Please enter a valid email address.</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="phone">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleInputChange} size="lg" required pattern="^0\d{9}$" title="Valid 10-digit SA phone number (e.g., 0821234567)" />
                      <Form.Control.Feedback type="invalid">Please enter a valid 10-digit SA phone number.</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="desiredAmount">
                      <Form.Label>Desired Loan Amount (R)</Form.Label>
                      <Form.Control type="number" name="desiredAmount" value={formData.desiredAmount} onChange={handleInputChange} size="lg" required min="500" max="8000" step="100" />
                      <Form.Control.Feedback type="invalid">Please enter between R 500 and R 8,000.</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="desiredTerm">
                      <Form.Label>Repayment Term</Form.Label>
                      <Form.Select name="desiredTerm" value={formData.desiredTerm} onChange={handleInputChange} size="lg" required>
                        <option value="" disabled>-- Select Term --</option>
                        <option value="1">1 Month</option>
                        <option value="3">3 Months</option>
                        <option value="6">6 Months</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">Please select a repayment term.</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="employmentStatus">
                      <Form.Label>Employment Status</Form.Label>
                      <Form.Select name="employmentStatus" value={formData.employmentStatus} onChange={handleInputChange} size="lg" required>
                        <option value="" disabled>-- Select Status --</option>
                        <option value="employed">Employed</option>
                        <option value="self-employed">Self-Employed</option>
                        <option value="pensioner">Pensioner/Grant Recipient</option>
                        <option value="unemployed">Unemployed</option>
                        <option value="other">Other</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">Please select your employment status.</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="payslip">
                      <Form.Label>Upload Proof of Income (Optional)</Form.Label>
                      <Form.Control type="file" name="attachment" onChange={handleFileChange} size="lg" />
                      <Form.Text muted>Latest payslip or bank statement speeds up approval.</Form.Text>
                    </Form.Group>
                  </Col>
                </Row>
                <hr className="my-4" />
                <Form.Group controlId="termsCheck" className="mb-4">
                  <Form.Check
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleInputChange}
                    required
                    label={
                      <small>
                        I confirm I am over 18, a South African resident, and agree to the{' '}
                        <a href="#terms" onClick={(e) => { e.preventDefault(); setShowTermsModal(true); }}>Terms & Conditions</a> and{' '}
                        <a href="#privacy" onClick={(e) => { e.preventDefault(); setShowPrivacyModal(true); }}>Privacy Policy</a>,
                        including consent for credit checks as required by the NCA.
                      </small>
                    }
                    feedback="You must agree before submitting."
                    feedbackType="invalid"
                  />
                </Form.Group>
                <Button variant="accent" type="submit" size="lg" className="w-100 fw-bold btn-accent" disabled={isSubmitting}>
                  {isSubmitting ? <><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Sending...</> : 'Submit Application'}
                </Button>
              </Form>
            </Card>

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

          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ApplicationForm;