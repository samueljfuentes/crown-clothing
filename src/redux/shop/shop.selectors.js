import { createSelector } from 'reselect';

const mapIdToCollection = {
   hats: 1,
   sneakers: 2,
   jackets: 3,
   womens: 4,
   mens: 5
};

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
   [selectShop],
   (shop) => shop.collections 
);
// selectCurrentSelection is a curried function (ie. returns another function) that returns createSelector function...
export const selectCurrentCollection = (collectionUrlParam) => (
   createSelector(
      [selectCollections],
      (collections) => collections.find((collection) => collection.id === mapIdToCollection[collectionUrlParam])
   )
);
