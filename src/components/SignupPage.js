import React, { Component } from "react";
import { MDBBtn } from "mdbreact";
import TextField, { Input } from "@material/react-text-field";

export default class SignupPage extends Component {
  state = {
    name: "",
    username: "",
    password: "",
    email: "",
    picture: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    const newUser = this.state;
    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        localStorage.setItem("token", data.token);
        this.props.logIn(newUser);
        this.props.history.push("/");
      });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div>
        <div className="login" align="center">
          <form onSubmit={this.handleSubmit}>
            <TextField label="Name">
              <Input
                type="text"
                value={this.state.name}
                onChange={this.handleChange}
                name="name"
                required
              />
            </TextField>
            <br />
            <TextField label="Username">
              <Input
                type="text"
                value={this.state.username}
                onChange={this.handleChange}
                name="username"
                required
              />
            </TextField>
            <br />
            <TextField label="Password">
              <Input
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
                name="password"
                required
              />
            </TextField>
            <br />
            <TextField label="Email">
              <Input
                type="text"
                value={this.state.email}
                onChange={this.handleChange}
                name="email"
              />
            </TextField>
            <br />
            <TextField label="Picture">
              <Input
                type="url"
                value={this.state.picture}
                onChange={this.handleChange}
                name="picture"
                placeholder="Link to Picture"
              />
            </TextField>
            <br />
            <MDBBtn type="submit" value="Sign Up!">
              Sign Up
            </MDBBtn>
          </form>{" "}
        </div>{" "}
      </div>
    );
  }
}
