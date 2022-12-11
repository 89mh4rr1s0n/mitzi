import {
  Action,
  AnyAction,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import productsReducer from './slices/productsSlice'
import filtersReducer from './slices/filtersSlice'
import cartReducer from './slices/cartSlice';

export default function getStore(preloadedState) {
  store = configureStore({
    reducer: {
      products: productsReducer,
      filters: filtersReducer,
      cart: cartReducer,
    },
    preloadedState,
  });
  return store;
}

export let store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filtersReducer,
    cart: cartReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch