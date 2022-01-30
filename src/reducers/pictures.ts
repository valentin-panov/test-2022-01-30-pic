/* eslint-disable no-param-reassign */

// Core
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interfaces
import { InAlbums, InPicture } from '../interfaces/Interfaces';

// Server
import { serverURL } from '../App';
import { splitResponse } from '../utils/splitResponse';

const initialState: InAlbums = {
  status: 'idle',
  error: '',
  albums: [],
};

export const picturesFetchData = createAsyncThunk('pictures/FetchingData', async () => {
  const reqURL = `${serverURL}`;
  const response = await fetch(reqURL);
  if (!response.ok) {
    throw new Error(`request error: ${reqURL}`);
  }
  return response.json();
});

export const picturesSlice = createSlice({
  name: 'pictures',
  initialState,
  reducers: {
    pictureRemove: (state, action: PayloadAction<InPicture>) => {
      const { albumId, id } = action.payload;
      state.albums = state.albums.map((d) => {
        if (d.albumId === albumId) {
          return { ...d, pictures: d.pictures.filter((entry) => entry.id !== id) };
        }
        return d;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(picturesFetchData.pending, (state) => {
      state.status = 'pending';
      state.error = '';
    });
    builder.addCase(picturesFetchData.fulfilled, (state, action: PayloadAction<InPicture[]>) => {
      state.albums = splitResponse(action.payload);
      state.status = 'success';
    });
    builder.addCase(picturesFetchData.rejected, (state, action) => {
      state.status = 'error';
      state.error = String(action.error.message);
    });
  },
});

export const { pictureRemove } = picturesSlice.actions;

export const pictures = picturesSlice.reducer;
