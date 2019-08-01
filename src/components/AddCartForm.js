import React, { Component } from "react";
import Button from "@material/react-button";
import TextField, { Input } from "@material/react-text-field";
import Select, { Option } from "@material/react-select";

const cartsAPI = "http://localhost:3000/carts";

export default class AddCartForm extends Component {
  state = {
    name: "",
    address: "",
    image_url: "",
    website_url: "",
    menu_url: "",
    cuisine_id: 0
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: this.state.address }, (results, status) => {
      console.log(this);
      fetch(cartsAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({
          name: this.state.name,
          latitude: results[0].geometry.location.lat(),
          longitude: results[0].geometry.location.lng(),
          image_url: this.state.image_url,
          website_url: this.state.website_url,
          menu_url: this.state.menu_url,
          cuisine_id: this.state.cuisine_id
        })
      })
        .then(res => res.json())
        .then(data => this.props.addCart(data));
    });
  };

  handleFormChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    console.log(this.props);
    const { allCuisines } = this.props;

    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <br />
          <TextField label="Name">
            <Input
              type="text"
              name="name"
              onChange={this.handleFormChange}
              value={this.state.name}
              required
            />
          </TextField>
          <br />
          <TextField label="Address">
            <Input
              type="text"
              name="address"
              onChange={this.handleFormChange}
              value={this.state.address}
              required
            />
          </TextField>
          <br />
          <TextField label="Cart Image">
            <Input
              type="text"
              alt="Cart"
              name="image_url"
              onChange={this.handleFormChange}
              value={this.state.image_url}
            />
          </TextField>
          <br />
          <TextField label="Website">
            <Input
              type="text"
              name="website_url"
              onChange={this.handleFormChange}
              value={this.state.website_url}
            />
          </TextField>
          <br />
          <TextField label="Menu">
            <Input
              type="text"
              name="menu_url"
              onChange={this.handleFormChange}
              value={this.state.menu_url}
            />
          </TextField>
          <br />
          <Select
            label="Cuisine"
            name="cuisine_id"
            onChange={this.handleFormChange}
            value={this.state.cuisine_id}
          >
            <Option disabled selected value="" />
            {allCuisines && allCuisines.length > 0
              ? allCuisines.map(cuisines => (
                  <Option value={cuisines.id}>{cuisines.name}</Option>
                ))
              : null}
          </Select>
          <br />
          <Button type="submit" name="submit">
            Submit
          </Button>
        </form>
      </div>
    );
  }
}
