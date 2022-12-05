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

// let store;
// export const initialiseStore = (preloadedState) => {
//   let _store = store ?? getStore(preloadedState);

//   if (preloadedState && store) {
//    _store = getStore({ ...store.getState(), ...preloadedState });
//     store = undefined;
//   }

//   // For SSG and SSR always create a new store
//   if (typeof window === 'undefined') return _store;
//   // Create the store once in the client
//   if (!store) store = _store;

//   return _store;
// };

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

// const combinedReducer = combineReducers({
//   products: productsReducer,
//   filters: filtersReducer,
// });

// const reducer = (state: ReturnType<typeof combinedReducer>, action: AnyAction) => {
//   if (action.type === HYDRATE) {
//     const nextState = {
//       ...state, // use previous state
//       ...action.payload, // apply delta from hydration
//     };
//     return nextState;
//   } else {
//     return combinedReducer(state, action);
//   }
// };

// export const makeStore = () =>
//   configureStore({
//     reducer,
//   });

// type Store = ReturnType<typeof makeStore>;

// export type AppDispatch = Store['dispatch'];
// export type RootState = ReturnType<Store['getState']>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;

// export const wrapper = createWrapper(makeStore, { debug: true });