"use client"; // Ensure this is at the top

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion'; // Import Framer Motion
import Head from 'next/head';

const About = () => {
  const [metadata, setMetadata] = useState({
    title: 'JMC Asset Management', // Default static title
    description: 'We optimize financial futures through expert asset management services tailored for each client.', // Default static description
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Modal state management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState({});


  const [ok,setOkay] =useState("done");

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://asset-server.bdcare.vip/banner');
        if (!response.ok) throw new Error('Metadata fetch failed');
        const data = await response.json();
        if (data.length > 0) {
          const { title, description } = data[0];
          setMetadata({ title, description });
        }
      } catch (error) {
        console.error('Failed to fetch metadata:', error);
        setError('');
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, []);

  useEffect(() => {
    // Update meta tags
    document.title = metadata.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', metadata.description);
    } else {
      const newMetaDescription = document.createElement('meta');
      newMetaDescription.name = 'description';
      newMetaDescription.content = metadata.description;
      document.head.appendChild(newMetaDescription);
    }
  }, [metadata]);

  // Function to open the modal
  const openModal = (content) => {
    setSelectedContent(content);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const    closeModal = () => {
    setIsModalOpen(false);
  };

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-4 mt-24">
      <div className="h-8 bg-gray-300 rounded w-1/3"></div>
      <div className="h-6 bg-gray-300 rounded w-full"></div>
      <div className="h-6 bg-gray-300 rounded w-full"></div>
      <div className="h-48 bg-gray-300 rounded"></div>
      <div className="h-6 bg-gray-300 rounded w-1/4"></div>
      <div className="h-6 bg-gray-300 rounded w-full"></div>
    </div>
  );

  return (
    <>
      {/* <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head> */}

      <div className="bg-[#F5FCFF] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 gap-8 sm:gap-12">
          {/* About Us Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left Side Text */}
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#00567A]">About Us </h2>
               


                            <p className="text-xs font-light lg:text-sm mt-2 text-[#00567A]">
                At JMC Asset Management, we optimize financial futures through expert asset management services tailored for each client.
                Our focus lies in helping individuals and organizations manage, grow, and protect their assets, ensuring sustainable long-term growth.
              </p>
            </div>

            {/* Right Side Image */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm sm:max-w-md h-[250px] sm:h-[300px] md:h-[400px]">
              <Image
                  src="https://i.ibb.co/5YFtkXf/maciej-drazkiewicz-l-MYTH-8-V-Jo-unsplash.jpg"
                  alt="JMC Asset Management Limited"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg shadow-xl"
                />
                
              </div>
            </div>
          </div>

          {/* Error Message or Loading State */}
          {loading && <SkeletonLoader />}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Our Mission & Our Vision Section with Modal on hover */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-12 sm:mt-20">
            {/* Our Mission Card */}
            <div
              className="bg-white rounded-md p-6 sm:py-8 sm:px-10 cursor-pointer hover:shadow-lg transition-transform transform"
              onClick={() =>
                openModal({
                  title: 'Our Mission',
                  content:
                    'To empower Bangladeshi investors of all backgrounds to achieve their financial goals through innovative investment solutions. We leverage a team of experienced professionals and cutting-edge technology to deliver superior returns and exceptional client service'
                })
              }
            >
              <h5 className="text-xl sm:text-md font-bold text-[#00567A] mb-2 sm:mb-3">Our Mission</h5>
              <p className="text-xs md:text-md font-normal leading-7 text-[#00567A]">
              To empower Bangladeshi investors of all backgrounds to achieve their financial goals through innovative investment solutions. We leverage a team of experienced professionals and cutting-edge technology to deliver superior returns and exceptional client service
              </p>
            </div>

            {/* Our Vision Card */}
            <div
              className="bg-white rounded-md p-6 sm:py-8 sm:px-10 cursor-pointer hover:shadow-lg transition-transform transform"
              onClick={() =>
                openModal({
                  title: 'Our Vision',
                  content:
                    'To be the most proactive asset management firm in Bangladesh, leading the industry with innovative strategies, expert insights, and an unwavering commitment to client success'
                })
              }
            >
              <h3 className="text-xl sm:text-md font-bold text-[#00567A] mb-2 sm:mb-3">Our Vision</h3>
              <p className="text-xs md:text-md font-normal leading-7 text-[#00567A]">
              To be the most proactive asset management firm in Bangladesh, leading the industry with innovative strategies, expert insights, and an unwavering commitment to client success
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for showing detailed information */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <motion.div
            className="bg-white rounded-lg p-8 max-w-lg md:w-full shadow-lg relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()} // Prevent modal close on inner click
          >
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 focus:outline-none"
              onClick={closeModal}
              aria-label="Close Modal"
            >
              &#x2715; {/* Close icon */}
            </button>
            <h2 className="text-2xl font-bold text-[#00567A] mb-4">{selectedContent.title}</h2>
            <p className="text-sm text-gray-600 leading-7">{selectedContent.content}</p>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default About;