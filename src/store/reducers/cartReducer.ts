import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, FoodItem } from '../../types/interfaces';

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

// Create the cartSlice using createSlice from Redux Toolkit
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Reducer to add an item to the cart
    addItem: (state, action: PayloadAction<FoodItem>) => {
      const item = action.payload;
      const existingItem = state.items.find(i => i._id === item._id);

      if (!existingItem) {
        state.items.push({
          ...item,
          quantity: 1,
        });
      } else {
        existingItem.quantity++;
      }

      state.totalQuantity++;
      state.totalPrice += item.price;
    },

    // Reducer to remove an item from the cart
    removeItem: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const existingItemIndex = state.items.findIndex(i => i._id === id);
      const existingItem = state.items[existingItemIndex];

      if (existingItem) {
        state.items.splice(existingItemIndex, 1);
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.price * existingItem.quantity;
      }
    },

    // Reducer to increment the quantity of an item in the cart
    incrementCount: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const existingItem = state.items.find(i => i._id === id);

      if (existingItem) {
        existingItem.quantity++;
        state.totalQuantity++;
        state.totalPrice += existingItem.price;
      }
    },

    // Reducer to decrement the quantity of an item in the cart
    decrementCount: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const existingItemIndex = state.items.findIndex(i => i._id === id);
      const existingItem = state.items[existingItemIndex];

      if (existingItem) {
        state.totalQuantity--;
        state.totalPrice -= existingItem.price;

        if (existingItem.quantity === 1) {
          state.items.splice(existingItemIndex, 1);
        } else {
          existingItem.quantity--;
        }
      }
    },

    // Reducer to reset the cart to initial state
    resetCart: state => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

// Export the action creators
export const {
  addItem,
  removeItem,
  incrementCount,
  decrementCount,
  resetCart,
} = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;
