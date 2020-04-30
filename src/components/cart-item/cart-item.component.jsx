import React from 'react';

import { 
   CartItemContainer,
   CartItemImg,
   CartItemDetails,
   CartItemName,
   CartItemPrice
 } from './cart-item.styles';


const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
   <CartItemContainer>
      <CartItemImg src={imageUrl} alt="item"/>
      <CartItemDetails>
         <CartItemName>{name}</CartItemName>
         <CartItemPrice>
            {quantity} x ${price}
         </CartItemPrice>
      </CartItemDetails>
   </CartItemContainer>
);

export default CartItem;