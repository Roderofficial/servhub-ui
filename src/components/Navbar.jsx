import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import React, { useContext } from "react";
import { UserContext } from "../providers/userProvider";
import { Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavbarMenu = (props) => {
  const user = useContext(UserContext);
  console.log(user);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Lista serwerów</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {user.user ? (
              <Nav.Link eventKey={1}>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {user.user.username}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href={`profile/${user.user.id}`}>
                      Profil
                    </Dropdown.Item>
                    <Dropdown.Item href="/logout">Wyloguj</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav.Link>
            ) : (
              <Nav.Link eventKey={2} href="/login">
                <Button variant="success">Zaloguj</Button>
              </Nav.Link>
            )}

            <Nav.Link eventKey={2} href="/add">
              <Button>Dodaj serwer</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarMenu;
