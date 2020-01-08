import { createSelector } from 'reselect';

// input selector that returns the cart from the state...
const selectCart = (state) => state.cart;

// output selector
// selectCartItems is a memoized selector created with createSelector (takes an array of input selectors, returns their respective state slices...)
export const selectCartItems = createSelector(
   [selectCart],
   (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
   [selectCart],
   (cart) => cart.hidden
);

export const selectItemCount = createSelector(
   [selectCartItems],
   (cartItems) => (cartItems.reduce((total, item) => (
      total + item.quantity
   ), 0))
);

export const selectCartTotal = createSelector(
   [selectCartItems],
   (cartItems) => (cartItems.reduce((total, item) => (
      total + (item.quantity * item.price)
   ), 0))
)