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
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
   const exisitingCartItem = cartItems.find(
      (cartItem) => cartItem.id === cartItemToRemove.id
   )

   // if there is only one quantity of the removing item, clear the entire item...
   if (exisitingCartItem.quantity === 1) {
      return cartItems.filter((item) => item.id !== cartItemToRemove.id)
   }

   // if there is more than one quantity of the removing item,
   // check if the item matches the id of the removing item, and if so subtract one from the quantity of that item, otherwise just return the object as is...
   return cartItems.map(
      (cartItem) => cartItem.id === cartItemToRemove.id ? 
      { ...cartItem, quantity: cartItem.quantity - 1 } :
      cartItem
   )
}