import Auth from "./utils/Auth";
import { Component } from "react";

export class Login extends Component {
  componentDidMount() {
    if (!Auth.authenticated()) window.location.href = "./edit-user";
  }

  login() {
    Auth.login();
  }

  logout() {
    Auth.logout();
  }

  signIn() {
    window.location.href = "./new-user";
  }
}
