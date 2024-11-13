import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import Image from 'next/image';

const images = [
  {
    src: "https://i.ibb.co/ZgSFhmt/anastasia-yaroshenko-q-Ea-YOM4-Yq-HQ-unsplash.jpg",
    width: 1200,
    height: 800,
  },
  {
    src: "https://i.ibb.co/3m52MP4/justus-menke-hc7-MCn4vk6g-unsplash.jpg",
    width: 1200,
    height: 800,
  },
  {
    src: "https://i.ibb.co/bsCNCqf/chuttersnap-Iboom5tbfvs-unsplash.jpg",
    width: 1200,
    height: 800,
  },

  {
    src: "https://i.ibb.co/nsFfbNg/ryan-spencer-WJDR8-Qx-VR8-unsplash.jpg",
    width: 1200,
    height: 800,
  },
];

const Gallery = () => {
  return (
    <div className="w-full max-w-7xl mx-auto my-24">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        loop={true}  // Enables continuous looping of slides
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination]}
        className="h-[700px]   rounded-lg "
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center relative">
            <Image
              src={image.src}
              alt={`Slide ${index + 1}`}
              width={image.width}
              height={image.height}
              className="object-cover rounded-lg transition-transform duration-300"
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <style jsx>{`
        .swiper-slide {
          transition: transform 0.5s ease, filter 0.5s ease;
        }
        .swiper-slide-prev, .swiper-slide-next {
          transform: scale(0.6); /* Fixed smaller size for side slides */
          filter: blur(8px); /* Apply blur effect to side slides */
          max-height: 200px; /* Fixed height for side slides */
          max-width: 300px; /* Fixed width for side slides */
        }
        .swiper-slide-active {
          transform: scale(1.8); /* Enlarge the center slide significantly */
          max-height: 600px; /* Increased height for the center slide */
          max-width: 800px; /* Increased width for the center slide */
        }
      `}</style>
    </div>
  );
};

export default Gallery;
