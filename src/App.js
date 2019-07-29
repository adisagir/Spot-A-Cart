import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import CartsMap from "./components/CartsMap";
import SignupPage from "./components/SignupPage";

const profileAPI = "http://localhost:3000/profile";

export default class App extends React.Component {
  state = {
    loggedIn: false,
    current_user: {}
  };

  componentDidMount() {
    // --- fetch the user's profile with JWT Auth ---
    this.getProfileFromServer();
  }

  getProfileFromServer = () => {
    if (localStorage.token) {
      fetch(profileAPI, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`
        }
      })
        .then(res => res.json())
        .then(profileInfo => {
          this.setState({
            current_user: profileInfo,
            loggedIn: true
          });
        });
    }
  };

  // --- User can log in or log out ---
  logIn = () => {
    return this.getProfileFromServer();
  };

  logOut = history => {
    this.setState({
      loggedIn: !this.state.loggedIn
    });
    localStorage.clear();
    history.push("/login");
  };

  // --- Render to the browser with Routes ---
  render() {
    return (
      <Switch>
        {/* Route to the Map of Food Carts after logging in */}
        <Route
          exact
          path="/"
          render={routerProps => (
            <CartsMap
              current_user={this.state.current_user}
              logIn={this.logIn}
              {...routerProps}
              logOut={this.logOut}
              name={this.state.current_user.name}
              image={this.state.current_user.picture}
              review={this.state.reviews}
            />
          )}
        />
        {/* Route to the login page */}
        <Route
          exact
          path="/login"
          render={routerProps => (
            <LoginPage
              logIn={this.logIn}
              {...routerProps}
              user_id={this.state.current_user.id}
              name={this.state.current_user.name}
            />
          )}
        />
        {/* Route to the sign-up page, if already logged in then redirect to Map of Food Carts */}
        <Route
          exact
          path="/signup"
          render={routerProps =>
            this.state.loggedIn ? (
              <Redirect to="/" />
            ) : (
              <SignupPage logIn={this.logIn} {...routerProps} />
            )
          }
        />
      </Switch>
    );
  }
}
