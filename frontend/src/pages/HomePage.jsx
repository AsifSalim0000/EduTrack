import React from 'react';
import HeroSection from '../components/HeroSection'
import NewCourses from '../components/NewCourses'
import Footer from '../components/Footer'


const HomePage = () => {
  return (
    <div>
      <HeroSection/>
      <NewCourses />
      <NewCourses />
      <hr />
      <Footer />
    </div>
  );
};

export default HomePage;
