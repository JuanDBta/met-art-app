import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchArtistsByName = createAsyncThunk('artists/fetchArtistsByName', async ({ lastname }) => {
  try {
    const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${lastname}&hasImages=true&isHighlight=true&`);
    const data = await response.json();
    return { lastname, objectIDs: data.objectIDs };
  } catch (error) {
    throw new Error('Error fetching artists');
  }
});

const artistsSlice = createSlice({
  name: 'artists',
  initialState: {
    artists: {},
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtistsByName.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchArtistsByName.fulfilled, (state, action) => {
        state.isLoading = false;
        const { lastname, objectIDs } = action.payload;
        state.artists[lastname] = objectIDs;
      })
      .addCase(fetchArtistsByName.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default artistsSlice.reducer;
