import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './BaseQueryWithReauth';
import { Artist } from '../models/Artist';
import { Track } from '../models/Track';
import { SearchType } from '../models/SearchType';
import { RawArtist } from '../models/RawArtist';
import { RawTrack } from '../models/RawTrack';
import { RawAlbum } from '../models/RawAlbum';
import { Album } from '../models/Album';

interface SearchRawResponse {
  artists?: { items: RawArtist[] };
  tracks?: { items: RawTrack[] };
  albums: { items: RawAlbum[] };
}

interface SearchResponse {
  artists: Artist[];
  tracks: Track[];
  albums: Album[];
}

export const SearchService = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: 'searchApi',
  endpoints: build => ({
    search: build.query<SearchResponse, { q: string; type?: string }>({
      query: ({ q, type = SearchType.all }) => ({
        url: 'https://api.spotify.com/v1/search',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          q,
          type,
        },
      }),
      transformResponse(response: SearchRawResponse) {
        return {
          artists:
            response.artists?.items.map(
              (artist: RawArtist) => new Artist(artist),
            ) || [],
          tracks:
            response.tracks?.items.map((track: RawTrack) => new Track(track)) ||
            [],
          albums:
            response.albums?.items.map((album: RawAlbum) => new Album(album)) ||
            [],
        };
      },
      transformErrorResponse: (
        response: { status: string | number },
        meta,
        arg,
      ) => response,
    }),
    recommendations: build.query<SearchResponse, void>({
      query: () => ({
        url: 'https://api.spotify.com/v1/recommendations',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          seed_artists: '12Chz98pHFMPJEknJQMWvI,3TOqt5oJwL9BE2NG9MEwDa',
        },
      }),
      transformResponse(response: { tracks: RawTrack[] }) {
        return {
          artists: [],
          albums: [],
          tracks: response.tracks.map((track: RawTrack) => new Track(track)),
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
