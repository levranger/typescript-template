import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { isDefined } from '@rnw-community/shared';
import { Router } from 'next/router';
import { RootState } from '../app/store';
import { LoginPayloadInterface, UserInterface } from '../contracts';

// here we are typing the types for the state
type AuthState = {
  user: UserInterface | null;
  pending: boolean;
  error: boolean;
  errorMessage: string;
};

const initialState: AuthState = {
  user:
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  pending: false,
  error: false,
  errorMessage: '',
};

export const sendLoginRequest = createAsyncThunk(
  'auth/sendLoginRequest',
  async (userData: LoginPayloadInterface) => {
    const res = await fetch('https://tlcfin.prestoapi.com/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...userData }),
    });

    const response: UserInterface = await res.json();
    return response;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserAction(state, action: PayloadAction<UserInterface>) {
      state.user = action.payload;
    },
    logoutAction(state) {
      state.user = null;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('accessToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendLoginRequest.pending, (state) => {
        state.pending = true;
      })
      .addCase(sendLoginRequest.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.user = payload;
        localStorage.setItem('accessToken', payload.token);
        localStorage.setItem('userInfo', JSON.stringify(payload));
      })
      .addCase(sendLoginRequest.rejected, (state, action) => {
        state.pending = false;
        state.error = true;
        state.errorMessage = 'Invalid credentials';
      });
  },
});

export const { setUserAction, logoutAction } = authSlice.actions;

export const authSelector = (state: RootState): AuthState => state.auth;
export const isAuthorizedSelector = (state: RootState): boolean =>
  isDefined(state.auth.user);
export const userSelector = (state: RootState): UserInterface | null =>
  state.auth.user;

export default authSlice.reducer;
