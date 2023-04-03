import { configureStore, combineReducers } from "@reduxjs/toolkit";
import localStorage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
// import { encryptTransform } from "redux-persist-transform-encrypt";
import searchReducer from "../reducers";
import productReducer from "../reducers/productReducer";
import cartReducer from "../reducers/cartReducer";
const persistConfig = {
  key: "root",
  storage: localStorage
  //   transforms: [
  //     encryptTransform({
  //       secretKey: process.env.REACT_APP_SECRET_KEY
  //     })
  //   ]
};

const bigReducer = combineReducers({
  search: searchReducer,
  product: productReducer,
  cart: cartReducer
});

const persistedReducer = persistReducer(persistConfig, bigReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export const persistor = persistStore(store);
