import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  userId?: string;
  jwtToken?: string;
  refreshToken?: string;
  expireAt?: number;
  isLoggedIn?: boolean;
}

const initialState: AuthState = {
  userId: undefined,
  jwtToken: localStorage.getItem('AccessToken') || undefined,
  refreshToken: localStorage.getItem('RefreshToken') || undefined,
  expireAt: Number(localStorage.getItem('ExpireAt')) || undefined,
  isLoggedIn:
    !!localStorage.getItem('AccessToken') &&
    !!localStorage.getItem('RefreshToken'),
};

const AuthSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      console.log('payload', action.payload);
      state.jwtToken = action.payload.jwtToken;
      state.refreshToken = action.payload.refreshToken;
      state.expireAt = action.payload.expireAt;
      state.isLoggedIn =
        !!action.payload.jwtToken && !!action.payload.refreshToken;
      localStorage.setItem('AccessToken', action.payload.jwtToken || '');
      localStorage.setItem('RefreshToken', action.payload.refreshToken || '');
      localStorage.setItem('ExpireAt', `${action.payload.expireAt || ''}`);
    },
    logOut: (state, _action: PayloadAction<void>) => {
      state.userId = undefined;
      state.jwtToken = undefined;
      state.refreshToken = undefined;
      state.expireAt = undefined;
      state.isLoggedIn = false;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logOut } = AuthSlice.actions;
export const authReducer = AuthSlice.reducer;
