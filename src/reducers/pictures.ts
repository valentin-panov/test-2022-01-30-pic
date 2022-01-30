/* eslint-disable no-param-reassign */

// Core
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interfaces
import { InPicture, InPictures } from '../interfaces/Interfaces';

// Server
import { serverURL } from '../App';

const initialState: InPictures = {
  status: 'idle',
  error: '',
  pictures: [],
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
      const { id } = action.payload;
      state.pictures = state.pictures.filter((entry) => entry.id !== id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(picturesFetchData.pending, (state) => {
      state.status = 'pending';
      state.error = '';
    });
    builder.addCase(picturesFetchData.fulfilled, (state, action: PayloadAction<InPicture[]>) => {
      state.pictures = [...action.payload];
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
