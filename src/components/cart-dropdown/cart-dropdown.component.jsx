import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleDropdown } from '../../redux/cart/cart.actions';

import './cart-dropdown.styles.scss';

// dispatch is passed in as a prop automatically if connect does not receive a second paramater (mapDispatchToProps)...
const CartDropdown = ({ cartItems, history, dispatch }) => (
   <div className="cart-dropdown">
      <div className="cart-items">
         {
            cartItems.length ?
            
            cartItems.map((item) => (
               <CartItem key={item.id} item={item} />
            )) :

            (<span className="empty-message">Your cart is empty!</span>)
         }
      </div>
      <CustomButton onClick={() => {
         history.push('/checkout');
         dispatch(toggleDropdown());
         }}>
            GO TO CHECKOUT
      </CustomButton>
   </div>
);

///////////////
///// NOTE:
// MAP STATE TO PROPS GETS CALLED EVERYTIME STATE IS CHANGED (SINCE STATE CHANGES ARE RETURNS OF BRAND NEW OBJECTS...)
// REGARDLESS IF IT IS NOT CONCERNED WITH THE DATA BEING CHANGED...
const mapStateToProps = createStructuredSelector({
   cartItems: selectCartItems
});

// order matters below; evaluates from inside -> out; component must first be returned with props,
// before it can be passed into withRouter...
export default withRouter(connect(mapStateToProps)(CartDropdown));