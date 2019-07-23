import React from "react";
import { Marker, InfoWindow } from "react-google-maps";
import CartMapWindow from "./CartMapWindow";
import FoodTruck from "../foodTruck.png";

export default class CartMarker extends React.Component {
  state = {
    activeMarker: this.props.activeMarker
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      activeMarker: nextProps.activeMarker
    });
  }
  render() {
    return (
      <div>
        <Marker
          onClick={this.state.activeMarker}
          position={this.props.location}
          icon={FoodTruck}
        >
          {this.state.activeMarker ? (
            <InfoWindow maxWidth={1200} defaultPosition={this.props.location}>
              <CartMapWindow
                toggleShowPage={this.props.toggleShowPage}
                cart={this.props.doctor}
              />
            </InfoWindow>
          ) : null}
        </Marker>
      </div>
    );
  }
}
