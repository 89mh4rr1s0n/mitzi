import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface FiltersState {
  search: string,
  brand: string[],
  category: string[],
  minPrice: number,
  maxPrice: number,
  rating: number,
  sort: string
}

const initialState: FiltersState = {
  search: '',
  brand: [],
  category: [],
  minPrice: 0,
  maxPrice: 0,
  rating: 0,
  sort: ''
}

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    // category reducers
    addCategory: (state, action) => {
      state.category.push(action.payload)
    },
    removeCategory: (state, action) => {
      let newList = [...state.category];
      newList.splice(state.category.indexOf(action.payload), 1)
      state.category = newList
    },
    clearCategories: (state) => {
      state.category = []
    },
    updateCategories: (state, action) => {
      state.category = action.payload
    },

    // brand reducers
    addBrand: (state, action) => {
      state.brand.push(action.payload)
    },
    removeBrand: (state, action) => {
      let newList = [...state.brand];
      newList.splice(state.brand.indexOf(action.payload), 1)
      state.brand = newList
    },
    clearBrands: (state) => {
      state.brand = []
    },

    // price reducers
    updateMinPrice: (state, action) => {
      state.minPrice = action.payload
    },
    updateMaxPrice: (state, action) => {
      state.maxPrice = action.payload
    },
  },
})

export const { 
  // category actions
  addCategory, removeCategory, clearCategories, updateCategories,
  // brand actions
  addBrand, removeBrand, clearBrands,
  // price actions
  updateMinPrice, updateMaxPrice,
 } = filtersSlice.actions;


// selectors
export const selectCategories = (state: RootState) => state.filters.category;
export const selectBrands = (state: RootState) => state.filters.brand;
export const selectRating = (state: RootState) => state.filters.rating;
export const selectMinPrice = (state: RootState) => state.filters.minPrice;
export const selectMaxPrice = (state: RootState) => state.filters.maxPrice;
export const selectAllFilters = (state: RootState) => state.filters;

export default filtersSlice.reducer