import React from "react";
import { Button, Table, Container, Card, ProgressBar } from "react-bootstrap";
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
        <Card className="bg-dark mt-5">
          <Card.Header>
            <h2>Lista serwerów</h2>
          </Card.Header>
          <Card.Body>
            <Table className="px-2 text-white">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Gra</th>
                  <th>Nazwa serwera</th>
                  <th>Adres IP</th>
                  <th>Liczba Graczy</th>
                  <th>Kraj</th>
                </tr>
              </thead>
              <tbody>
                {this.state.servers
                  ? this.state.servers.map((server) => {
                      return (
                        <tr style={{ verticalAlign: "middle" }}>
                          <td>{server.id}</td>
                          <td>{server.game.title}</td>
                          <td>
                            <a
                              href={`/server/${server.id}`}
                              style={{
                                color: "#FF7500",
                                textDecoration: "none",
                              }}
                            >
                              {server.name}
                            </a>
                          </td>
                          <td>
                            {server.ip}:{server.port}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {server.serverStatuses[0].players} /{" "}
                            {server.serverStatuses[0].maxPlayers}
                            <ProgressBar
                              variant="success"
                              style={{ backgroundColor: "#16191c" }}
                              now={
                                (server.serverStatuses[0].players /
                                  server.serverStatuses[0].maxPlayers) *
                                100
                              }
                            />
                          </td>
                          <td>
                            {server.country_code ? (
                              <img
                                src={`https://flagsapi.com/${server.country_code}/flat/32.png`}
                                title={server.country_code}
                              />
                            ) : (
                              "N/A"
                            )}
                          </td>
                        </tr>
                      );
                    })
                  : "<td colSpan='7'>Brak serwerów do wyświetlenia</td>"}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}
