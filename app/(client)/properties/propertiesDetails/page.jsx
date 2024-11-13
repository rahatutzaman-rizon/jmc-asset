import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const properties = [
  {
    name: "Intel Villa",
    description: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
    image: "https://i.ibb.co.com/pJLzTHk/Rectangle-15.png"
  },
  {
    name: "AMD Villa",
    description: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
    image: "https://i.ibb.co.com/pJLzTHk/Rectangle-15.png"
  },
  {
    name: "Apon Nibash",
    description: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
    image: "https://i.ibb.co.com/pJLzTHk/Rectangle-15.png"
  },
  {
    name: "Shanti Neer",
    description: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
    image: "https://i.ibb.co.com/pJLzTHk/Rectangle-15.png"
  },
  {
    name: "Nine Banglo",
    description: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
    image: "https://i.ibb.co.com/pJLzTHk/Rectangle-15.png"
  },
  {
    name: "Kuthir Bari",
    description: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
    image: "https://i.ibb.co.com/pJLzTHk/Rectangle-15.png"
  }
]

export default function PropertyListing() {
  return (
    <div className="container mx-auto sm:px-12  md:px-24  lg:px-48 py-12  mt-24">
      <h1 className="text-4xl font-bold text-primary mb-12">Malibag</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 max-w-sm ">
            <div className="relative h-72 group">
              <Image
                src={property.image}
                alt={property.name}
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link href={`/properties/propertiesDetails/specificproperty`} className="text-white text-lg font-semibold hover:underline">
                  Details
                </Link>
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-primary mb-3">{property.name}</h2>
              <p className="text-primary text-sm mb-4">{property.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-300 text-lg font-semibold">
          See More
        </button>
      </div>
    </div>
  )
}