import { createSlice, createAsyncThunk, createSelector, AnyAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { Product, ProductData } from '../typings'


const productsUrl = "https://dummyjson.com/products?limit=100"

export interface ProductsState {
  products: ProductData,
  isLoading: boolean,
  hasError: boolean
}

const initialState: ProductsState = {
  products: {
    limit: 0,
    products: [],
    skip: 1,
    total: 1
  },
  isLoading: false,
  hasError: false
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get(productsUrl)
  const data:ProductData = response.data
  return data
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


export const selectProducts = (state: { products: { products: any } }) => state.products.products;
export const selectStatus = (state: { products: { isLoading: any } }) => state.products.isLoading;
export const selectError = (state: { products: { hasError: any } }) => state.products.hasError;

export const selectCategories = createSelector(selectProducts, (a) => {
  return a.products?.map((p:Product) => p.category).reduce(function (a:Product[], b:Product) { if (a.indexOf(b) < 0) a.push(b); return a; }, []).sort()
})

export const selectMostDiscounted = createSelector(selectProducts, (a) => {
  return a.products?.slice().sort((a:Product, b:Product) => b.discountPercentage - a.discountPercentage).slice(0, 10)
})

export const selectTopRated = createSelector(selectProducts, (a) => {
  return a.products?.slice().sort((a:Product, b:Product) => b.rating - a.rating).slice(0, 10)
})

export default productsSlice.reducer