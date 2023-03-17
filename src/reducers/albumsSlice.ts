import { createSlice } from '@reduxjs/toolkit';

export const albumsSlice = createSlice({
  name: 'albums',
  initialState: {
    list: {},
    tracks: {},
  },
  reducers: {
    albumLoaded(state, action) {
      return {
        ...state,
        list: {
          ...state.list,
          [action.payload.id]: action.payload,
        },
      };
    },
    albumTracksLoaded(state, action) {
      return {
        ...state,
        tracks: {
          ...state.tracks,
          [action.payload.id]: action.payload.tracks,
        },
      };
    },
  },
});

export const { albumLoaded, albumTracksLoaded } = albumsSlice.actions;
