"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Spinner from '../Reusable/Spinner';

export default function ProjectPage() {
  const [activeTab, setActiveTab] = useState('ongoing');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjectsData();
  }, []);

  const fetchProjectsData = async () => {
    try {
      const response = await fetch('https://jmc-asset-server.vercel.app/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const activeProject = projects.find(project => project.status === activeTab);

  const ImageCard = ({ src, className }) => {
    const [imgError, setImgError] = useState(false);

    return (
      <motion.div
        className={`relative overflow-hidden rounded-lg ${className}`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {!imgError ? (
          <Image
            src={src}
            alt="Project Image"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-sm">
            Project update coming soon
          </div>
        )}
      </motion.div>
    );
  };

  const renderImageGrid = (images) => {
    const gridImages = images.slice(0, 6);
    const gridClasses = [
      "col-start-1 col-end-2 row-start-1 row-end-3 bg-gray-300",
      "col-start-1 col-end-2 row-start-3 row-end-5 bg-gray-400",
      "col-start-2 col-end-3 row-start-1 row-end-3 bg-gray-500",
      "col-start-2 col-end-3 row-start-3 row-end-4 bg-gray-600",
      "col-start-2 col-end-3 row-start-4 row-end-5 bg-gray-700",
      "col-start-3 col-end-4 row-start-1 row-end-5 bg-gray-800"
    ];

    return (
      <div className="grid grid-cols-3 grid-rows-4 gap-2.5 h-[600px]">
        {gridImages.map((image, index) => (
          <ImageCard key={index} src={image} className={gridClasses[index]} />
        ))}
      </div>
    );
  };

  const TabButton = ({ tab }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center justify-between px-6 py-2 rounded-md text-sm sm:text-base w-full max-w-[330px] ${
        activeTab === tab
          ? 'bg-primary text-white'
          : 'bg-white text-primary border border-primary'
      }`}
    >
      <span className="flex-grow text-center">{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
      {activeTab === tab ? (
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      ) : (
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      )}
    </button>
  );

  return (
    <div className="container mx-auto px-4 py-24 max-w-7xl">
      <h1 className="text-3xl font-bold text-center text-[#00567A] ">Our Projects</h1>
      
      <p className="text-center text-[#00567A] font-light mt-6 mb-16 max-w-2xl mx-auto">
        Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industrys standard dummy text ever since the 1500s.
      </p>
      
      <div className="flex justify-center space-x-4 mb-8">
        {['ongoing', 'completed', 'upcoming'].map((tab) => (
          <TabButton key={tab} tab={tab} />
        ))}
      </div>

      {loading ? (
        <Spinner loading={loading} />
      ) : (
        activeProject && (
          <>
            {renderImageGrid(activeProject.images)}
            <div className="text-center mt-8">
              <Link href={`projects/${activeProject?._id}`}>
                <button className="border border-primary text-primary px-8 py-2 rounded-md hover:bg-primary hover:text-white transition-colors">
                  See More »
                </button>
              </Link>
            </div>
          </>
        )
      )}
    </div>
  );
}