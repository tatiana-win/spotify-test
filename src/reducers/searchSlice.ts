import { createSlice } from '@reduxjs/toolkit';
import { Artist } from '../models/Artist';
import { Track } from '../models/Track';
import { Album } from '../models/Album';

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    artists: [] as Artist[],
    tracks: [] as Track[],
    albums: [] as Album[],
  },
  reducers: {
    searchResultsLoaded(state, action) {
      return {
        ...state,
        artists: action.payload.artists ?? [],
        tracks: action.payload.tracks ?? [],
        albums: action.payload.albums ?? [],
      };
    },
  },
});

export const { searchResultsLoaded } = searchSlice.actions;
