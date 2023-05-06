import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  AuthState,
  LoginUserProp,
  SignUpUserProp,
} from '../../types/interfaces';
import { createUser, isAuthUser, loginUser } from '../../api/userApi';

export const signUp = createAsyncThunk(
  'user/signup',
  async (user: SignUpUserProp) => {
    const response = await createUser(user);
    return response;
  }
);

export const login = createAsyncThunk(
  'user/login',
  async (user: LoginUserProp) => {
    const response = await loginUser(user);
    return response;
  }
);

export const isAuth = createAsyncThunk('user/isAuth', async () => {
  const response = await isAuthUser();
  return response;
});

const initialState: AuthState = {
  isLoading: false,
  isAuthenticated: false,
  role: 'USER',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.isAuthenticated = false;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      state.role = 'USER';
    },
  },
  extraReducers: builder => {
    // Signup
    builder.addCase(signUp.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(signUp.fulfilled, state => {
      state.isLoading = false;
    });
    builder.addCase(signUp.rejected, state => {
      state.isLoading = false;
    });

    // Login
    builder.addCase(login.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.role = action.payload.userCred.role;
    });
    builder.addCase(login.rejected, state => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.role = 'USER';
    });

    // IsAuth
    builder.addCase(isAuth.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(isAuth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.role = action.payload.role;
    });
    builder.addCase(isAuth.rejected, state => {
      state.isLoading = false;
      state.isAuthenticated = false;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
