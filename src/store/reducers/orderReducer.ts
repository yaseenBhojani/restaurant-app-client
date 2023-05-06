import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ChangeOrderStatus, OrderState } from '../../types/interfaces';
import {
  getAllOrdersHandler,
  getOrdersHandler,
  changeOrderStatusHandler,
} from '../../api/orderApi';

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

const initialState: OrderState = {
  isLoading: false,
  items: [],
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
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
      .addCase(changeOrderStatus.pending, state => {
        state.isLoading = true;
      })
      .addCase(changeOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
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

export const {} = orderSlice.actions;

export default orderSlice.reducer;
