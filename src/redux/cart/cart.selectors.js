import { createSelector } from 'reselect';

// input selector that returns the cart from the state...
const selectCart = (state) => state.cart;

// output selector
// selectCartItems is a memoized selector created with createSelector (takes an array of input selectors, returns their respective state slices...)
export const selectCartItems = createSelector(
   [selectCart],
   (cart) => cart.cartItems
);

export const selectItemCount = createSelector(
   [selectCartItems],
   (cartItems) => (cartItems.reduce((total, item) => (
      total + item.quantity
   ), 0))
);