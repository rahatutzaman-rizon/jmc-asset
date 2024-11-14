"use client";

import { useState, useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import Spinner from './(components)/Reusable/Spinner';
import Banner from './(client)/Banner/Banner';

import FeaturedProperties from './(components)/FeautureProperties';


import About from './(client)/about/page';
import Player from './(components)/Player';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS CSS styles
import OurServices from './(components)/service';
import ProjectPage from './(components)/project/page';
import ClientsReviews from './(client)/client/page';

export default function Home() {
  const [bannerLoading, setBannerLoading] = useState(true);

  useEffect(() => {
    scroll.scrollToTop({
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });

    // Initialize AOS
    AOS.init({
      duration: 1000, // Set the animation duration (in ms)
      easing: 'ease-in-out', // You can customize the easing of animations
      once: true, // Whether animation should happen only once (true) or every time the element comes into view (false)
    });
  }, []);

  // Function to set loading to false once banner is loaded
  const handleBannerLoaded = () => {
    setBannerLoading(false);
  };

  return (
    <main className="bg-white overflow-hidden">
      {bannerLoading && <Spinner />}

      {/* Apply AOS animations with the `data-aos` attribute */}
      <section data-aos="fade-in">
        <Banner onLoad={handleBannerLoaded} />
      </section>

      <section data-aos="fade-in">
        <About />
      </section>

       <section data-aos="fade-in">
        <ProjectPage />
      </section>

      <section data-aos="fade-in">
        <Player />
      </section>

      <section data-aos="fade-in">
        <FeaturedProperties />
      </section>
      
      <section data-aos="fade-in">
        <ClientsReviews></ClientsReviews>
      </section>




      

      <section data-aos="fade-in">
        <OurServices></OurServices>
      </section>
    </main>
  );
}
