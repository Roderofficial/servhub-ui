import React from "react";
import { Button } from "react-bootstrap";
import GameList from "../components/index/gamesList";
import ServersList from "../components/index/serversList";

const IndexPage = () => (
  <div style={{ marginTop: "20px" }}>
    <GameList />
    <ServersList />
  </div>
);

export default IndexPage;
