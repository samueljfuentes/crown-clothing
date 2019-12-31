import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
   currentUser: null
}

// es6 syntax setting state to initial state if it is undefined; null != undefined...
// all reducers take in the current state, and the action has 2 properties, state & payload...
const userReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case UserActionTypes.SET_CURRENT_USER:
         return {
            ...state,
            currentUser: action.payload
         }
   
      // return the state by default since every reducer gets every action, therefore we must check against it first and if it fails just set it to OG state...
      default: return state
   }
}

export default userReducer;
