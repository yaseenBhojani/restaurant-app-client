import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FoodItem, FoodState } from '../../types/interfaces';
import {
  createFood as createFoodHandler,
  getFoods as getFoodsHandler,
} from '../../api/foodApi';

export const createFood = createAsyncThunk(
  'foods/createFood',
  async (food: FoodItem) => {
    const response = await createFoodHandler(food);
    return response;
  }
);

export const getFoods = createAsyncThunk('foods/getFoods', async () => {
  const response = await getFoodsHandler();
  return response;
});

const initialState: FoodState = {
  isLoading: false,
  foods: [],
};

export const foodSlice = createSlice({
  name: 'foods',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Create Food
      .addCase(createFood.pending, state => {
        state.isLoading = true;
      })
      .addCase(createFood.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(createFood.rejected, (state, action) => {
        state.isLoading = false;
        console.error(action.error.message);
      })
      // Get Foods
      .addCase(getFoods.pending, state => {
        state.isLoading = true;
      })
      .addCase(getFoods.fulfilled, (state, action) => {
        state.isLoading = false;
        state.foods = action.payload;
      })
      .addCase(getFoods.rejected, (state, action) => {
        state.isLoading = false;
        console.error(action.error.message);
      });
  },
});

export default foodSlice.reducer;
