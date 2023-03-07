import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex'
import { Buffer } from 'buffer';
import { CLIENT_ID, CLIENT_SECRET } from '../config';
import { tokenService } from '../services/TokenService';
import { AuthToken } from '../models/AuthToken';
import { TokenResponse } from '../models/TokenResponse';

const mutex = new Mutex()
const baseQuery = fetchBaseQuery({ baseUrl: '/' })
export const baseQueryWithReauth: BaseQueryFn<
    FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock();
    if (!args.url.includes('token')) {
        args = { ...args, headers: {
                ...args.headers,
                Authorization: 'Bearer ' + tokenService.getToken()
            }
        };
    }
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const refreshResult = await baseQuery(
                    {
                        url: 'https://accounts.spotify.com/api/token',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            Authorization: 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
                        },
                        body: new URLSearchParams({
                            grant_type: 'refresh_token',
                            refresh_token: tokenService.getRefreshToken()
                        })
                    },
                    api,
                    extraOptions
                );
                const data = refreshResult.data as TokenResponse;
                if (data) {
                    const tokenData = new AuthToken(data.access_token, data.refresh_token, data.expires_in);
                    tokenService.setTokenData(tokenData);
                    // retry the initial query
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    tokenService.logOut();
                    window.location.replace('/auth');
                }
            } finally {
                release();
            }
        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result
}
