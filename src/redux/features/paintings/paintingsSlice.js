import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchArtistPaintings = createAsyncThunk(
  'data/fetchArtistData',
  async (objectId) => {
    try {
      const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`);
      const paintings = await response.json();
      return paintings;
    } catch (error) {
      throw new Error('Error fetching artist paintings');
    }
  },
);

const paintingsSlice = createSlice({
  name: 'paintings',
  initialState: {
    artistPaintings: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtistPaintings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchArtistPaintings.fulfilled, (state, action) => {
        state.isLoading = false;
        const newPaintings = action.payload;
        const existingIdsSet = new Set(state.artistPaintings.map((painting) => painting.objectID));
        const filteredPaintings = [newPaintings].flat().filter((painting) => !existingIdsSet.has(painting.objectID)); //eslint-disable-line
        state.artistPaintings.push(...filteredPaintings);
        state.artistPaintings.sort((a, b) => a.objectID - b.objectID);
      })
      .addCase(fetchArtistPaintings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default paintingsSlice.reducer;
