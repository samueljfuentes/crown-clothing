import CartActionTypes from './cart.types';

const INITIAL_STATE = {
   hidden: true
};

const cartReducer = ( state = INITIAL_STATE, action ) => {
   switch (action.type) {
      // if the case is toggle dropdown, return a new object with the state spread into it, but
      // with the opposite hidden value. otherwise just return state as is...
      case CartActionTypes.TOGGLE_CART_DROPDOWN:
         return {
            ...state,
            hidden: !state.hidden
         }
      default:
         return state;
   }
};

export default cartReducer;