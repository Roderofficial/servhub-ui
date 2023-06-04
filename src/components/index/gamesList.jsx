import React from "react";
import { Card, Container, Button } from "react-bootstrap";
import gameService from "../../services/gameService";

export default class GameList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      loading: true,
    };
  }

  componentDidMount() {
    gameService.getGames().then((data) => {
      this.setState({ games: data, loading: false });
    });
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }
    return (
      <Container>
        <h2>Lista dostępnych gier</h2>
        <Card>
          <Card.Body>
            {this.state.games
              ? this.state.games.map((game) => {
                  return (
                    <Button
                      key={game.id}
                      variant="primary"
                      href={`/games/${game.id}`}
                      style={{ margin: "5px" }}
                    >
                      {game.title}
                    </Button>
                  );
                })
              : "Brak gier do wyświetlenia"}
          </Card.Body>
        </Card>
      </Container>
    );
  }
}
