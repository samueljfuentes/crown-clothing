import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// we want to toggle show or hide dropdown from clicking on the icon...
import { toggleDropdown } from '../../redux/cart/cart.actions';
import { selectItemCount } from '../../redux/cart/cart.selectors';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';

const CartIcon = ({ toggleDropdown, itemCount }) => {
   return (
      <div className='cart-icon' onClick={toggleDropdown}>
         <ShoppingIcon className='shopping-icon'/>
         <span className="item-count">{itemCount}</span>
      </div>
   )
};

// essentially the event listener that will call the toglleDropdown action, and dispatch all the the actions(functions) declared to all reducers,
// to determine if they must change state. sets code in motion...
// ie dispatch is a function of the redux store, provided with connect. store(or props).dispatch only way to trigger statechange...
const mapDispatchToProps = (dispatch) => ({
   // toggleDropdown prop is a function that dispatches the toggleDropdown action to all reducers...
   toggleDropdown: () => dispatch(toggleDropdown())
})

///////////////
///// NOTE:
// MAP STATE TO PROPS GETS CALLED EVERYTIME STATE IS CHANGED (SINCE STATE CHANGES ARE RETURNS OF BRAND NEW OBJECTS...)
// REGARDLESS IF IT IS NOT CONCERNED WITH THE DATA BEING CHANGED...
// create itemCount property on state...
// must pass entire state since the input selectors require it to build selectItemCount...
const mapStateToProps = createStructuredSelector({
   itemCount: selectItemCount
});

// connect this component to be able to dispatch actions so other components can decide if they will receive as props...
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);