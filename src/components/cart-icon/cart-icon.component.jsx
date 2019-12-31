import React from 'react';
import { connect } from 'react-redux';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
// we want to toggle show or hide dropdown from clicking on the icon...
import { toggleDropdown } from '../../redux/cart/cart.actions';

import './cart-icon.styles.scss';

const CartIcon = ({ toggleDropdown }) => {
   return (
      <div className='cart-icon' onClick={toggleDropdown}>
         <ShoppingIcon className='shopping-icon' toggleDropdown='false'/>
         <span className="item-count">0</span>
      </div>
   )
};

// essentially the event listener that will call the toglleDropdown action, and dispatch all the the actions(functions) declared to all reducers,
// to determine if they must change state. sets code in motion...
// ie dispatch is a function of the redux store, provided with connect. store(or props).dispatch only way to trigger statechange...
const mapDispatchToProps = (dispatch) => {
   return {
      toggleDropdown: () => dispatch(toggleDropdown())
   }
}

// connect this component to be able to dispatch actions so other components can decide if they will receive as props...
export default connect(null, mapDispatchToProps)(CartIcon);