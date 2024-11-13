import React from 'react';
import Image from 'next/image';
import home from "../Asset/service/home.png";
import pay from "../Asset/service/pay.png";

const OurServices = () => {
  return (
    <div className="bg-[#F0FAFF] py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#00567A] mb-8 md:mb-12 lg:mb-16">
          Our Services
        </h2>
        <div className="flex flex-col md:flex-row gap-8 md:gap-36 justify-center">
          <ServiceCard 
            title="Property Buy/Sell"
            description="Expert guidance through the entire property buying and selling process. We ensure smooth transactions and maximize value for our clients."
            imagePath={pay}
          />
          <ServiceCard 
            title="Construction"
            description="Comprehensive construction services for residential and commercial projects. From design to completion, we deliver quality builds."
            imagePath={home}
          />
        </div>
      </div>
    </div>
  );
};

const ServiceCard = ({ title, description, imagePath }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 flex-1 max-w-[600px] h-auto md:h-[180px]">
      <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6 mt-2">
        <Image 
          src={imagePath}
          alt={title}
          width={64}
          height={64}
          className="w-16 h-16 object-contain"
        />
        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-[#00567A] mb-2 md:mb-4">
            {title}
          </h3>
          <p className="text-[#00567A] text-xs md:text-sm font-normal leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurServices;