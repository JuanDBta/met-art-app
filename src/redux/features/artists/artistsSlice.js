import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import selectedArtists from '../../../components/selectedArtists';

export const fetchArtistsByName = createAsyncThunk('artists/fetchArtistsByName', async ({ lastname }) => {
  try {
    const artistData = selectedArtists.find((artist) => artist.lastname === lastname);
    if (artistData) {
      const response = await fetch(artistData.url);
      const data = await response.json();
      return { lastname, objectIDs: data.objectIDs };
    }
    throw new Error('Artist not found in selectedArtists');
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
  reducers: {
    resetArtists: (state) => {
      state.artists = {};
      state.isLoading = false;
      state.error = null;
    },
  },
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

export const { resetArtists } = artistsSlice.actions;
export default artistsSlice.reducer;
