import React, { Component } from "react";

export default class ProfilePage extends Component {
  state = {
    edit: false,
    name: "",
    username: "",
    password: "",
    picture: ""
  };

  makeEditTrue = () => {
    this.setState({
      edit: !this.state.edit
    });
  };

  handleEditChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleEditSubmit = event => {
    event.preventDefault();
    let editedUser = {
      id: this.props.user.id,
      name: this.state.name,
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      picture: this.state.picture
    };

    fetch(`http://localhost:3000/users/${editedUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify(editedUser)
    }).then(res => res.json());
  };

  render() {
    return (
      <div className="cartShow">
        {this.state.edit ? (
          <div>
            <form onSubmit={this.handleEditSubmit}>
              Name{" "}
              <input
                type="text"
                value={this.state.name}
                onChange={this.handleEditChange}
                name="name"
                placeholder={this.props.user.name}
                required
              />
              <br />
              Username{" "}
              <input
                type="text"
                value={this.state.username}
                onChange={this.handleEditChange}
                name="username"
                placeholder={this.props.user.username}
                required
              />
              <br />
              Password{" "}
              <input
                type="password"
                value={this.state.password}
                onChange={this.handleEditChange}
                name="password"
                required
              />
              <br />
              Email{" "}
              <input
                type="text"
                value={this.state.email}
                onChange={this.handleEditChange}
                name="email"
                required
              />
              <br />
              Picture{" "}
              <input
                type="url"
                value={this.state.picture}
                onChange={this.handleEditChange}
                name="picture"
                placeholder={this.props.user.picture}
              />
              <br />
              <input type="submit" value="Submit Changes!" />
            </form>{" "}
          </div>
        ) : (
          <h2 contentEditable="true">{this.props.user.name}</h2>
        )}

        <img
          src={this.props.user.picture}
          alt="Your Profile"
          width="237px"
          height="225px"
        />
        <button onClick={this.makeEditTrue}>Edit</button>
      </div>
    );
  }
}
