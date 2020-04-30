import React from 'react';
import { connect } from 'react-redux';

import { clearItemFromCart, addItem, removeItem } from '../../redux/cart/cart.actions';

import { 
   CheckoutItemContainer,
   CheckoutImageContainer,
   CheckoutItemImage,
   ChekcoutItemText,
   CheckoutItemQuantity,
   RemoveButton
 } from './checkout-item.styles';

const checkoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
   const { name, imageUrl, price, quantity } = cartItem;

   return (
      <CheckoutItemContainer>
         <CheckoutImageContainer>
            <CheckoutItemImage src={imageUrl} alt="Item image"/>
         </CheckoutImageContainer>
         <ChekcoutItemText>{name}</ChekcoutItemText>
         <CheckoutItemQuantity>
            <div className="arrow" onClick={() => removeItem(cartItem)}>&#10094;</div>
            <span className="value">{quantity}</span>
            <div className="arrow" onClick={() => addItem(cartItem)}>&#10095;</div>
         </CheckoutItemQuantity>
         <ChekcoutItemText>${price}</ChekcoutItemText>
         <RemoveButton onClick={() => clearItem(cartItem)}>&#10006;</RemoveButton>
      </CheckoutItemContainer>
   )
};

const mapDispatchToProps = (dispatch) => ({
   addItem: (item) => dispatch(addItem(item)),
   removeItem: (item) => dispatch(removeItem(item)),
   clearItem: (item) => dispatch(clearItemFromCart(item))
}); 

export default connect(null, mapDispatchToProps)(checkoutItem);

