import CartActionTypes from './cart.types';

// will only allow for importing with destructuring...
export const toggleDropdown = () => ({
   type: CartActionTypes.TOGGLE_CART_DROPDOWN,
   // payload is an optional property, since it is not being used in the reducer it is not declared
});

export const addItem = (item) => ({
   type: CartActionTypes.ADD_ITEM,
   payload: item
})