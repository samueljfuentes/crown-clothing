import { createSelector } from 'reselect';

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
   [selectShop],
   (shop) => shop.collections 
);

// converted data from array to object, since collecetion overview component expects an array we must convert back to array...
export const selectCollectionsForPreview = createSelector(
   [selectCollections],
   // takes the collections, and returns an array of the keys, then map over those keys to return the value at that key...
   // ie.. will return the array at that key array...
   (collections) => Object.keys(collections).map((key) => collections[key])
)

// selectCurrentSelection is a curried function (ie. returns another function) that returns createSelector function...
export const selectCurrentCollection = (collectionUrlParam) => (
   createSelector(
      [selectCollections],
      (collections) => collections[collectionUrlParam]
   )
);
