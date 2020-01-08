import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../../database/firebase.utils';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import './header.styles.scss';

// state values available from root reducer and mapping that state into these component props...
const Header = ({ currentUser, hidden }) => {
   return (
      <div className='header'>
         <Link to="/" className='logo-container'>
            <Logo className='logo'/>
         </Link>
         <div className='options'>
            <Link to='/shop' className='option'>SHOP</Link>
            <Link to='/shop' className='option'>CONTACT</Link>
            {
               currentUser ?
               <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
               :
               <Link to='/signin' className='option'>SIGN IN</Link>
            }
            <CartIcon />
         </div>
         { /* SHOW STATE FOR DROPDOWN WILL NOT LIVE ON EVENT HANDLER HERE,
            SINCE THE HEADER WILL NOT BE THE ONLY LOCATION TO DETERMINE SHOW STATE*/
         /* if hidden is true, display nothing, otherwise display cart... */ }
         { hidden ? null : <CartDropdown />}
      </div>
   )
}

///////////////
///// NOTE:
// MAP STATE TO PROPS GETS CALLED EVERYTIME STATE IS CHANGED (SINCE STATE CHANGES ARE RETURNS OF BRAND NEW OBJECTS...)
// REGARDLESS IF IT IS NOT CONCERNED WITH THE DATA BEING CHANGED...
const mapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser,
   hidden: selectCartHidden
});

// connect allows header to pull from the root reducer using mapStateToProps... 
// calling connect returns a higher order component that you THEN pass the header component into...
export default connect(mapStateToProps)(Header);