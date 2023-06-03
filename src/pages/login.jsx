import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Container } from "react-bootstrap";

const LoginPage = () => {
  return (
    <Container style={{ marginTop: "20px" }}>
      <Tabs
        defaultActiveKey="login"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="login" title="Logowanie">
          Tab content for Home
        </Tab>
        <Tab eventKey="register" title="Rejestracja">
          Tab content for Profile
        </Tab>
      </Tabs>
    </Container>
  );
};

export default LoginPage;
