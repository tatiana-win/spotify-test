import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './BaseQueryWithReauth';
import { Artist, FullArtistInfo } from '../models/Artist';
import { Track } from '../models/Track';
import { RawArtist, RawArtistFullInfo } from '../models/RawArtist';
import { RawTrack } from '../models/RawTrack';
import { RawAlbum } from '../models/RawAlbum';
import { Album } from '../models/Album';

export const ArtistsService = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: 'artistsApi',
  endpoints: build => ({
    getArtist: build.query<FullArtistInfo, string>({
      query: id => ({
        url: `https://api.spotify.com/v1/artists/${id}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      transformResponse(response: RawArtistFullInfo) {
        return new FullArtistInfo(response);
      },
      transformErrorResponse: (
        response: { status: string | number },
        meta,
        arg,
      ) => response,
    }),
    getArtistTracks: build.query<Track[], string>({
      query: id => ({
        url: `https://api.spotify.com/v1/artists/${id}/top-tracks`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          market: 'US',
        },
      }),
      transformResponse(response: { tracks: RawTrack[] }) {
        return response.tracks.map((track: RawTrack) => new Track(track));
      },
      transformErrorResponse: (
        response: { status: string | number },
        meta,
        arg,
      ) => response,
    }),
    getRelatedArtists: build.query<{ artists: Artist[] }, string>({
      query: id => ({
        url: `https://api.spotify.com/v1/artists/${id}/related-artists`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      transformResponse(response: { artists: RawArtist[] }) {
        return {
          artists: response.artists.map(
            (artist: RawArtist) => new Artist(artist),
          ),
        };
      },
      transformErrorResponse: (
        response: { status: string | number },
        meta,
        arg,
      ) => response,
    }),
    getArtistAlbums: build.query<Album[], string>({
      query: id => ({
        url: `https://api.spotify.com/v1/artists/${id}/albums`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          type: 'album',
          limit: 8,
        },
      }),
      transformResponse(response: { items: RawAlbum[] }) {
        return response.items.map(album => new Album(album));
      },
      transformErrorResponse: (
        response: { status: string | number },
        meta,
        arg,
      ) => response,
    }),
  }),
});
