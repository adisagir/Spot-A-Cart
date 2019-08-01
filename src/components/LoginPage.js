import React, { Component } from "react";
import { MDBBtn } from "mdbreact";
import CartLogo from "../cartLogoBottom.png"
import TextField, {Input} from '@material/react-text-field';

export default class LoginPage extends Component {
  state = {
    username: "",
    password: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(this.state) 
    })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          this.props.logIn();
          this.props.history.push("/");
        } else {
          alert("hey buddy...login with real info, k thx");
        }
      });

    fetch("http://localhost:3000/users")
      .then(res => res.json())
      .then(allUsers => {
        const selectedUser = allUsers.find(
          user =>
            user.username.toLowerCase() === this.state.username.toLowerCase()
        );
        if (selectedUser) {
          {
            this.props.logIn(selectedUser);
          }
        } else {
          alert("The username you entered does not exist, please try again!");
        }
      });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div align="center">
        <div className="login">
          <form onSubmit={this.handleSubmit}>
            <TextField label="Username">
            <Input
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
              name="username"
              placeholder="Username"
            />
            </TextField>
            <br />
            <TextField label="Password">
            <Input
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              name="password"
              placeholder="Password"
            />
            </TextField>
            <br />
            <MDBBtn type="submit" className="login">Sign In</MDBBtn> {" "} <MDBBtn onClick={() => this.props.history.push("/signup")}className="signup">Sign Up</MDBBtn>
            <br />
          </form>
          <img src={CartLogo} alt="logo" align="center" />
        </div>
      </div>
    );
  }
}
