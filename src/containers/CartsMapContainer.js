import React from "react";
import DoctorsMaps from "../components/CartsMap";

export default class CartsMapContainer extends React.Component {
  state = {
    carts: [],
    location: this.props.location,
    activeMarker: null
  };
  
  componentWillReceiveProps(nextProps){
    if (nextProps.carts !== this.props.carts){
      this.setState({
        carts: nextProps.carts,
        location: nextProps.location
      })
    }
  }
  findNearestCart = () => {
    return this.props.carts.map(cart => {
      // let nearestCart = cart.
    })
  }
}
