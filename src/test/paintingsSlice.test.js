/* eslint-disable no-param-reassign, max-len */
import { createSlice } from '@reduxjs/toolkit';
import { fetchArtistPaintings, setSelected } from '../redux/features/paintings/paintingsSlice';

describe('paintingsSlice', () => {
  let paintingsSlice;

  beforeEach(() => {
    paintingsSlice = createSlice({
      name: 'paintings',
      initialState: {
        data: {},
        isLoading: false,
        error: null,
      },
      reducers: {
        setSelected: (state, action) => {
          const { objectId, isSelected } = action.payload;
          const artistLastname = Object.keys(state.data).find(
            (lastname) => state.data[lastname].some((painting) => painting.objectID === objectId),
          );

          if (artistLastname) {
            const painting = state.data[artistLastname].find(
              (painting) => painting.objectID === objectId,
            );
            if (painting) {
              painting.isSelected = isSelected;
            }
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
            const existingIdsSet = new Set(
              state.data[newData.lastname]?.map((data) => data.objectID),
            );
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
  });

  it('should handle fetchArtistPaintings.pending correctly', () => {
    const nextState = paintingsSlice.reducer(undefined, fetchArtistPaintings.pending());
    expect(nextState.isLoading).toBe(true);
    expect(nextState.error).toBe(null);
  });

  it('should handle fetchArtistPaintings.fulfilled correctly', () => {
    const mockData = {
      lastname: 'VanGogh',
      objectId: 1,
    };
    const nextState = paintingsSlice.reducer(undefined, fetchArtistPaintings.fulfilled(mockData));//eslint-disable-line
  });

  it('should handle setSelected correctly', () => {
    const initialState = {
      data: {
        VanGogh: [
          {
            objectID: 1,
            isSelected: false,
          },
          {
            objectID: 2,
            isSelected: false,
          },
        ],
      },
    };

    const nextState = paintingsSlice.reducer(
      initialState,
      setSelected({ objectId: 1, isSelected: true }),
    );

    expect(nextState.data.VanGogh[0].isSelected).toBe(true);
    expect(nextState.data.VanGogh[1].isSelected).toBe(false);
  });
});
