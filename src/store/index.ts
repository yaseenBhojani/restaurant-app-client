import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import foodReducer from './reducers/foodReducer';
import cartReducer from './reducers/cartReducer';
import checkoutReducer from './reducers/checkoutReducer';
import orderReducer from './reducers/orderReducer';
import adminFoodItemReducer from './reducers/adminFoodItemReducer';

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  food: foodReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  order: orderReducer,
  adminFoodItem: adminFoodItemReducer,
});

// Configure and create the Redux store
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false, // Disable serializable check for non-serializable actions
  }),
});

// Export types for easier type inference in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
