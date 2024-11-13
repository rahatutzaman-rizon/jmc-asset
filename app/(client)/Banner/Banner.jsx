// pages/banner.js or pages/banner/page.js (depending on your project structure)
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../../(components)/Reusable/Button';

import { motion } from 'framer-motion';
// Import your local images
import image1 from '../../Asset/slider/slide1.png';
import image2 from '../../Asset/slider/slide2.png';
import image3 from '../../Asset/slider/slide3.png';



const Banner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    { src: image1, alt: 'jmc asset management'},
    { src: image2, alt: 'jmc asset management'},
    { src: image3, alt: 'jmc asset management'},
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 20000);
    return () => clearInterval(interval);
  }, [images.length]);

  const changeImage = (direction) => {
    setCurrentImageIndex((prevIndex) => {
      if (direction === 'next') {
        return (prevIndex + 1) % images.length;
      } else {
        return (prevIndex - 1 + images.length) % images.length;
      }
    });
  };

  return (
    <div className="relative h-screen overflow-hidden ">
      {/* Carousel-style Background Image Slider */}
      <div 
        className="flex transition-transform duration-700  ease-in-out h-full"
        style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <div key={index} className="flex-shrink-0 w-full h-full relative">
            <Image
              src={img.src}
              alt={img.alt}
              layout="fill"
              objectFit="cover"
              priority={index === currentImageIndex}
              quality={75}
              placeholder="blur"
            />
             {/* Gradient Overlay */}
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
          </div>
          // </div>
        ))}
      </div>

      {/* Text Content */}
      
      <div className="absolute inset-0 flex items-center px-8 md:px-12 lg:px-28 sm:ml-8 md:ml-36 mt-[-64px]">
  <motion.div
    className="max-w-3xl"
    initial={{ opacity: 0, y: 1 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  >
    <motion.p
      className="text-xs md:text-sm font-bold text-primary uppercase  tracking-widest mb-4 space-x-4"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
      }}
    >
      <motion.span
      className='text-gray-500'
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        }}
      >
        Discover
      </motion.span>
      <motion.span
      className='text-gray-500'
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        }}
      >
        |
      </motion.span>
      <motion.span
      className='text-gray-500'
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        }}
      >
        Dream
      </motion.span>
      <motion.span
      className='text-gray-500'
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        }}
      >
        |
      </motion.span>
      <motion.span
      className='text-gray-500'
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        }}
      >
        Live
      </motion.span>
    </motion.p>

    <motion.h1
      className="md:text-5xl lg:text-6xl text-3xl font-bold text-primary leading-tight my-10"
      initial={{ opacity: 0, scale: 1}}
      animate={{ opacity: 1 , scale: 1}}
      transition={{ delay:0.3,
        duration: 0.2
      }}
    >
     Your Path to Financial Growth
    </motion.h1>

    <motion.p
      className="text-sm  md:text-lg text-primary mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 1 }}
    >
      JMC Asset Management Limited, headquartered in Dhaka, Bangladesh, is an asset management firm dedicated to empowering Bangladeshi investors on their path to financial success. We are a licensed and established company with a team of seasoned professionals leveraging cutting-edge technology.

    </motion.p>

    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 1 }}
    >
      <Link href={`properties`}>
        <button className="text-white/90 px-8 py-2 bg-primary/70 rounded-md hover:bg-primary hover:text-white transition-colors">
          See More »
        </button>
      </Link>
    </motion.div>
  </motion.div>
</div>



      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentImageIndex ? 'bg-white/75 scale-120' : 'border-2 border-teal-700'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
