import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import foodReducer from './reducers/foodReducer';
import cartReducer from './reducers/cartReducer';
import checkoutReducer from './reducers/checkoutReducer';
import orderReducer from './reducers/orderReducer';
import adminFoodItemReducer from './reducers/adminFoodItemReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  food: foodReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  order: orderReducer,
  adminFoodItem: adminFoodItemReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // disable serializable check
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
