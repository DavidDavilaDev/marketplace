import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import CrearCuenta from "./CrearCuenta";

function InicioNavbar(){

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    return(
            <Navbar expand="lg" className="bg-body-tertiary">
  <Container>
    <Navbar.Brand>Pacha Cafetería</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <NavDropdown
          title="Iniciar Sesión"
          id="basic-nav-dropdown"// Agrega una clase personalizada
        >
          <NavDropdown.Item href="/">Login</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={handleShow}>Crear Cuenta</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Container>
  <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CrearCuenta />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
</Navbar>

    )
}

export default InicioNavbar;
