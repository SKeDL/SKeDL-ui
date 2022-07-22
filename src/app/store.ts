import { ServiceGroupApi } from './../features/ServiceGroups/ServiceGroupsApi';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { AppApi } from '../features/api/AppApi';
import { authReducer } from '../features/auth/AuthSlice';
// import { UsersApi } from './api/UsersApi';

export const store = configureStore({
  reducer: {
    [AppApi.reducerPath]: AppApi.reducer,
    ServiceGroups: ServiceGroupApi.reducer,
    auth: authReducer,
    // users: UsersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AppApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
