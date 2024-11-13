"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import Spinner from '../../(components)/Reusable/Spinner';
import { BASE_URL } from '../../api/config'; // Import the base URL

const ClientsReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${BASE_URL}/client`); // Use the imported base URL
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Custom Previous Arrow Component
  const CustomPrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 sm:-translate-x-10  text-[#00567A] font-bold py-2 px-4 sm:py-3 sm:px-5"
    >
      <ChevronLeftIcon className="h-6 w-6 sm:h-8 sm:w-8" />
    </button>
  );

  // Custom Next Arrow Component
  const CustomNextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 sm:translate-x-10  text-[#00567A] font-bold py-2 px-4 sm:py-3 sm:px-5"
    >
      <ChevronRightIcon className="h-6 w-6 sm:h-8 sm:w-8" />
    </button>
  );

  // Slider Settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
        }
      }
    ]
  };

  return (
    <div className="bg-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-[#00567A]">Clients Reviews</h1>
      <Spinner loading={loading} />

      {!loading && reviews.length > 0 && (
        <div className="relative mx-auto max-w-screen-lg lg:max-w-screen-xl">
          <Slider {...settings}>
            {reviews.map((review, index) => (
              <div key={index} className="px-2 sm:px-3">
                <div className="bg-[#FAFDFF] border border-[#C4EEFF] rounded-lg  p-3 sm:p-4 flex flex-col items-center h-[180px] sm:h-[250px]">
                  <div className="mb-3 sm:mb-4 w-16 sm:w-20 h-16 sm:h-20 relative overflow-hidden rounded-full">
                    <Image
                      src={review.imageUrl}
                      alt="Client"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                  <p className="text-[#00567A] w-3/4 sm:w-2/3 lg:w-full text-center lg:text-sm sm:text-lg mt-4 md:text-xs flex-grow">
                    {review.reviewText}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default ClientsReviews;
