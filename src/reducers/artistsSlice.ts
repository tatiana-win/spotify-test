import { createSlice } from '@reduxjs/toolkit';

export const artistsSlice = createSlice({
  name: 'artist',
  initialState: {
    list: {},
    info: {},
  },
  reducers: {
    artistLoaded(state, action) {
      return {
        ...state,
        list: {
          ...state.list,
          [action.payload.id]: action.payload,
        },
      };
    },
    artistInfoLoaded(state, action) {
      return {
        ...state,
        info: {
          ...state.info,
          [action.payload.id]: action.payload,
        },
      };
    },
  },
});

export const { artistLoaded, artistInfoLoaded } = artistsSlice.actions;
