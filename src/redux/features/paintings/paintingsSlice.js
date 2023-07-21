import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchArtistPaintings = createAsyncThunk('data/fetchArtistsPainitngs', async ({ lastname, objectId }) => {
  try {
    const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`);
    const data = await response.json();
    return { lastname, ...data }; // Incluimos el lastname como parte del objeto devuelto
  } catch (error) {
    throw new Error('Error fetching user data');
  }
});

const paintingsSlice = createSlice({
  name: 'paintings',
  initialState: {
    data: {}, // Usamos un objeto para asociar los lastname con los detalles de las pinturas
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
        const newData = action.payload;
        const existingIdsSet = new Set(state.data[newData.lastname]?.map((data) => data.objectID));
        const filteredData = [newData].flat().filter((data) => !existingIdsSet.has(data.objectID));

        if (!state.data[newData.lastname]) {
          state.data[newData.lastname] = [];
        }
        state.data[newData.lastname].push(...filteredData);
      })
      .addCase(fetchArtistPaintings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default paintingsSlice.reducer;
