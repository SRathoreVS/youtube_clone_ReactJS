import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import parseData from '../../Utils/parseData';

const API_KEY = process.env.REACT_APP_CUTUBE_DATA_API_KEY;

export const getSearchPageVideos = createAsyncThunk(
  "youtube/App/searchPageVideos", // Action type
  async (isNext, { getState }) => {
    const {
      youtubeApp: { nextPageToken: nextPageTokenFromState, searchResults, searchTerm },
    } = getState(); // Destructure values from the state

    // Construct the correct API request URL
    const response = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/search?q=${searchTerm}&key=${API_KEY}&part=snippet&type=video&${
        isNext ? `pageToken=${nextPageTokenFromState}` : ""
      }`
    );

    // Extract the items and next page token from the response
    const { items, nextPageToken } = response.data;

    // Parse the items using the utility function
    const parsedData = await parseData(items);

    // Return the new parsed data and the next page token
    return {
      parsedData: [...searchResults, ...parsedData], // Combine new and existing search results
      nextPageToken, // Pass the nextPageToken to the reducer
    };
  }
);
