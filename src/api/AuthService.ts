import { createApi } from '@reduxjs/toolkit/query/react';
import { AuthToken } from '../models/AuthToken';
import { Buffer } from 'buffer';
import { CLIENT_ID, CLIENT_SECRET, ROOT_ENDPOINT } from '../config';
import { TokenResponse } from '../models/TokenResponse';
import { baseQueryWithReauth } from './BaseQueryWithReauth';

export const AuthService = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: 'authApi',
  endpoints: build => ({
    getTokenByCode: build.query<AuthToken, string>({
      query: (code: string) => ({
        url: 'https://accounts.spotify.com/api/token',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization:
            'Basic ' +
            new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: `${ROOT_ENDPOINT}/authorize`,
        }),
      }),
      transformResponse(response: TokenResponse) {
        return new AuthToken(
          response.access_token,
          response.refresh_token,
          response.expires_in,
        );
      },
      transformErrorResponse: (
        response: { status: string | number },
        meta,
        arg,
      ) => response,
    }),
  }),
});
