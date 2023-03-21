import { createSlice } from '@reduxjs/toolkit';

export const albumsSlice = createSlice({
  name: 'albums',
  initialState: {
    list: {},
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
  },
});

export const { albumLoaded } = albumsSlice.actions;
