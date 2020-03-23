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
   // must check if collections exists since the original state is null until it is brought in from back end...
   (collections) => collections ? Object.keys(collections).map((key) => collections[key]) : []
)

// selectCurrentSelection is a curried function (ie. returns another function) that returns createSelector function...
export const selectCurrentCollection = (collectionUrlParam) => (
   createSelector(
      [selectCollections],
      (collections) => (collections ? collections[collectionUrlParam.toLowerCase()] : null)
   )
);

export const selectIsCollectionFetching = createSelector(
   [selectShop],
   (shop) => shop.isFetching
);

export const selectIsCollectionLoaded = createSelector(
   [selectShop],
   // double bang takes the following value and transforms it to true or false if value is truthy or falsey...
   (shop) => !!shop.collections
);