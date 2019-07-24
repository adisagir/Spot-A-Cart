import React, { Component } from "react";

const reviewAPI = "http://localhost:3000/reviews";

export default class ReviewForm extends Component {
  state = {
    content: "",
    stars: 0
  };

  handleFormSubmit = e => {
    e.preventDefault();
    fetch(reviewAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        user_id: this.props.user_id,
        cart_id: this.props.cart_id,
        content: this.state.content,
        stars: this.state.stars
      })
    });

  };

  handleFormChange = e => {
    console.log(this.props.user_id, this.props.cart_id)
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    console.log(this.props.user_id, this.props.cart_id)
    const star = "⭐️";
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          Your Review:
          <br />
          <textarea
            type="text"
            name="content"
            onChange={this.handleFormChange}
            value={this.state.content}
          />
          <br />
          Your Star Rating
          <br />
          <div className="stars">{star.repeat(this.state.stars)}</div>
          <br />
          <input
            type="range"
            min="0"
            max="4"
            step="1"
            name="stars"
            onChange={this.handleFormChange}
            value={this.state.stars}
          />
          <br />
          <input type="submit" name="submit" />
        </form>
      </div>
    );
  }
}
