import { createSlice } from '@reduxjs/toolkit'

export interface FiltersState {
  search: string,
  brand: string[],
  category: string[],
  price: number,
  rating: number
}

const initialState: FiltersState = {
  search: '',
  brand: [],
  category: [],
  price: 0,
  rating: 0
}

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    // toggleCategory: (state, action) => {
    //   if (state.category.filter(i => i === action.payload).includes(action.payload)) {
    //     let newList = [...state.category];
    //     newList.splice(state.category.indexOf(action.payload), 1)
    //     state.category = newList
    //   } else {
    //     state.category = [...state.category, action.payload]
    //   }
    // }
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
    }
  },
})

export const { addCategory, removeCategory, clearCategories } = filtersSlice.actions;

export const selectCategories = (state) => state.filters.category;
export const selectBrands = (state) => state.filters.brand;
export const selectRating = (state) => state.filters.rating;

export default filtersSlice.reducer