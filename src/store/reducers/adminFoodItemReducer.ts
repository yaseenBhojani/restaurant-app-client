import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AdminFoodItemState } from '../../types/interfaces';

const initialState: AdminFoodItemState = {
  isLoading: false,
  deleteItem: null,
  deleteModalIsOpen: false,
};

export const foodSlice = createSlice({
  name: 'adminFoodItem',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setDeleteItem: (state, action: PayloadAction<string>) => {
      state.deleteItem = action.payload;
      state.deleteModalIsOpen = true;
    },
    setDeleteModalIsOpen: (state, action: PayloadAction<boolean>) => {
      state.deleteModalIsOpen = action.payload;
      if (action.payload === false) state.deleteItem = null;
    },
  },
});

export const { setIsLoading, setDeleteItem, setDeleteModalIsOpen } =
  foodSlice.actions;

export default foodSlice.reducer;
