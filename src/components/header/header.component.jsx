import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../../database/firebase.utils';

import './header.styles.scss';

const Header = ({ currentUser }) => {
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
         </div>
      </div>
   )
}

// pull the state from the root reducer calling ther userReducer function and pulling the currentUserProperty set on the state,
// and setting it to the currentUser the header is displaying
const mapStateToProps = (state) => {
   return ({
      currentUser: state.user.currentUser
   })
}

// connect allows header to pull from the root reducer using mapStateToProps... 
// calling connect returns a higher order component that you THEN pass the header component into...
export default connect(mapStateToProps)(Header);