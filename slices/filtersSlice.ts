import { createSlice } from '@reduxjs/toolkit'

export interface FiltersState {
  search: string,
  brand: string[],
  category: string[],
  price: number,
  rating: number,
  sort: string
}

const initialState: FiltersState = {
  search: '',
  brand: [],
  category: [],
  price: 0,
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
    clearCategories: (state, action) => {
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
  },
})

export const { 
  // category actions
  addCategory, removeCategory, clearCategories, updateCategories,
  // brand actions
  addBrand, removeBrand
 } = filtersSlice.actions;

export const selectCategories = (state) => state.filters.category;
export const selectBrands = (state) => state.filters.brand;
export const selectRating = (state) => state.filters.rating;
export const selectAllFilters = (state) => state.filters

export default filtersSlice.reducer