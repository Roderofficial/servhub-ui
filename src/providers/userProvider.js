import React, { Component, createContext } from "react";
import userService from "../services/userService";

export const UserContext = createContext();
export class UserContextProvider extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    var user_token = localStorage.getItem("token");
    if (user_token) {
      userService
        .getMe()
        .then((res) => {
          this.setState({ user: res });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  render() {
    return (
      <UserContext.Provider value={{ user: this.state.user }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
