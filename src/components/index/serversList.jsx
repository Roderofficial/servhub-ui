import React from "react";
import { Button, Table, Container } from "react-bootstrap";
import serverService from "../../services/serverService";

export default class ServersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      servers: [],
      loading: true,
    };
  }

  componentDidMount() {
    serverService.getServers().then((data) => {
      this.setState({ servers: data, loading: false });
    });
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }
    return (
      <Container>
        <h2 style={{ marginTop: "20px" }}>Lista dostępnych serwerów</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Gra</th>
              <th>Nazwa serwera</th>
              <th>Adres IP</th>
              <th>Port</th>
              <th>Liczba Graczy</th>
              <th>Max Graczy</th>
              <th>Kraj</th>
            </tr>
          </thead>
          <tbody>
            {this.state.servers
              ? this.state.servers.map((server) => {
                  return (
                    <tr>
                      <td>{server.id}</td>
                      <td>{server.game.title}</td>
                      <td>
                        <a href={`/server/${server.id}`}>{server.name}</a>
                      </td>
                      <td>{server.ip}</td>
                      <td>{server.port}</td>
                      <td>{server.serverStatuses[0].players}</td>
                      <td>{server.serverStatuses[0].maxPlayers}</td>
                      <td>{server.country_code}</td>
                    </tr>
                  );
                })
              : "<td colSpan='7'>Brak serwerów do wyświetlenia</td>"}
          </tbody>
        </Table>
      </Container>
    );
  }
}
