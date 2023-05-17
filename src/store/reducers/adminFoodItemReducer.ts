import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdminFoodItemState } from '../../types/interfaces';

// Define the initial state
const initialState: AdminFoodItemState = {
  isLoading: false,
  deleteItem: null,
  deleteModalIsOpen: false,
};

// Create the foodSlice using createSlice from Redux Toolkit
export const foodSlice = createSlice({
  name: 'adminFoodItem',
  initialState,
  reducers: {
    // Reducer to set the isLoading state
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    // Reducer to set the deleteItem and deleteModalIsOpen state
    setDeleteItem: (state, action: PayloadAction<string>) => {
      state.deleteItem = action.payload;
      state.deleteModalIsOpen = true;
    },
    // Reducer to set the deleteModalIsOpen state and reset deleteItem if it's being closed
    setDeleteModalIsOpen: (state, action: PayloadAction<boolean>) => {
      state.deleteModalIsOpen = action.payload;
      if (!action.payload) {
        state.deleteItem = null;
      }
    },
  },
});

// Export the action creators
export const { setIsLoading, setDeleteItem, setDeleteModalIsOpen } =
  foodSlice.actions;

// Export the reducer
export default foodSlice.reducer;
