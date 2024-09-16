import React, { useEffect } from "react";
import Navbar from "../Components/Navbar"; 
import Sidebar from "../Components/Sidebar"; 
import { useAppDispatch, useAppSelector } from "../Hooks/UseApp"; 
import { getHomePageVideos } from "../Store/Reducers/getHomePageVideos"; 
import Spinner from "../Components/Spinner"; 
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../Components/Card"; 

export default function Home() {

  const dispatch = useAppDispatch();

  const videos = useAppSelector((state) => state.youtubeApp.homeVideos);  
  const loading = useAppSelector((state) => state.youtubeApp.loading);

  // Log videos to ensure it's being correctly fetched and structured
  // console.log("Redux State: ", useAppSelector((state) => state)); // Log the entire state
  console.log("Fetched Videos: ", videos);

  //fetch videos on component mount
  useEffect(() => {
    dispatch(getHomePageVideos(false));
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-h-screen overflow-hidden">
      <div style={{ height: "7.5vh" }}>
        <Navbar />
      </div>
      <div className="flex" style={{ height: "92.5vh" }}>
        <Sidebar />
        {videos && videos.length > 0 ? (
          <InfiniteScroll
            dataLength={videos.length}
            next={() => dispatch(getHomePageVideos(true))}
            hasMore={videos.length < 500}
            loader={<Spinner />}
            height={650}
          >
            <div className="grid gap-y-14 gap-x-8 grid-cols-4 p-8">
              {videos.map((item, index) => {
                // Log each item to ensure videoId and other data are present
                console.log("Rendering video item:", item);

                // Ensure videoId exists
                return item.videoId ? (
                  <Card data={item} key={item.videoId} />
                ) : (
                  <div key={index}>Invalid video data</div> // Fallback for missing videoId
                );
              })}
            </div>
          </InfiniteScroll>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
