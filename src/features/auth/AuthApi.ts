import { TokenInfo, UserCredentials } from '../../types/Auth';
import { AppApi } from './../api/AppApi';

export const AuthApi = AppApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<TokenInfo, UserCredentials>({
      query: (credentials) => ({
        url: '/sessions',
        method: 'POST',
        params: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = AuthApi;
