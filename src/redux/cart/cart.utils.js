export const addItemToCart = (cartItems, cartItemToAdd) => {
   const doesItemExist = cartItems.find(
      cartItem => (cartItem.id === cartItemToAdd.id)
   );

   if (doesItemExist) {
      return cartItems.map(
         cartItem => cartItem.id === cartItemToAdd.id ? 
         { ...cartItem, quantity: cartItem.quantity + 1 } :
         cartItem
      )
   }

   // when item is added the first time, only this code will run and therefore
   // quantity property gets added initially here...
   return [
      ...cartItems,
      { ...cartItemToAdd, quantity: 1 }
   ]
}