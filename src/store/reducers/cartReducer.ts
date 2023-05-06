import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, FoodItem } from '../../types/interfaces';

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
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

    incrementCount: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const existingItem = state.items.find(i => i._id === id);

      if (existingItem) {
        existingItem.quantity++;
        state.totalQuantity++;
        state.totalPrice += existingItem.price;
      }
    },

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

    resetCart: state => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const {
  addItem,
  removeItem,
  incrementCount,
  decrementCount,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
