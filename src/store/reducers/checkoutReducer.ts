import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CheckoutState, Order } from '../../types/interfaces';
import { createOrderHandler } from '../../api/orderApi';

export const createOrder = createAsyncThunk(
  'order/create',
  async (checkoutData: Order) => {
    console.log(checkoutData);
    const response = await createOrderHandler(checkoutData);
    return response;
  }
);

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

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
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
    builder.addMatcher(
      action => action.type.endsWith('/rejected'),
      (_, action) => {
        console.error(action.error.message);
      }
    );
  },
});

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

export default checkoutSlice.reducer;
