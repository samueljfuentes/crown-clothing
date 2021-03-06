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
  unsubscribeFromSnapshot = null;
  
  componentDidMount() {
    const { setCurrentUser } = this.props;
    // when the user signs in or out, set the state to current user...
    // onAuthStateChanged attaches a listener for changes, and returns the userAuth object...
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // if signing in (ie: user auth does not equal null...)
      if (userAuth) {
        // createUserProfileDocument function returns the user Reference object...
        const userRef = await createUserProfileDocument(userAuth);
        
        // onSnapshot listens for changes to data, and returns a snapshot from the current reference of the userAuth...
        // basically a listener similar to onAuthStateChanged; must use it instead of get() so that we get a new snapshot everytime document is updated...
        // need snapshot for access to actual data...
        this.unsubscribeFromSnapshot = userRef.onSnapshot((snapshot) => {
          if (snapshot) {
            // set the state of currentUser to the snapshot.data (only available on snapshot, not ref), 
            // which is displayName, email, createdAt etc...
            setCurrentUser({
                id: snapshot.id,
                ...snapshot.data()
            })
          }
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
    this.unsubscribeFromSnapshot();
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
