import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import axios from 'axios'

const productsUrl = "https://dummyjson.com/products?limit=100"

export interface ProductsState {
  products: [],
  isLoading: boolean,
  hasError: boolean
}

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  hasError: false
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get(productsUrl)
  // return response.data.products
  return response.data
})

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
  }
})


export const selectProducts = (state) => state.products.products;
export const selectStatus = (state) => state.products.isLoading;
export const selectError = (state) => state.products.hasError;

export const selectCategories = createSelector(selectProducts, (a) => {
  return a.products?.map(p => p.category).reduce(function (a, b) { if (a.indexOf(b) < 0) a.push(b); return a; }, []).sort()
})

export const selectMostDiscounted = createSelector(selectProducts, (a) => {
  return a.products?.slice().sort((a, b) => b.discountPercentage - a.discountPercentage).slice(0, 10)
})

export const selectTopRated = createSelector(selectProducts, (a) => {
  return a.products?.slice().sort((a, b) => b.rating - a.rating).slice(0, 10)
})

export default productsSlice.reducer