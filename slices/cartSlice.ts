import { createSlice } from '@reduxjs/toolkit'
import { toast } from "react-toastify";

export interface FiltersState {
  items: []
}

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //actions
    addToCart: (state, action) => {

      // check if item is already in cart
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        state.items[existingIndex] = {
          ...state.items[existingIndex],
          quantity: state.items[existingIndex].quantity + 1,
        };
        toast.info("Increased product quantity", {
          position: "bottom-left",
        });
      } else {
        let tempProductItem = { ...action.payload, quantity: 1 };
        // state.items.push(tempProductItem);
        state.items = [...state.items, tempProductItem]
        toast.success("Product added to cart", {
          position: "bottom-left",
        });
      }

    },
    removeFromCart: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id)

        let newBasket = [...state.items];

        if (index >= 0) {
          newBasket.splice(index, 1)
        } else {
          console.warn("unable to remove items from basket")
        }

        state.items = newBasket
    },
    decreaseQuantity(state, action) {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.items[itemIndex].quantity > 1) {
        state.items[itemIndex].quantity -= 1;

        toast.info("Decreased product quantity", {
          position: "bottom-left",
        });
      } else if (state.items[itemIndex].quantity === 1) { // then remove item from cart
        const nextCartItems = state.items.filter(
          (item) => item.id !== action.payload.id
        );

        state.items = nextCartItems;

        toast.error("Product removed from cart", {
          position: "bottom-left",
        });
      }
    },
  },
});

export const { addToCart, removeFromCart, decreaseQuantity } = cartSlice.actions;

export const selectItems = (state: { cart: FiltersState }) => state.cart.items;
export const selectTotal = (state) => 
  state.cart.items.reduce((total, item) => total + (item.price * item.quantity) , 0);

export default cartSlice.reducer;