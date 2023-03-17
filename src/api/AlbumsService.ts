import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './BaseQueryWithReauth';
import { RawAlbum, RawFullAlbumInfo } from '../models/RawAlbum';
import { Album, FullAlbumInfo } from '../models/Album';

export const AlbumsService = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: 'albumsApi',
  endpoints: build => ({
    getAlbum: build.query<FullAlbumInfo, string>({
      query: id => ({
        url: `https://api.spotify.com/v1/albums/${id}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      transformResponse(album: RawFullAlbumInfo) {
        return new FullAlbumInfo(album);
      },
      transformErrorResponse: (
        response: { status: string | number },
        meta,
        arg,
      ) => response,
    }),
    getNewReleases: build.query<{ albums: Album[] }, void>({
      query: () => ({
        url: 'https://api.spotify.com/v1/browse/new-releases',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      transformResponse({ albums }: { albums: { items: RawAlbum[] } }) {
        return {
          albums: albums.items.map((album: RawAlbum) => new Album(album)) || [],
        };
      },
      transformErrorResponse: (
        response: { status: string | number },
        meta,
        arg,
      ) => response,
    }),
  }),
});
