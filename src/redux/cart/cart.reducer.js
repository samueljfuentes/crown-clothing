import CartActionTypes from './cart.types';
import { addItemToCart } from './cart.utils';

const INITIAL_STATE = {
   hidden: true,
   cartItems: []
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
         // for case addItem...
         case CartActionTypes.ADD_ITEM:
            return {
               ...state,
               // has to be a new array, cannot push when modifying state...
               cartItems: addItemToCart(state.cartItems, action.payload)
            }
      default:
         return state;
   }
};

export default cartReducer;