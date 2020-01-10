import { combineReducers } from 'redux';
// for persisting data to local storage...
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

// config for redux persist storage,,,
const persistConfig = {
   key: 'root',
   storage,
   // whitelist property takes an array of string names of the reducers to be stored...
   whitelist: ['cart']
};

const rootReducer = combineReducers({
   user: userReducer,
   cart: cartReducer,
   directory: directoryReducer,
   shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer);