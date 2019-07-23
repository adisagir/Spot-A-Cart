import React from "react";
import { Item, Button } from "semantic-ui-react";

const CartMapWindow = (props) => {
  const { cart } = props
  
  const handleClick = (e) => {
    props.toggleShowPage(cart)
  }

  return(
    <Item>
      <Item.Image
      src={cart.image_url}
      size="small"
      />
      <Item.Content>
        <Item.Header>
          <strong>
            {cart.name}
          </strong>
        </Item.Header>
        <Item.Meta>
          <span>
            <i>

            </i>
          </span>
        </Item.Meta>
      </Item.Content>
    </Item>
  ) 
}

export default CartMapWindow