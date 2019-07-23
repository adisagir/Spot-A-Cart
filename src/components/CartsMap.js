import React, { Component } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow
} from "@react-google-maps/api";
import FoodTruckIcon from "../foodTruck.png";

const cartAPI = "http://localhost:3000/carts";

export default class CartsMap extends Component {
  state = {
    carts: [],
    selectedPlace: {},
    activeMarker: {},
    showingInfoWindow: false,
    cuisine: ""
  };

  componentDidMount() {
    fetch(cartAPI)
      .then(resp => resp.json())
      .then(allCarts => {
        this.setState({
          carts: allCarts
        });
      });
  }

  onMarkerClick = (props, marker, e) => {
    console.log(this.props.current_user);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
    fetch(
      `http://localhost:3000/cuisines/${this.state.activeMarker.cuisine_id}`
    )
      .then(resp => resp.json())
      .then(cuisine => {
        this.setState({
          cuisine: cuisine.name
        });
      });
  };

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    let newMarkers = this.state.carts.map(cart => {
      return (
        <Marker
          onLoad={marker => {
            console.log("marker: ", marker);
          }}
          position={{
            lat: parseFloat(cart.latitude),
            lng: parseFloat(cart.longitude)
          }}
          onClick={e => {
            this.onMarkerClick(e, cart);
          }}
          icon={FoodTruckIcon}
        />
      );
    });
    console.log(this.state.activeMarker);
    return (
      <div>
        <h1>Welcome, {this.props.name}!</h1>
        <br />
        <img src={this.props.image} height="200px" width="200px"></img>
        <br />
        <button onClick={() => this.props.logOut(this.props.history)}>
          Log Out
        </button>
        <LoadScript
          id="script-loader"
          googleMapsApiKey="AIzaSyC5nHpj9XSRXvvhnVfvctNk2abXrKHaD5Y"
        >
          <GoogleMap
            id="nyc-map"
            mapContainerStyle={{
              height: "100vh",
              width: "100vw"
            }}
            zoom={13}
            center={{
              lat: 40.75607,
              lng: -73.98392
            }}
          >
            {newMarkers}
            {this.state.showingInfoWindow ? (
              <InfoWindow
                position={{
                  lat: parseFloat(this.state.activeMarker.latitude),
                  lng: parseFloat(this.state.activeMarker.longitude)
                }}
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                onCloseClick={this.onClose}
              >
                <div>
                  <h3>{this.state.activeMarker.name}</h3>
                  <h4>
                    <i>Cuisine: {this.state.cuisine}</i>
                  </h4>
                  <h4>
                    <a
                      href={this.state.activeMarker.website_url}
                      target="_blank"
                      rel="noopener no referrer"
                    >
                      Website
                    </a>
                  </h4>
                  <img
                    src={this.state.activeMarker.image_url}
                    alt="Food Carts"
                    height="200px"
                    width="200px"
                  />
                </div>
              </InfoWindow>
            ) : null}
          </GoogleMap>
        </LoadScript>
      </div>
    );
  }
}
