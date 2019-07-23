import React from "react";
import { Segment, Grid, Image } from "semantic-ui-react";
import "../App.css";

const Welcome = () => {
  return (
    <Segment className="welcome">
      <h1 className="top">Welcome to Spot-A-Cart!</h1>
      <h3 className="top">
        <i>Find Food Carts Near You</i>
      </h3>
    </Segment>
  );
};

export default Welcome;
