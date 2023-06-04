import React from "react";
import { Card, Input, Form, Button } from "react-bootstrap";
import authService from "../services/authService";
import Swal from "sweetalert2";

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      email: "",
      token: "",
      username: "",
    };
  }

  register = (e) => {
    e.preventDefault();
    authService
      .register(this.state.email, this.state.username)
      .then((data) => {
        if (data.status == 200) {
          Swal.fire({
            title: "Sukces!",
            text: "Zarejestrowano pomyślnie! Sprawdź skrzynkę mailową!",
            icon: "success",
            confirmButtonText: "Ok",
          }).then(() => {
            window.location.href = "/";
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Błąd!",
          text: "Nie udało się zarejestrować!",
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };

  sendLoginToken = (e) => {
    e.preventDefault();
    authService
      .getCode(this.state.email)
      .then((data) => {
        this.setState({ page: 2 });
      })
      .catch((err) => {
        Swal.fire({
          title: "Błąd!",
          text: "Nie udało się wysłać kodu!",
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };

  checkCode = (e) => {
    e.preventDefault();
    authService.login(this.state.email, this.state.token).then((data) => {
      if (data) {
        Swal.fire({
          title: "Sukces!",
          text: "Zalogowano pomyślnie!",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {
          window.location.href = "/";
        });
      } else {
        Swal.fire({
          title: "Błąd!",
          text: "Nie udało się zalogować!",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    switch (this.state.page) {
      case 1:
        return (
          <Card
            style={{ maxWidth: "500px", margin: "auto", marginTop: "20px" }}
          >
            <Card.Header>Logowanie</Card.Header>
            <Card.Body>
              <img
                src="/assets/images/email.svg"
                width="200px"
                style={{ padding: "10px", margin: "auto", display: "block" }}
              />
              <Form>
                <Form.Group>
                  <Form.Label>Podaj adres e-mail</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    onChange={this.handleChange}
                    value={this.state.email}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={(e) => {
                    this.sendLoginToken(e);
                  }}
                  className="float-end mt-2 shadow-sm w-100"
                >
                  Wyślij kod
                </Button>
              </Form>
              <hr />
              <p className="text-center">
                Nie masz konta?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    this.setState({ page: 3 });
                  }}
                >
                  Zarejestruj się
                </a>
              </p>
            </Card.Body>
          </Card>
        );
      case 2:
        return (
          <Card
            style={{ maxWidth: "500px", margin: "auto", marginTop: "20px" }}
          >
            <Card.Header>Logowanie</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group>
                  <img
                    src="/assets/images/code.svg"
                    width="300px"
                    style={{
                      padding: "10px",
                      margin: "auto",
                      display: "block",
                    }}
                  />
                  <Form.Label>Podaj kod z e-maila</Form.Label>
                  <Form.Control
                    type="text"
                    name="token"
                    onChange={this.handleChange}
                    value={this.state.token}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={(e) => {
                    this.checkCode(e);
                  }}
                  className="float-end mt-2 shadow-sm w-100"
                >
                  Zaloguj
                </Button>
              </Form>
              <hr />
              <p className="text-center">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    this.setState({ page: 1 });
                  }}
                >
                  Wróć
                </a>
              </p>
            </Card.Body>
          </Card>
        );

      case 3:
        return (
          <Card
            style={{ maxWidth: "500px", margin: "auto", marginTop: "20px" }}
          >
            <Card.Header>Rejestracja</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group>
                  <img
                    src="/assets/images/register.svg"
                    width="300px"
                    style={{
                      padding: "10px",
                      margin: "auto",
                      display: "block",
                    }}
                  />
                  <Form.Label>Nazwa użytkownika</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    onChange={this.handleChange}
                    value={this.state.username}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Adres e-mail</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    onChange={this.handleChange}
                    value={this.state.email}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="float-end w-100 mt-2"
                  onClick={(e) => {
                    this.register(e);
                  }}
                >
                  Zarejestruj
                </Button>
              </Form>
              <hr />
              <p className="text-center">
                Masz już konto?{" "}
                <a
                  href="#"
                  onClick={() => {
                    this.setState({ page: 1 });
                  }}
                >
                  Zaloguj się
                </a>
              </p>
            </Card.Body>
          </Card>
        );

      default:
        return "brak karty";
    }
  }
}
