# Spot-A-Cart README

<img src="https://i.imgur.com/ap83kGn.png" alt="spot-a-cart" width="700"/>

## Description
A web application that allows users to find food carts near their location and leave reviews about the carts. Users can also add new food carts to the app. When logged out users can only view food carts and read reviews, but are not able to write reviews or add a new food cart. Once logged in, users can write reviews of food carts and add new food carts.

## Technologies Used
- ReactJS
- Rails
- JWT Authorization
- Google Maps API
- CSS

## Features

### Browsing The Map
To get the most out of Spot-A-Cart users must enable location sharing on their browser.
<img src="https://i.imgur.com/Z70lRzY.png" alt="map" width="700"/>

### Viewing Cart Details
After a user has enabled location services, they can see which carts are closest to their location. Clicking on the cart brings up additional details. <br>
<img src="https://media.giphy.com/media/YPzgsWOelikaU21cbL/giphy.gif" alt="details" width="700"/>

### Sign Up
Users can sign up to Spot-A-Cart by entering the required fields (name, username, and password). If a required field is missing an error msg will display. 
<img src="https://media.giphy.com/media/gkQjUKkcnyXZh0i9HU/giphy.gif" alt="signup" width="700"/>

### Reviews
After clicking on a cart, logged in users can leave a review for that food cart. They can leave a review by typing in their comments and use a sliding scale to leave a numerical rating.
<img src="https://media.giphy.com/media/mCPqZF9riiAUH9h6mR/giphy.gif" alt="reviews" width="700"/>

### Add a Cart
Logged in users are able to add carts to Spot-A-Cart. Since we have not listed every food cart in existence, a great way to build it out will be through crowd sourcing. Only required fields are Name and Address however users can enter more detailed information like Menu and Cuisine.
<img src="https://media.giphy.com/media/YPtcF2FI5nTdrdFyYv/giphy.gif" alt="newcart" width="700"/>
