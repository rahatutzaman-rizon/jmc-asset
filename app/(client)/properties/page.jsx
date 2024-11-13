'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton'; // Import Skeleton
import 'react-loading-skeleton/dist/skeleton.css'; // Import Skeleton CSS

const PropertyListing = () => {
  const [selectedArea, setSelectedArea] = useState('all');
  const [properties, setProperties] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch properties from the JSON file
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch('./properties.json');
        const data = await res.json();
        setProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties = selectedArea === 'all'
    ? properties
    : { [selectedArea]: properties[selectedArea] };

  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Find Your Properties</h1>
        <div className="flex space-x-4">
          <div className="relative md:w-1/2">
            <select
              className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
            >
              <option value="all">All Areas</option>
              <option value="malibag">Malibagh</option>
              <option value="gulshan">Gulshan</option>
              <option value="rampura">Rampura</option>
              <option value="baridhara">Baridhara</option>
              <option value="banasree">Banasree</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          <div className="relative">
            <select className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              <option>Dhaka</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, index) => ( 
            <div key={index} className="bg-white rounded-lg shadow-md flex flex-col h-[400px] overflow-hidden mt-16">
              <Skeleton height={320} className="rounded-t-lg" />
              <div className="p-4 flex flex-col flex-grow">
                <Skeleton height={20} width="80%" className="mb-2" />
                <Skeleton height={15} count={2} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        Object.entries(filteredProperties).map(([area, listings]) => (
          <div key={area} className="mb-12  ">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold capitalize text-primary mt-12">{area}</h2>
              <Link href="/properties/propertiesDetails" className="text-primary hover:underline">
                See more
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {listings.map((property) => (
                <div key={property.id} className="bg-white rounded-lg shadow-md flex flex-col h-[480px]  overflow-hidden">
                  <div className="relative h-80 flex-shrink-0">
                    <Image
                      src={property.image}
                      alt={property.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-bold text-lg mb-2 text-primary">{property.title}</h3>
                    <p className="text-primary flex-grow mb-2">
  <small className="hidden sm:inline">
    Lorem the 1500s...
  </small>
  <small className="hidden md:inline">
    Lorem the 1500s, when an unknown printer took a galley of type...
  </small>
  <small className="inline md:hidden lg:inline">
    Lorem the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  </small>
</p>


                    
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PropertyListing;
