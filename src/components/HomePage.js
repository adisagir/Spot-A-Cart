import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Segment, Grid, Image } from "semantic-ui-react";
import CartMap from "./CartsMap.js";
import Button from "@material/react-button";
import "../App.css";

const HomePage = props => {
  let displayHomePage = (
    <div align="center">
      {localStorage.token ? (
        <div>
          <h1>Welcome, {props.name}!</h1>
          <img src={props.image} height="200px" width="200px" alt="Profile" />
        </div>
      ) : (
        <Segment className="welcome">
          <h1 align="center">Welcome to Spot-A-Cart!</h1>
          <h3 align="center">
            <i>Find Food Carts Near You</i>
          </h3>
          <Button
            type="submit"
            className="login"
            onClick={() => props.history.push("/login")}
          >
            Sign In
          </Button>{" "}
          |{" "}
          <Button
            onClick={() => props.history.push("/signup")}
            className="signup"
          >
            Sign Up
          </Button>
        </Segment>
      )}
    </div>
  );
  return (
    <div>
      <CartMap
        current_user={props.current_user}
        cart_id={props.cart_id}
        name={props.name}
        show={props.show}
        logOut={props.logOut}
        addReview={props.addReview}
        displayHomePage={displayHomePage}
      />
    </div>
  );
};

export default HomePage;
