import { Session } from './../../types/Auth';
import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { logOut, setCredentials } from '../auth/AuthSlice';

import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../../app/store';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://127.0.0.1:3000/',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.jwtToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: Record<string, unknown>
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const AccessToken = localStorage.getItem('AccessToken');
    const RefreshToken = localStorage.getItem('RefreshToken');
    const refreshResult = await baseQuery(
      {
        method: 'PUT',
        url: '/sessions',
        params: {
          AccessToken,
          RefreshToken,
        },
      },
      api,
      extraOptions
    );

    const session = refreshResult?.data as Session;
    if (
      session?.loginData?.refreshToken &&
      session?.loginData?.accessToken &&
      session?.loginData?.expireAt
    ) {
      api.dispatch(
        setCredentials({
          jwtToken: session?.loginData?.accessToken,
          refreshToken: session?.loginData?.refreshToken,
          expireAt: Number(session?.loginData?.expireAt),
        })
      );
      result = await baseQuery(args, api, extraOptions);
      localStorage.setItem('AccessToken', session?.loginData?.accessToken);
      localStorage.setItem('RefreshToken', session?.loginData?.refreshToken);
      localStorage.setItem('ExpireAt', `${session?.loginData?.expireAt}`);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const AppApi = createApi({
  reducerPath: 'AppApi',
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});
