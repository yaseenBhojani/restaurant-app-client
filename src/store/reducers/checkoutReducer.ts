import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CheckoutState, Order } from '../../types/interfaces';
import { createOrderHandler } from '../../api/orderApi';

// Async thunk for creating an order
export const createOrder = createAsyncThunk(
  'order/create',
  async (checkoutData: Order) => {
    console.log(checkoutData);
    const response = await createOrderHandler(checkoutData);
    return response;
  }
);

// Define the initial state for the checkout
const initialState: CheckoutState = {
  shippingAddress: {
    email: '',
    address: '',
    city: '',
    zip: '',
    country: '',
    saveAddress: false,
  },
  paymentMethod: {
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
    saveCard: false,
  },
};

// Create the checkoutSlice using createSlice from Redux Toolkit
const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    // Reducers for updating the shipping address
    setEmail: (state, action: PayloadAction<string>) => {
      state.shippingAddress.email = action.payload;
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.shippingAddress.address = action.payload;
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.shippingAddress.city = action.payload;
    },
    setZip: (state, action: PayloadAction<string>) => {
      state.shippingAddress.zip = action.payload;
    },
    setCountry: (state, action: PayloadAction<string>) => {
      state.shippingAddress.country = action.payload;
    },
    setSaveAddress: (state, action: PayloadAction<boolean>) => {
      state.shippingAddress.saveAddress = action.payload;
    },
    // Reducers for updating the payment method
    setCardName: (state, action: PayloadAction<string>) => {
      state.paymentMethod.cardName = action.payload;
    },
    setCardNumber: (state, action: PayloadAction<string>) => {
      state.paymentMethod.cardNumber = action.payload;
    },
    setExpDate: (state, action: PayloadAction<string>) => {
      state.paymentMethod.expDate = action.payload;
    },
    setCvv: (state, action: PayloadAction<string>) => {
      state.paymentMethod.cvv = action.payload;
    },
    setSaveCard: (state, action: PayloadAction<boolean>) => {
      state.paymentMethod.saveCard = action.payload;
    },
  },
  extraReducers: builder => {
    // Error handling for async actions
    builder.addMatcher(
      action => action.type.endsWith('/rejected'),
      (_, action) => {
        console.error(action.error.message);
      }
    );
  },
});

// Export the action creators
export const {
  setEmail,
  setAddress,
  setCity,
  setZip,
  setCountry,
  setSaveAddress,
  setCardName,
  setCardNumber,
  setExpDate,
  setCvv,
  setSaveCard,
} = checkoutSlice.actions;

// Export the reducer
export default checkoutSlice.reducer;
