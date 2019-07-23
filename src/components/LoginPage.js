import React from "react";

export default class LoginPage extends React.Component {
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
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`
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
    console.log(this.props);
    return (
      <div>
        <div className="login">
          <form onSubmit={this.handleSubmit}>
            Username{" "}
            <input
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
              name="username"
              placeholder="Username"
            />
            Password{" "}
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              name="password"
              placeholder="Password"
            />
            <br />
            <input type="submit" value="Log In" />
            <br />
            Or
            <button onClick={() => this.props.history.push("/signup")}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  }
}
