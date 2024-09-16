import React from 'react';
import { Link } from 'react-router-dom';

export default function Card({ data }) {
  return (
    <div className='w-72 flex flex-col gap-2 mb-6'>
      {/* Video Thumbnail */}
      <div className='relative'>
        <span className='absolute bottom-2 right-2 text-xs bg-black bg-opacity-75 text-white px-1 py-0.5 rounded-sm z-10'>
          {data.videoDuration}
        </span>
        <Link to={`/watch/${data.videoId}`}>
          <img 
            src={data.videoThumbnail} 
            alt='Thumbnail' 
            className='w-full h-40 rounded-lg object-cover transition-transform duration-200 hover:scale-105' 
          />
        </Link>
      </div>
      
      {/* Video Information */}
      <div className='flex gap-3'>
        {/* Channel Image */}
        <div className='min-w-fit'>
          <a href='#'>
            <img 
              src={data.channelInfo.image} 
              alt='Channel' 
              className='h-10 w-10 rounded-full' 
            />
          </a>
        </div>

        {/* Video Title and Details */}
        <div className='flex-1'>
          <h3 className='text-white text-sm font-medium line-clamp-2'>
            <a href='#' className='hover:text-gray-300'>
              {data.videoTitle}
            </a>
          </h3>
          <div className='text-xs text-gray-400'>
            <a href='#' className='hover:text-white'>
              {data.channelInfo.name}
            </a>
          </div>
          <div className='text-xs text-gray-400'>
            <span>{data.videoViews} views</span>
            <span className="mx-2">•</span>
            <span>{data.videoAge}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
