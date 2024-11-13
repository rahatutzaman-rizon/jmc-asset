'use client'

import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

import img1 from "../Asset/propertiesicon/bed.svg"
import img2 from "../Asset/propertiesicon/bath-tub.svg"
import img3 from "../Asset/propertiesicon/network.svg"
import img4 from "../Asset/propertiesicon/map-02.svg"

const properties = [
  {
    id: 1,
    image: "https://i.ibb.co/2Yxwp37/Rectangle-16.png",
    price: "120,000,00 ৳",
    beds: 4,
    baths: 4,
    area: 3500,
    location: "Assure MN Tower, Aftabnagar, Dhaka",
  },
  {
    id: 1,
    image: "https://i.ibb.co/2Yxwp37/Rectangle-16.png",
    price: "120,000,00 ৳",
    beds: 4,
    baths: 4,
    area: 3500,
    location: "Assure MN Tower, Aftabnagar, Dhaka",
  },
  {
    id: 1,
    image: "https://i.ibb.co/2Yxwp37/Rectangle-16.png",
    price: "120,000,00 ৳",
    beds: 4,
    baths: 4,
    area: 3500,
    location: "Assure MN Tower, Aftabnagar, Dhaka",
  },
  // ... (other properties)
]

const PropertyCard = ({ property }) => (
  <div className="bg-[#f8feff] rounded-lg overflow-hidden border border-[#cbedfc] mx-2 mb-6">
    <Image
      src={property.image}
      alt={`Property ${property.id}`}
      width={500}
      height={700}
      className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover"
    />
    <div className="p-4">
      <h3 className="text-base sm:text-lg font-semibold text-[#1d6786] mb-2">
        {property.price}
      </h3>
      <div className="flex justify-between text-[#1d6786] mt-4 font-medium">
        <span className="flex items-center">
          <Image
            src={img1}
            alt="Beds"
            width={16}
            height={16}
            className="mr-1 w-3 h-3 sm:w-4 sm:h-4"
          />
          <span className="text-xs sm:text-sm">{property.beds} Bed</span>
        </span>
        <span className="flex items-center">
          <Image
            src={img2}
            alt="Baths"
            width={16}
            height={16}
            className="mr-1 w-3 h-3 sm:w-4 sm:h-4"
          />
          <span className="text-xs sm:text-sm">{property.baths} Bath</span>
        </span>
        <span className="flex items-center">
          <Image
            src={img3}
            alt="Area"
            width={16}
            height={16}
            className="mr-1 w-3 h-3 sm:w-4 sm:h-4"
          />
          <span className="text-xs sm:text-sm">{property.area} sqft</span>
        </span>
      </div>
      <div className="flex items-center my-4 font-medium">
        <Image
          src={img4}
          alt="Location"
          width={16}
          height={16}
          className="mr-2 w-3 h-3 sm:w-4 sm:h-4"
        />
        <p className="text-[#1d6786] text-xs sm:text-sm">{property.location}</p>
      </div>
    </div>
  </div>
)

const CustomPrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0 top-1/2 transform -translate-y-1/2 text-[#2fa2d3] font-bold py-2 px-2 z-10"
  >
    <ChevronLeft className="w-6 h-8 text-[#154e66]" />
  </button>
)

const CustomNextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-0 top-1/2 transform -translate-y-1/2 text-[#2fa2d3] font-bold py-2 px-2 z-10"
  >
    <ChevronRight className="w-6 h-8 text-[#154e66]" />
  </button>
)

export default function FeaturedProperties() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '10%',
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '15%',
        },
      },
    ],
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-12 w-full">
      <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-primary mb-2 mt-12">
        Explore Our Featured Properties
      </p>
      <p className="text-center text-sm sm:text-md text-primary mb-8 mt-4">
        Find the Place Where Memories Begin.
      </p>

      <div className="relative h-full mt-16">
        <Slider {...settings}>
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </Slider>
      </div>

      <div className="text-center mt-16">
        <button className="px-6 sm:px-8 py-2 bg-primary/70 text-white rounded-md hover:bg-primary hover:text-white transition-colors">
          All Properties »
        </button>
      </div>
    </div>
  )
}