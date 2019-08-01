import React, { Component } from "react";

export default class DisplayReview extends Component {
  render() {
    let specficReviews = this.props.reviews.map(review => {
      return (
        <li>
          <div>
            <b>{review.user.name}</b> said: {review.content}:{" "}
            {" ⭐".repeat(review.stars)}
          </div>
        </li>
      );
    });

    return <ul style={{listStyleType: "none"}}>{specficReviews}</ul>;
  }
}
