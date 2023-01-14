import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toast } from "react-toastify";
import { Product, CartItem } from '../typings';

export interface FiltersState {
  items: CartItem[]
}

const initialState: { items: CartItem[] } = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //actions
    addToCart: (state, action: PayloadAction<Product>) => {

      // check if item is already in cart
      const existingIndex: number = state.items.findIndex(
        (item: CartItem) => item.id === action.payload.id
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
        state.items = [...state.items, tempProductItem]
        toast.success("Product added to cart", {
          position: "bottom-left",
        });
      }

    },
    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      const index = state.items.findIndex(
        (basketItem: CartItem) => basketItem.id === action.payload.id)

      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1)
      } else {
        console.warn("unable to remove items from basket")
      }

      state.items = newBasket
    },
    decreaseQuantity(state, action: PayloadAction<CartItem>) {
      const itemIndex = state.items.findIndex(
        (item: CartItem) => item.id === action.payload.id
      );

      if (state.items[itemIndex].quantity > 1) {
        state.items[itemIndex].quantity -= 1;

        toast.info("Decreased product quantity", {
          position: "bottom-left",
        });
      } else if (state.items[itemIndex].quantity === 1) { // then remove item from cart
        const nextCartItems = state.items.filter(
          (item: CartItem) => item.id !== action.payload.id
        );

        state.items = nextCartItems;

        toast.error("Product removed from cart", {
          position: "bottom-left",
        });
      }
    },
    changeQuantity(state, action) {
      const itemIndex = state.items.findIndex(
        (item: CartItem) => item.id === action.payload.item.id
      );
      state.items[itemIndex].quantity = action.payload.value;
    },
    clearCart: (state, action) => {
      state.items = []
    },
  },
});

export const { addToCart, removeFromCart, decreaseQuantity, changeQuantity, clearCart } = cartSlice.actions;

export const selectItems = (state: { cart: FiltersState }) => state.cart.items;
export const selectTotal = (state: { cart: FiltersState }) =>
  state.cart.items.reduce((total, item: CartItem) => total + (item.price * item.quantity), 0);

export default cartSlice.reducer;