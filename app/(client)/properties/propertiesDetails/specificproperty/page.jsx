"use client"

import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
const images = [
    "https://i.ibb.co/ZgSFhmt/anastasia-yaroshenko-q-Ea-YOM4-Yq-HQ-unsplash.jpg",
    "https://i.ibb.co/nsFfbNg/ryan-spencer-WJDR8-Qx-VR8-unsplash.jpg",
    "https://i.ibb.co/3m52MP4/justus-menke-hc7-MCn4vk6g-unsplash.jpg",
    "https://i.ibb.co/bsCNCqf/chuttersnap-Iboom5tbfvs-unsplash.jpg",
    "https://i.ibb.co/pncCvS5/wendy-liga-a-Sl-IN-fh-KKU-unsplash.jpg",
    "https://i.ibb.co/0mP1MR7/b0652c82cdd8.jpg"
  ];
  
  const gridClasses = [
    "col-start-1 col-end-2 row-start-1 row-end-3",
    "col-start-1 col-end-2 row-start-3 row-end-5",
    "col-start-2 col-end-3 row-start-1 row-end-3",
    "col-start-2 col-end-3 row-start-3 row-end-4",
    "col-start-2 col-end-3 row-start-4 row-end-5",
    "col-start-3 col-end-4 row-start-1 row-end-5"
  ];


  const properties = [
    {
      id: 1,
      image: "https://i.ibb.co/3m52MP4/justus-menke-hc7-MCn4vk6g-unsplash.jpg",
      title: "Modern Green Building"
    },
    {
      id: 2,
      image: "https://i.ibb.co/bsCNCqf/chuttersnap-Iboom5tbfvs-unsplash.jpg",
      title: "Residential Complex"
    },
    {
      id: 3,
      image: "https://i.ibb.co/nsFfbNg/ryan-spencer-WJDR8-Qx-VR8-unsplash.jpg",
      title: "Glass Office Tower"
    }
  ];


export default function PropertyDetails() {

   
      
    
        const [isModalOpen, setIsModalOpen] = useState(false);
      
        const openModal = () => setIsModalOpen(true);
        const closeModal = () => setIsModalOpen(false);
      
    
  return (
<div>
<div className="container mx-auto px-4 py-8 max-w-7xl mt-12 ">
      <h1 className="text-4xl font-bold text-primary mb-4 mt-12">JMC Villa</h1>
      <p className="text-primary text-base mb-8 leading-relaxed mt-8">
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The
        point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here,
        content here, making it look like readable English. Many desktop publishing...
      </p>

      <h2 className="text-2xl font-semibold text-primary mb-4 mt-8">Overview</h2>
      <div className="flex flex-col md:flex-row gap-8 items-start mt-6">
        <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full text-left text-sm text-primary border border-primary">
            <tbody>
              {[
                { label: 'Address', value: 'Plot # 12, Road # 1, Block # F, Malibag, Dhaka' },
                { label: 'Land Area', value: '10 Katha' },
                { label: 'No. of Floors', value: 'G + 9' },
                { label: 'Apartment', value: '5th Floor' },
                { label: 'Size', value: '1420 sft' },
                { label: 'Bed', value: '4' },
                { label: 'Washroom', value: '3' },
                { label: 'Property', value: 'Residential' },
              ].map((row, index) => (
                <tr key={index} className="border">
                  <td className="py-2  px-4  font-medium text-primary border">{row.label}</td>
                  <td className="py-3 px-4 border-l font-medium border-primary">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <Image
            src="https://i.ibb.co/cr1tGps/Rectangle-18.png" // Please replace with the correct image link or path
            alt="JMC Villa"
            height={280}
            width={400}
            className="rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
     

    <div className="container mx-auto px-4 py-8 mt-8">
      <div className="grid grid-cols-3 gap-4 max-w-7xl mx-auto h-[520px]">
        {images.map((image, index) => (
          <div key={index} className={`${gridClasses[index]} relative overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:shadow-lg hover:scale-105`}>
           
          <Image
        src={image}
        alt={`Property ${index + 1}`}
        layout="fill"
        objectFit="cover"
        className="absolute inset-0"
      />


            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
        ))}
      </div>
      
  

      <div className="flex justify-center mt-8">
        <button
        onClick={openModal} 
         className="inline-flex items-center justify-center px-4 py-2 border border-primary text-lg font-bold rounded-md text-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Interested
          <ChevronRight className="ml-2 h-4 w-4" />
        </button>
      </div>


      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white text-gray-800 rounded-lg p-8 max-w-md w-full shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-primary">Interested in this property?</h2>
            <p className="text-lg mb-4">Thank you for your interest! Our team will contact you shortly with more information about this stunning property.</p>
            <p className="text-sm text-gray-600 mb-6">We are excited to help you find your dream home!</p>
            <div className="text-right">
              <button
                onClick={closeModal}
                className="bg-primary text-white hover:bg-primary-dark font-semibold py-2 px-4 rounded transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>



    <div>
    <div className="container mx-auto px-4 py-8 max-w-7xl mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">You May Also Like</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-[380px]">
              <Image
                src={property.image}
                alt={property.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{property.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>


</div>
  );
}
