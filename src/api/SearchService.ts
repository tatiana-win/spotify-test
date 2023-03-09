import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './BaseQueryWithReauth';
import { Artist } from '../models/Artist';
import { Track } from '../models/Track';

interface RawImage {
  url: string;
  height: number;
  width: number;
}

interface RawArtist {
  id: string;
  images: RawImage[];
  name: string;
  href: string;
  genres: string[];
}

interface RawTrack {
  album: {
    images: RawImage[];
    id: string;
    name: string;
    release_date: string;
  };
  artists: {
    href: string;
    id: string;
    name: string;
  }[];
  href: string;
  id: string;
  name: string;
  duration_ms: number;
}
interface SearchResponse {
  artists?: { items: RawArtist[] };
  tracks?: { items: RawTrack[] };
}

export const SearchService = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: 'searchApi',
  endpoints: build => ({
    search: build.query<
      { artists: Artist[]; tracks: Track[] },
      { q: string; type?: string }
    >({
      query: ({ q, type = 'artist,track' }) => ({
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
      transformResponse(response: SearchResponse) {
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
                  track.album.images[0]?.url,
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
    recommendations: build.query<{ tracks: Track[] }, void>({
      query: () => ({
        url: 'https://api.spotify.com/v1/recommendations',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          seed_genres: 'rock',
        },
      }),
      transformResponse(response: { tracks: RawTrack[] }) {
        return {
          tracks: response.tracks.map(
            (track: RawTrack) =>
              new Track(
                track.album.images[0]?.url,
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
    relatedArtists: build.query<{ artists: Artist[] }, string>({
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
                artist.images[0]?.url,
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
  }),
});
