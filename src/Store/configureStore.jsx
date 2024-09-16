import { configureStore } from '@reduxjs/toolkit';
import youtubeReducer from '../Features/youtube/youtubeSlice'

const store = configureStore({
  reducer: {
    youtubeApp: youtubeReducer, // Ensure consistency in naming
  },
});

export default store;
