import React from 'react';
import Navbar from '../components/Navbar'; // Adjust the import path based on your project structure
import Content from '../components/Content';

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Content/>

        {/* Your content for the home page goes here */}
        <h1>Welcome to the Landing Page!</h1>
        {/* Add more content as needed */}

    </>
  );
};

export default LandingPage;