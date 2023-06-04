import React from "react";
import {
  Button,
  Form,
  Input,
  InputGroup,
  Container,
  Card,
} from "react-bootstrap";
import serverService from "../services/serverService";
import gameService from "../services/gameService";
import Swal from "sweetalert2";

export default class AddServer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ip: "",
      port: "",
      gameId: "",
      games: [],
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    gameService.getGames().then((data) => {
      this.setState({ games: data });
    });
  }

  addServer = (e) => {
    e.preventDefault();
    var obj_to_send = {
      ip: this.state.ip,
      port: this.state.port,
      gameID: this.state.game,
    };
    serverService
      .addServer(obj_to_send)
      .then((data) => {
        if (data.status === 200) {
          Swal.fire({
            title: "Sukces!",
            text: "Serwer został dodany!",
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
          text: "Serwer nie został dodany!",
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };

  render() {
    return (
      <div>
        <Container>
          <h2 style={{ marginTop: "20px" }}>Dodaj serwer</h2>
          <Card>
            <Card.Body>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Adres IP</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Wpisz adres IP serwera"
                    name="ip"
                    onChange={this.handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Port</Form.Label>
                  <Form.Control
                    name="port"
                    type="text"
                    placeholder="Wpisz port serwera"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Wybierz grę</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={this.handleChange}
                    name="game"
                  >
                    <option selected disabled>
                      Wybierz grę
                    </option>
                    {this.state.games.map((game) => {
                      return <option value={game.id}>{game.title}</option>;
                    })}
                  </Form.Control>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  style={{ float: "right", marginTop: "30px" }}
                  onClick={this.addServer}
                >
                  Dodaj serwer
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}
