// src/components/AppNavbar.js
import React from 'react';
import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';

function AppNavbar() {
  return (
    <Navbar bg="white" expand="lg" sticky="top" className="shadow-sm main-nav">
      <Container>
        <Navbar.Brand href="#" className="fw-bold">
          YourBrand Loans
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link href="#calculator">Calculator</Nav.Link>
            <Nav.Link href="#process">How It Works</Nav.Link>
            <Nav.Link href="#why-us">Why Us</Nav.Link>
            <Nav.Link href="#faq">FAQ</Nav.Link>
            <Nav.Item className="ms-lg-3 me-lg-2">
              <Button href="#apply" variant="accent" size="sm" className="fw-bold px-3 py-2 btn-accent">
                Apply Online Now
              </Button>
            </Nav.Item>
            <NavDropdown title={<><i className="bi bi-translate me-1"></i> Language</>} id="languageDropdown" align="end">
              <NavDropdown.Item href="#" active>English</NavDropdown.Item>
              <NavDropdown.Item href="#">Afrikaans</NavDropdown.Item>
              <NavDropdown.Item href="#">isiXhosa</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;