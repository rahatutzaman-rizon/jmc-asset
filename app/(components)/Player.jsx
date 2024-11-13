import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import video from '../Asset/images/video.png'; // Importing image

// Dynamically import ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

export default function Player() {
  const [videoData, setVideoData] = useState({ link: '', title: '', description: '' });
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Fetch video data from the API when the component mounts
    fetchVideoData();
  }, []);

  const fetchVideoData = async () => {
    try {
      const res = await axios.get('https://asset-server.bdcare.vip/vedio');
      if (res.data.length > 0) {
        const { link, title, description } = res.data[0]; // Update this based on your actual data structure
        setVideoData({ link, title, description });
      }
    } catch (error) {
      console.error('Error fetching video data:', error);
    }
  };

  const handlePlayVideo = () => {
    setIsPlaying(true); // Start playing the video
  };

  return (
    <div className="mt-12 mb-12 bg-white flex flex-col items-center justify-center">
      <div className="w-full max-w-8xl h-full bg-white overflow-hidden">
        <div className="relative aspect-w-16 aspect-h-6 h-[70vh]">
          {/* Video Player */}
          <ReactPlayer
            url="https://www.youtube.com/watch?v=uWXXequIFZ8"
            width="100%"
            height="100%"
            playing={isPlaying}
            controls={true}
          />

          {/* Image overlay (only show when video is not playing) */}
          {!isPlaying && (
            <div
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              onClick={handlePlayVideo}
            >
              <Image
                src={video} // Replace with your image path
                alt="Play Video"
                layout="fill"
                objectFit="cover"
                // className='opacity-95'
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className='bg-[#002433]/50 rounded-full size-24 items-center justify-center flex'> 
                  
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-16 h-16 ml-2 text-white"
                  >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.752 11.168l-6.518-3.75A1 1 0 007 8.35v7.3a1 1 0 001.234.982l6.518-3.75a1 1 0 000-1.732z"
                    />
                </svg>
                    </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
