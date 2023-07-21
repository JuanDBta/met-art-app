import { configureStore } from '@reduxjs/toolkit';
import artistsReducer, { fetchArtistsByName, resetArtists } from '../redux/features/artists/artistsSlice';

const selectedArtistsMock = [
  { lastname: 'VanGogh', url: 'https://api.example.com/vangogh' },
  { lastname: 'Monet', url: 'https://api.example.com/monet' },
];

jest.spyOn(global, 'fetch').mockImplementation((url) => {
  const artistData = selectedArtistsMock.find((artist) => artist.url === url);
  if (artistData) {
    return Promise.resolve({
      json: async () => ({ objectIDs: [1, 2, 3] }),
    });
  }
  return Promise.reject(new Error('Artist not found in selectedArtists'));
});

describe('artistsSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        artists: artistsReducer,
      },
    });
  });

  it('should handle errors when fetching artists', async () => {
    // Dispatch the fetchArtistsByName action with an invalid artist name
    await store.dispatch(fetchArtistsByName({ lastname: 'InvalidArtist' }));

    // Check if the state reflects the error
    const state = store.getState().artists;
    expect(state.artists['InvalidArtist']).toBeUndefined();
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Error fetching artists');
  });

  it('should reset artists to initial state', () => {
    // Dispatch the resetArtists action
    store.dispatch(resetArtists());

    // Check if the state is reset to initial values
    const state = store.getState().artists;
    expect(state.artists).toEqual({});
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(null);
  });
});
