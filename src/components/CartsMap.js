import React, { Component } from "react";
import Button from "@material/react-button";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow
} from "@react-google-maps/api";
import FoodTruckIcon from "../foodTruck.png";
import ReviewFormModal from "./ReviewFormModal";
import DisplayReview from "./DisplayReview";
import AddCartModal from "./AddCartModal";

const cartAPI = "http://localhost:3000/carts";
const cuisineAPI = "http://localhost:3000/cuisines";

export default class CartsMap extends Component {
  state = {
    carts: [],
    selectedPlace: {},
    activeMarker: {},
    showingInfoWindow: false,
    cuisine: "",
    modalShow: false,
    cartReviews: [],
    modalCartShow: false,
    allCuisines: [],
    currentPosition: {
      currentLat: 0,
      currentLng: 0
    },
    locationShow: false
  };

  showCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords);
        this.setState(prevState => ({
          currentPosition: {
            ...prevState.currentPosition,
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          locationShow: true
        }));
      });
    }
  };

  componentDidMount() {
    this.showCurrentLocation();
    fetch(cartAPI)
      .then(resp => resp.json())
      .then(allCarts => {
        this.setState({
          carts: allCarts
        });
      });

    fetch(cuisineAPI)
      .then(resp => resp.json())
      .then(allCuisines => {
        this.setState({ allCuisines: allCuisines });
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
      });
    }
  };

  setModalShow = boolean => {
    this.setState({
      modalShow: boolean
    });
  };

  setModalCartShow = boolean => {
    this.setState({
      modalCartShow: boolean
    });
  };

  getAvgStars = () => {
    let reviewStars = this.state.activeMarker.reviews.map(
      review => review.stars
    );
    let total = reviewStars.reduce((acc, c) => acc + c, 0);
    if (total) {
      let avg = (total / reviewStars.length).toFixed(0);
      return " ⭐".repeat(avg);
    } else {
      return <i>This cart does not have any ratings. Add your review!</i>;
    }
  };

  onReviewFormSubmit = review => {
    fetch(`http://localhost:3000/carts/${this.state.activeMarker.id}`)
      .then(resp => resp.json())
      .then(cart => {
        this.setState({
          carts: [...this.state.carts, cart]
        });
      });
    let newCarts = this.state.carts.filter(cart => cart.id !== review.cart_id);
    this.setState({
      activeMarker: {
        ...this.state.activeMarker,
        reviews: [...this.state.activeMarker.reviews, review]
      },
      carts: newCarts,
      cartReviews: [...this.state.activeMarker.reviews, review],
      modalShow: false
    });
  };

  onCartFormSubmit = cart => {
    this.setState({
      carts: [...this.state.carts, cart],
      modalCartShow: false
    });
  };

  handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(GoogleMap);
  };

  render() {
    const mapStyle = [
      {
        elementType: "geometry",
        stylers: [
          {
            color: "#ebe3cd"
          }
        ]
      },
      {
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#523735"
          }
        ]
      },
      {
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#f5f1e6"
          }
        ]
      },
      {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#c9b2a6"
          }
        ]
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#dcd2be"
          }
        ]
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#ae9e90"
          }
        ]
      },
      {
        featureType: "landscape.natural",
        elementType: "geometry",
        stylers: [
          {
            color: "#dfd2ae"
          }
        ]
      },
      {
        featureType: "poi",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
          {
            color: "#dfd2ae"
          }
        ]
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#93817c"
          }
        ]
      },
      {
        featureType: "poi.park",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#a5b076"
          }
        ]
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#447530"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [
          {
            color: "#f5f1e6"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
          {
            color: "#fdfcf8"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
          {
            color: "#f8c967"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#e9bc62"
          }
        ]
      },
      {
        featureType: "road.highway.controlled_access",
        elementType: "geometry",
        stylers: [
          {
            color: "#e98d58"
          }
        ]
      },
      {
        featureType: "road.highway.controlled_access",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#db8555"
          }
        ]
      },
      {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#806b63"
          }
        ]
      },
      {
        featureType: "transit",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "transit.line",
        elementType: "geometry",
        stylers: [
          {
            color: "#dfd2ae"
          }
        ]
      },
      {
        featureType: "transit.line",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#8f7d77"
          }
        ]
      },
      {
        featureType: "transit.line",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#ebe3cd"
          }
        ]
      },
      {
        featureType: "transit.station",
        elementType: "geometry",
        stylers: [
          {
            color: "#dfd2ae"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#b9d3c2"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#92998d"
          }
        ]
      }
    ];
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
        {this.props.displayHomePage}
        {console.log(this.props)}
        {localStorage.token ? (
          <div>
            <Button onClick={() => this.props.logOut(this.props.history)}>
              Log Out
            </Button>
            <Button onClick={() => this.setModalCartShow(true)}>
              Add Cart
            </Button>
          </div>
        ) : null}
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
              lat: this.state.currentPosition.lat,
              lng: this.state.currentPosition.lng
            }}
            options={{ styles: mapStyle }}
          >
            {window.google && (
              <Marker
                position={{
                  lat: this.state.currentPosition.lat,
                  lng: this.state.currentPosition.lng
                }}
                animation={window.google.maps.Animation.DROP}
              />
            )}
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
                <div align="center">
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
                  {localStorage.token ? (
                    <Button onClick={() => this.setModalShow(true)}>
                      Add Review
                    </Button>
                  ) : null}
                  <div align="left"><DisplayReview reviews={this.state.activeMarker.reviews} /></div>
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
              getAvgStars={this.getAvgStars}
            />
            <AddCartModal
              show={this.state.modalCartShow}
              onHide={() => this.setModalCartShow(false)}
              allCuisines={this.state.allCuisines}
              addCart={this.onCartFormSubmit}
            />
          </GoogleMap>
        </LoadScript>
      </div>
    );
  }
}
