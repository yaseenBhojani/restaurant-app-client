import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ChangeOrderStatus, OrderState } from '../../types/interfaces';
import {
  getAllOrdersHandler,
  getOrdersHandler,
  changeOrderStatusHandler,
} from '../../api/orderApi';

// Async thunks for retrieving orders and changing order status
export const getOrders = createAsyncThunk('get/orders', getOrdersHandler);

export const getAllOrders = createAsyncThunk(
  'get/allOrders',
  getAllOrdersHandler
);

export const changeOrderStatus = createAsyncThunk(
  'patch/changeStatus',
  async ({ id, status }: ChangeOrderStatus) => {
    const response = await changeOrderStatusHandler({ id, status });
    return response;
  }
);

// Define the initial state for the order slice
const initialState: OrderState = {
  isLoading: false,
  items: [],
};

// Create the orderSlice using createSlice from Redux Toolkit
export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Get Orders
      .addCase(getOrders.pending, state => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        console.log(action.payload);
      })
      .addCase(getOrders.rejected, state => {
        state.isLoading = false;
      })
      // Get All Orders
      .addCase(getAllOrders.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        console.log(action.payload);
      })
      .addCase(getAllOrders.rejected, state => {
        state.isLoading = false;
      })
      // Change Order Status
      .addCase(changeOrderStatus.pending, state => {
        state.isLoading = true;
      })
      .addCase(changeOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.map(item => {
          if (item._id === action.payload.id) {
            return action.payload;
          }
          return item;
        });
      })
      .addCase(changeOrderStatus.rejected, state => {
        state.isLoading = false;
      });
  },
});

// Export the reducer
export default orderSlice.reducer;
