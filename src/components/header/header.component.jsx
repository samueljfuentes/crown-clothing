import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../../database/firebase.utils';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles';

// state values available from root reducer and mapping that state into these component props...
const Header = ({ currentUser, hidden }) => {
   return (
      <HeaderContainer>
         <LogoContainer to="/">
            <Logo className='logo'/>
         </LogoContainer>
         <OptionsContainer>
            <OptionLink to='/shop'>SHOP</OptionLink>
            <OptionLink to='/shop'>CONTACT</OptionLink>
            {
               currentUser ?
               <OptionLink as='div' onClick={() => auth.signOut()}>SIGN OUT</OptionLink>
               :
               <OptionLink to='/signin'>SIGN IN</OptionLink>
            }
            <CartIcon />
         </OptionsContainer>
         { /* SHOW STATE FOR DROPDOWN WILL NOT LIVE ON EVENT HANDLER HERE,
            SINCE THE HEADER WILL NOT BE THE ONLY LOCATION TO DETERMINE SHOW STATE*/ }
         { hidden ? null : <CartDropdown />}
      </HeaderContainer>
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