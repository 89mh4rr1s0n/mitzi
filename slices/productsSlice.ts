import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
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
  return response.data.products 
})

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProducts.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    }
  }
})


export const selectProducts = (state) => state.products.products;
export const selectStatus = (state) => state.products.isLoading;
export const selectError = (state) => state.products.hasError;

export default productsSlice.reducer