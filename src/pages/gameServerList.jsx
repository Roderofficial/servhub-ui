import React from "react";
import { Card, Container, Button, Table } from "react-bootstrap";
import gameService from "../services/gameService";
import serverService from "../services/serverService";
import withRouter from "../providers/withRouter";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

class GameServers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      servers: {},
      loading: true,
      page: 1,
      gameId: null,
      game: {},
    };
  }

  handleRefresData = () => {
    this.setState({ loading: true });
    var servers = serverService.getGameServers(
      this.state.game.id,
      this.state.page
    );
    servers.then((data) => {
      this.setState({ servers: data, loading: false });
    });
  };

  componentDidMount() {
    this.setState({ gameId: this.props.params.id });
    //Get game data
    gameService.getGame(this.props.params.id).then((data) => {
      this.setState({ game: data }, () => {
        this.handleRefresData();
      });
    });
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    return (
      <Container>
        <h2 style={{ marginTop: "20px" }}>
          Lista serwerów gry {this.state.game.title}
        </h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Nazwa serwera</th>
              <th>Adres IP</th>
              <th>Liczba Graczy</th>
              <th>Max Graczy</th>
              <th>Kraj</th>
            </tr>
          </thead>
          <tbody>
            {this.state.servers.rows ? (
              this.state.servers.rows.map((server) => {
                return (
                  <tr>
                    <td>{server.id}</td>
                    <td>
                      <a href={`/server/${server.id}`}>{server.name}</a>
                    </td>
                    <td>
                      {server.ip}:{server.port}
                    </td>
                    <td>{server.serverStatuses[0].players}</td>
                    <td>{server.serverStatuses[0].maxPlayers}</td>
                    <td>
                      {server.country_code ? (
                        <img
                          src={`https://flagsapi.com/${server.country_code}/flat/32.png`}
                          title={server.country_code}
                        />
                      ) : (
                        <td>Brak danych</td>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6">Brak serwerów</td>
              </tr>
            )}
          </tbody>
        </Table>
        <Pagination
          onChange={(page) => {
            this.setState({ page: page }, () => {
              this.handleRefresData();
            });
          }}
          current={this.state.page}
          total={this.state.servers.count}
          pageSize={this.state.servers.pageSize}
        />
      </Container>
    );
  }
}

export default withRouter(GameServers);
