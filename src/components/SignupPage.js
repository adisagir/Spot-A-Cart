import React from "react";

export default class SignupPage extends React.Component {
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
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`
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
        <div className="login">
          <form onSubmit={this.handleSubmit}>
            Name{" "}
            <input
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
              name="name"
            />
            <br />
            Username{" "}
            <input
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
              name="username"
            />
            <br />
            Password{" "}
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              name="password"
            />
            <br />
            Email{" "}
            <input
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
              name="email"
            />
            <br />
            Picture{" "}
            <input
              type="url"
              value={this.state.picture}
              onChange={this.handleChange}
              name="picture"
            />
            <br />
            <input type="submit" value="Sign Up!" />
          </form>{" "}
        </div>{" "}
      </div>
    );
  }
}
