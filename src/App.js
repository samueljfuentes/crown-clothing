import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth, createUserProfileDocument } from './database/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInSignUp from './pages/sign-in-sign-up/sign-in-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

import './App.css';

class App extends React.Component {

  // unsubscribe initially set to null, so that if no one signs in or signs out (userAuth = null), it will always set user equal to null...
  unsubscribeFromAuth = null;
  
  componentDidMount() {
    const { setCurrentUser } = this.props;
    // when the user signs in or out, set the state to current user...
    // onAuthStateChanged attaches a listener for changes, and gives access to the userAuth object...
    // will set this.unsubscribeFromAuth to null if no userAuth is available...
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // if signing in (ie: returning a userAuth object...)
      if (userAuth) {
        // save the reference object that is created from the current userAuth in the createUserProfileDocument function... 
        const userRef = await createUserProfileDocument(userAuth);
        
        // on snapshot returns a snapshot from the current reference of the userAuth...
        // basically a listener similar to onAuthStateChanged that give us the ability to do something with the snapshot...
        // remember snapshots have access to different properties & methods such as exists and data();
        userRef.onSnapshot((snapshot) => {
          // set the state of currentUser to the snapshot.data, which is displayName, email, createdAt, and additional data such as cart, etc...
          // id is not available on the snapshot, so we must set it using the reference object...
          setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
          })
        });
      }
      // if no userAuth (ie: null ie: signing out) set the currentUser to null also...
      setCurrentUser(userAuth);
    });
  };

  componentWillUnmount() {
    // call unsuscribe from Auth when component is about to unmount, so that the user info does not leak. otherwise the subscription will remain signed in...
    // at this point, calling unsubscribeFromAuth will cause currentUser state to be set to null;
    this.unsubscribeFromAuth();
  }

  render() {
    // by placing header outside of switch, it will always render regardles of what switch decides to render...
    // if the path is exactly as stated, route to path. if the path contains shop, route to shop...
    return (
      // the render method in route to the signin will redirect to the shop page if a user exists, otherwise will proceed to signin and signup page...
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route exact path='/checkout' component={CheckoutPage}/>
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/'/>) : (<SignInSignUp />)} />
        </Switch>
      </div>
    );
  }
};

// Give app access to state from the root reducer, and set the currentUser...
// off the state, destructure user reducer (ie. state.user)
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = (dispatch) => {
  return ({
    // we set a new setcurrentuser property, that points to a function that takes a user and dispatches objects to all reducers that match a payload of that user...
    // dispatch takes the argument and passes it to every reducer as an action...
    // setcurrentuser returns an object action, so we call it with the user, and dispatch an object with the payload of user...
    setCurrentUser: (user) => dispatch(setCurrentUser(user))
  })
};

// connect does not take an initial state in this case, as we are just giving app access to dispatching props, so it is set to null...
export default connect(mapStateToProps, mapDispatchToProps)(App);
