import React, { Component } from "react";
import Button from "@material/react-button";
import { MDBInput } from "mdbreact";

const reviewAPI = "http://localhost:3000/reviews";

export default class ReviewForm extends Component {
  state = {
    content: "",
    stars: 0
  };

  handleFormSubmit = e => {
    e.preventDefault();
    console.log(this.props);
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
    })
      .then(res => res.json())
      .then(data => this.props.addReview(data));
  };

  handleFormChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    console.log(this.props);
    const star = "⭐️";
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <br />
          <MDBInput
            type="textarea"
            label="Add Your Review"
            rows="4"
            name="content"
            onChange={this.handleFormChange}
            value={this.state.content}
            required
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
            required
          />
          <br />
          <Button type="submit" name="submit">
            Submit
          </Button>
        </form>
      </div>
    );
  }
}
