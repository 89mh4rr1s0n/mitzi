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
    addCategory: (state, action) => {
      state.category = [...state.category, action.payload]
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
      state.category = [action.payload]
    }
  },
})

export const { addCategory, removeCategory, clearCategories, updateCategories } = filtersSlice.actions;

export const selectCategories = (state) => state.filters.category;
export const selectBrands = (state) => state.filters.brand;
export const selectRating = (state) => state.filters.rating;
export const selectAllFilters = (state) => state.filters

export default filtersSlice.reducer