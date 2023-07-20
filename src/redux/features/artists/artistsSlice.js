import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchArtists = createAsyncThunk('artists/fetchArtists', async () => {
  try {
    const response = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=Vincent%20VanGogh');
    const data = await response.json();
    return data.objectIDs;
  } catch (error) {
    throw new Error('Error fetching artists');
  }
});

const artistsSlice = createSlice({
  name: 'artists',
  initialState: {
    artists: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchArtists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.artists = action.payload;
      })
      .addCase(fetchArtists.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default artistsSlice.reducer;
