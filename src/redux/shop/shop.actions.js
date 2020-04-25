import ShopActionTypes from './shop.types';

import { firestore, convertCollectionSnapshotToMap } from '../../database/firebase.utils';


export const fetchCollectionsStart = (collectionsMap) => ({
   type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
   type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
   payload: collectionsMap
});

export const fetchCollectionsFailure = (errorMessage) => ({
   type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
   payload: errorMessage
});

// this code was moved here to abstract away the function of pulling in the shop collection from the individual components...
// an async function (THUNK) that returns and runs the dispatch function...
export const fetchCollectionsStartAsync = () => {
   return (dispatch) => {
      // create the ref...
      const collectionRef = firestore.collection('collections');  
      // dispatch the fetchcollectionsstart action, that sets the is fetching in reducer to true...    
      dispatch(fetchCollectionsStart());
      // then makes the following async request...
      collectionRef.get().then((snapshot) => {
         const collectionsMap = convertCollectionSnapshotToMap(snapshot);
         dispatch(fetchCollectionsSuccess(collectionsMap));
      }).catch((error) => dispatch(fetchCollectionsFailure(error.message)));
   }
}