import { configureStore } from '@reduxjs/toolkit';
import artistsReducer from './features/artists/artistsSlice';
import paintingsReducer from './features/paintings/paintingsSlice';

const store = configureStore({
  reducer: {
    artists: artistsReducer,
    paintings: paintingsReducer,
  },
});

export default store;
