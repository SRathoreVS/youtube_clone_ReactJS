import axios from "axios";
import parsedVideoDuration from "./parseVideoDuration";
import convertRawToString from "./convertRawToString";
import timeSince from "./timeSince";

const API_KEY = process.env.REACT_APP_CUTUBE_DATA_API_KEY;

const parseData = async (items) => {
  try {
    const videoIds = [];
    const channelIds = [];

    items.forEach((item) => {
      channelIds.push(item.snippet.channelId);
      videoIds.push(item.id.videoId);
    });

    if (!channelIds.length || !videoIds.length) return [];

    const { data: { items: channelsData } } = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails&id=${channelIds.join(",")}&key=${API_KEY}`
    );

    const parsedChannelsData = channelsData.map((channel) => ({
      id: channel.id,
      image: channel.snippet.thumbnails.default.url,
    }));

    const { data: { items: videoData } } = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds.join(",")}&key=${API_KEY}`
    );

    return items.map((item, index) => {
      const channelInfo = parsedChannelsData.find((data) => data.id === item.snippet.channelId);
      return {
        videoId: item.id.videoId,
        videoTitle: item.snippet.title,
        videoDescription: item.snippet.description,
        videoThumbnail: item.snippet.thumbnails.medium.url,
        videoLink: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        videoDuration: parsedVideoDuration(videoData[index]?.contentDetails.duration),
        videoViews: convertRawToString(videoData[index]?.statistics.viewCount),
        videoAge: timeSince(new Date(item.snippet.publishedAt)),
        channelInfo: {
          id: item.snippet.channelId,
          image: channelInfo?.image,
          name: item.snippet.channelTitle,
        },
      };
    });
  } catch (error) {
    console.error("Error parsing data:", error);
    return [];
  }
};

export default parseData;
