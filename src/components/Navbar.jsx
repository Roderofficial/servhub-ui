import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import React, { useContext } from "react";
import { UserContext } from "../providers/userProvider";
import { Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faServer,
  faPlus,
  faRightToBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

const NavbarMenu = (props) => {
  const user = useContext(UserContext);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <FontAwesomeIcon icon={faServer} /> ServHub - Lista serwerów
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {user.user ? (
              <Nav.Link eventKey={1}>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <FontAwesomeIcon icon={faUser} /> {user.user.username}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={logout}>Wyloguj</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav.Link>
            ) : (
              <Nav.Link eventKey={2} href="/login">
                <Button variant="success">
                  <FontAwesomeIcon icon={faRightToBracket} /> Zaloguj się
                </Button>
              </Nav.Link>
            )}

            <Nav.Link eventKey={2} href="/add">
              <Button>
                <FontAwesomeIcon icon={faPlus} /> Dodaj serwer
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarMenu;
