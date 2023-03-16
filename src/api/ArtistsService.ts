import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './BaseQueryWithReauth';
import { Artist } from '../models/Artist';
import { Track } from '../models/Track';
import { RawArtist, RawArtistFullInfo } from '../models/RawArtist';
import { RawTrack } from '../models/RawTrack';
import { RawAlbum } from '../models/RawAlbum';
import { Album } from '../models/Album';

export const ArtistsService = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: 'artistsApi',
  endpoints: build => ({
    getArtist: build.query<Artist, string>({
      query: id => ({
        url: `https://api.spotify.com/v1/artists/${id}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      transformResponse(response: RawArtistFullInfo) {
        return new Artist(
          response.images[0]?.url,
          response.name,
          response.id,
          response.genres,
          response.followers.total,
        );
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
        return response.tracks.map(
          (track: RawTrack) =>
            new Track(
              track.external_urls.spotify,
              track.album.images[0]?.url,
              track.name,
              track.id,
              track.duration_ms,
              new Artist('', track.artists[0].name, track.artists[0].id, []),
            ),
        );
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
            (artist: RawArtist) =>
              new Artist(
                artist.images[artist.images.length - 1]?.url,
                artist.name,
                artist.id,
                artist.genres,
              ),
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
        return response.items.map(
          album =>
            new Album(
              album.images[0]?.url,
              album.name,
              album.id,
              album.release_date,
              album.artists[0],
            ),
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
