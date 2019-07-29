import React, { Component } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow
} from "@react-google-maps/api";
import FoodTruckIcon from "../foodTruck.png";
import ReviewFormModal from "./ReviewFormModal";
import ReviewForm from "./ReviewForm";
import DisplayReview from "./DisplayReview";

const cartAPI = "http://localhost:3000/carts";

export default class CartsMap extends Component {
  state = {
    carts: [],
    selectedPlace: {},
    activeMarker: {},
    showingInfoWindow: false,
    cuisine: "",
    modalShow: false,
    cartReviews: []
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
        showingInfoWindow: false
        // activeMarker: null
      });
    }
  };

  setModalShow = boolean => {
    this.setState({
      modalShow: boolean
    });
  };

  getAvgStars = () => {
    let reviewStars = this.state.activeMarker.reviews.map(
      review => review.stars
    );
    let total = reviewStars.reduce((acc, c) => acc + c, 0);
    if (total) {
      let avg = (total / reviewStars.length).toFixed(0);
       return " ⭐".repeat(avg)
    } else {
      return <i>This cart does not have any ratings. Add your review!</i>;
    }
  };

  onReviewFormSubmit = (review) => {
    this.setState({
      cartReviews: [...this.state.activeMarker.reviews, review],
      modalShow: false
    })
  }

  render() {
    let newMarkers = this.state.carts.map(cart => {
      return (
        <Marker
          onLoad={marker => {}}
          position={{
            lat: parseFloat(cart.latitude),
            lng: parseFloat(cart.longitude)
          }}
          onClick={e => {
            this.onMarkerClick(e, cart);
            if (this.state.activeMarker.reviews) {
              this.setState({
                cartReviews: this.state.activeMarker.reviews
              });
            }
          }}
          icon={FoodTruckIcon}
        />
      );
    });
    return (
      <div>
        <h1>Welcome, {this.props.name}!</h1>
        <img
          src={this.props.image}
          height="200px"
          width="200px"
          alt="Profile"
        />
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
                  {this.getAvgStars()}
                  <h4>
                    <i>Cuisine: {this.state.cuisine}</i>
                  </h4>
                  <h4>
                    <a
                      href={this.state.activeMarker.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
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
                  <br />
                  {/* <h4>
                    {this.state.activeMarker.reviews.length > 0
                      ? this.state.activeMarker.reviews.map(
                          cartReview => cartReview.stars
                        )
                      : null}
                  </h4>
                  <h4>
                    {
                      this.state.activeMarker.reviews.map(
                      cartReview => cartReview.content
                    )}
                  </h4> */}
                  <button onClick={() => this.setModalShow(true)}>
                    Add Review
                  </button>
                  <DisplayReview reviews={this.state.cartReviews}/>
                </div>
              </InfoWindow>
            ) : null}
            <ReviewFormModal
              user_id={this.props.current_user.id}
              cart_id={this.state.activeMarker.id}
              name={this.state.activeMarker.name}
              show={this.state.modalShow}
              onHide={() => this.setModalShow(false)}
              addReview={this.onReviewFormSubmit}
            />
            <ReviewForm
              user_id={this.props.current_user.id}
              cart_id={this.state.activeMarker.id}
              addReview={this.onReviewFormSubmit}
            />
          </GoogleMap>
        </LoadScript>
      </div>
    );
  }
}
