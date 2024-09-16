import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import parseData from "../../Utils/parseData";

const API_KEY = process.env.REACT_APP_CUTUBE_DATA_API_KEY;

export const getHomePageVideos = createAsyncThunk(
  "youtube/App/searchPageVideos",
  async (isNext, { getState }) => {
    const {
      youtubeApp: { nextPageToken: nextPageTokenFromState, homeVideos },
    } = getState();
    // console.log("Current Home Videos State: ", homeVideos); // Log existing videos

    const url = `https://youtube.googleapis.com/youtube/v3/search?maxResults=20&key=${API_KEY}&part=snippet&type=video&${
      isNext ? `pageToken=${nextPageTokenFromState}` : ""
    }`;

    try {
      const response = await axios.get(url);
      console.log("API Response Data:", response.data);

      if (!response.data.items || response.data.items.length === 0) {
        console.log("No videos found");
        return { parsedData: homeVideos, nextPageToken: response.data.nextPageToken };
      }

      const items = response.data.items;
      const nextPageToken = response.data.nextPageToken;
      console.log("Fetched Items:", items);

      const parsedData = await parseData(items);
      console.log("Parsed Data:", parsedData);

      return {
        parsedData: [...homeVideos, ...parsedData], // Append fetched data
        nextPageToken,
      };
    } catch (error) {
      console.error("Error fetching videos:", error);
      throw error;
    }
  }
);

