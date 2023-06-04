import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../providers/userProvider";
import { Button, Card, Table, Container, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import withRouter from "../providers/withRouter";
import serverService from "../services/serverService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import TakeOwnership from "../components/server/takeOwnership";

class ServerPage extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      server: {},
      loading: true,
      error: false,
    };
  }

  componentDidMount() {
    serverService
      .getServer(this.props.params.id)
      .then((data) => {
        this.setState({ server: data, loading: false });
      })
      .catch((err) => {
        this.setState({ error: true, loading: false });
      });
  }

  owner_management = () => {
    return (
      <Card
        style={{ marginTop: "20px", marginBottom: "20px" }}
        className="text-white bg-dark"
      >
        <Card.Header>
          <Card.Title>Zarządzanie serwerem</Card.Title>
        </Card.Header>
        <Card.Body>
          <Button>Usuń serwer</Button>
        </Card.Body>
      </Card>
    );
  };

  owner_info = () => {
    return (
      <div>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>Id właściciela</td>
              <td>{this.state.server.ownerId}</td>
            </tr>
            <tr>
              <td>Nazwa użytkownika</td>
              <td>
                {this.state.server.owner.verificatied ? (
                  <FontAwesomeIcon icon={faCircleCheck} />
                ) : null}{" "}
                {this.state.server.owner.username}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  };

  render() {
    const server = this.state.server;
    console.log(server);
    if (this.state.loading) {
      return <div>Ładowanie...</div>;
    }
    return (
      <Container>
        <Card style={{ marginTop: "20px" }}>
          <Card.Header>
            <Card.Title>
              {server.extras?.favicon ? (
                <img
                  src={server.extras.favicon}
                  style={{ marginRight: "10px" }}
                />
              ) : null}
              {server.name}
            </Card.Title>
          </Card.Header>
          <Card.Body>
            {console.log(this.context.user, server.owner_id)}
            {this.context.user && this.context.user.id === server.ownerId ? (
              <this.owner_management />
            ) : null}
            <h3>Informacje o serwerze</h3>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td>Nazwa</td>
                  <td>{server.name}</td>
                </tr>
                <tr>
                  <td>IP</td>
                  <td>{server.ip}</td>
                </tr>
                <tr>
                  <td>Port</td>
                  <td>{server.port}</td>
                </tr>
                <tr>
                  <td>Kraj pochodzenia</td>
                  <td>{server.country_code}</td>
                </tr>
                <tr>
                  <td>Graczy online</td>
                  <td>{server.serverStatuses[0].players}</td>
                </tr>
                <tr>
                  <td>Ilość slotów</td>
                  <td>{server.serverStatuses[0].maxPlayers}</td>
                </tr>
                <tr>
                  <td>Nazwa gry</td>
                  <td>
                    <a href={`/games/${server.game.id}`}>{server.game.title}</a>
                  </td>
                </tr>
              </tbody>
            </Table>

            <h3>Informacje o właścicielu</h3>
            {server.ownerId ? (
              <this.owner_info />
            ) : (
              <>
                <div>Serwer nie posiada właściela</div>
                <TakeOwnership serverId={server.id} />
              </>
            )}

            <div
              style={{
                marginTop: "20px",
                borderTop: "1px solid #343a40",
                paddingTop: "10px",
              }}
            >
              <Badge bg="dark" className="me-2">
                Dodano: {new Date(server.createdAt).toLocaleString()}
              </Badge>
              <Badge bg="dark" className="me-2">
                Zaktualizowano: {new Date(server.updatedAt).toLocaleString()}
              </Badge>
              <Badge bg={server.online ? "success" : "danger"} className="me-2">
                Ostatni ping:{" "}
                {new Date(server.serverStatuses[0].updatedAt).toLocaleString()}
              </Badge>
              <Badge bg="danger" className="float-end">
                Id serwera: {server.id}
              </Badge>
            </div>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default withRouter(ServerPage);
