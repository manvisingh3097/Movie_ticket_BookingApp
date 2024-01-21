// MoviePage.js
import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import MovieList from '../components/Movieslist';

const MoviePage = () => {
  return (
    <div>
      
      {/* Add your movie details and components here */}
      <Navbar/>
      <MovieList/>
    </div>
  );
};

export default MoviePage;
