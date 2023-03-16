import { createSlice } from '@reduxjs/toolkit';
import { Artist } from '../models/Artist';
import { Track } from '../models/Track';

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    artists: [] as Artist[],
    tracks: [] as Track[],
  },
  reducers: {
    searchResultsLoaded(state, action) {
      return {
        ...state,
        artists: action.payload.artists ?? [],
        tracks: action.payload.tracks ?? [],
      };
    },
  },
});

export const { searchResultsLoaded } = searchSlice.actions;
