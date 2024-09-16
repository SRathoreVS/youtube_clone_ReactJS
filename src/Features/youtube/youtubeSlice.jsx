import { createSlice } from "@reduxjs/toolkit";
import { getHomePageVideos } from "../../Store/Reducers/getHomePageVideos";
import { getSearchPageVideos } from "../../Store/Reducers/getSearchPageVideos";

const initialState = {
  homeVideos: [], // Separate state for home page videos
  searchResults: [], // Separate state for search results
  currentPlaying: null,
  loading: false,
  searchTerm: "",
  nextPageToken: null,
  recommendedVideo: [],
};

const youtubeSlice = createSlice({
  name: "youtubeApp",
  initialState,
  reducers: {
    clearVideos: (state) => {
      state.homeVideos = [];
      state.searchResults = [];
      state.nextPageToken = null;
    },
    changeSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    clearSearchTerm: (state) => {
      state.searchTerm = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fulfilled case for getHomePageVideos
      .addCase(
        getHomePageVideos.fulfilled,
        getSearchPageVideos.fulfilled,
        (state, action) => {
          if (action.payload && action.payload.parsedData) {
            state.homeVideos = [...state.homeVideos, ...action.payload.parsedData]; // Append videos to existing array
            state.nextPageToken = action.payload.nextPageToken;
          }  
          state.loading = false;
        }
      );
    // Handle fulfilled case for getSearchPageVideos
    // .addCase(getSearchPageVideos.fulfilled, (state, action) => {
    //   if (action.payload && action.payload.parsedData) {
    //     state.searchResults = action.payload.parsedData;
    //     state.nextPageToken = action.payload.nextPageToken;
    //   }
    // });
  },
});

export const { changeSearchTerm, clearSearchTerm, clearVideos } =
  youtubeSlice.actions;
export default youtubeSlice.reducer;
