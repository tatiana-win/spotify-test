import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './BaseQueryWithReauth';
import { Artist } from '../models/Artist';
import { Track } from '../models/Track';
import { SearchType } from '../models/SearchType';
import { RawArtist } from '../models/RawArtist';
import { RawTrack } from '../models/RawTrack';

interface SearchRawResponse {
  artists?: { items: RawArtist[] };
  tracks?: { items: RawTrack[] };
}

interface SearchResponse {
  artists: Artist[];
  tracks: Track[];
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
              (artist: RawArtist) =>
                new Artist(
                  artist.images[0]?.url,
                  artist.name,
                  artist.id,
                  artist.genres,
                ),
            ) || [],
          tracks:
            response.tracks?.items.map(
              (track: RawTrack) =>
                new Track(
                  track.external_urls.spotify,
                  track.album.images[track.album.images.length - 1]?.url,
                  track.name,
                  track.id,
                  track.duration_ms,
                  new Artist(
                    '',
                    track.artists[0]?.name,
                    track.artists[0]?.id,
                    [],
                  ),
                ),
            ) || [],
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
          tracks: response.tracks.map(
            (track: RawTrack) =>
              new Track(
                track.external_urls.spotify,
                track.album.images[track.album.images.length - 1]?.url,
                track.name,
                track.id,
                track.duration_ms,
                new Artist('', track.artists[0].name, track.artists[0].id, []),
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
  }),
});
