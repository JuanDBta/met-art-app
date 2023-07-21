import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Agrega aquí las importaciones necesarias para el slice paintings
// import { fetchArtistPaintings } from '../path-to-fetchArtistPaintings';
// ...

export const fetchArtistPaintings = createAsyncThunk('data/fetchArtistsPainitngs', async ({ lastname, objectId }) => {
  try {
    const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`);
    const data = await response.json();
    return { lastname, ...data, isSelected: false };
  } catch (error) {
    throw new Error('Error fetching user data');
  }
});

const paintingsSlice = createSlice({
  name: 'paintings',
  initialState: {
    data: {},
    isLoading: false,
    error: null,
  },
  reducers: {
    setSelected: (state, action) => {
      const { objectId, isSelected } = action.payload;
      const artistLastname = Object.keys(state.data).find((lastname) => state.data[lastname].some((painting) => painting.objectID === objectId));//eslint-disable-line

      if (artistLastname) {
        const painting = state.data[artistLastname].find((painting) => painting.objectID === objectId);//eslint-disable-line
        painting.isSelected = isSelected;
      }
    },
  },
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

        filteredData.forEach((data) => {
          state.data[newData.lastname].push({ ...data, isSelected: false });
        });
      })
      .addCase(fetchArtistPaintings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// Exporta la acción setSelected
export const { setSelected } = paintingsSlice.actions;

export default paintingsSlice.reducer;
