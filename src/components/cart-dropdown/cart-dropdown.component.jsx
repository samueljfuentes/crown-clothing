import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';

import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems }) => (
   <div className="cart-dropdown">
      <div className="cart-items">
         {
            cartItems.map((item) => (
               <CartItem key={item.id} item={item} />
            ))
         }
      </div>
      <CustomButton>GO TO CHECKOUT</CustomButton>
   </div>
);

///////////////
///// NOTE:
// MAP STATE TO PROPS GETS CALLED EVERYTIME STATE IS CHANGED (SINCE STATE CHANGES ARE RETURNS OF BRAND NEW OBJECTS...)
// REGARDLESS IF IT IS NOT CONCERNED WITH THE DATA BEING CHANGED...
const mapStateToProps = (state) => ({
   cartItems: selectCartItems(state)
});

export default connect(mapStateToProps)(CartDropdown);