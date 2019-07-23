import React from "react";
import CartsList from "../components/CartsList";

export default class CartsContainer extends React.Component {
  render() {
    return (
      <CartsList
        carts={this.props.carts}
        distance={this.props.distance}
        cuisine={this.props.cuisine}
      />
    );
  }
}
