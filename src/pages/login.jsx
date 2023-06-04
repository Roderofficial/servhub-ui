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
    };
  }

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
                >
                  Wyślij kod
                </Button>
              </Form>
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
                >
                  Zaloguj
                </Button>
              </Form>
            </Card.Body>
          </Card>
        );

      default:
        return "brak karty";
    }
  }
}
