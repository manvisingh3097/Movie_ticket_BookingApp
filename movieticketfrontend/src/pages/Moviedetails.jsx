// import React from "react";
import Navbar from "../components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Moviedetails = () => {
  const [movie, setMovie] = useState(null);
  const { moviename } = useParams();
  console.log(moviename);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        //used string literal
        const url = `http://127.0.0.1:8000/api/movies?name=${moviename}`;
        const response = await axios.get(url);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
    //passed moviename in the below list
  }, [moviename]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container-sm details">
        {movie.map((movie) => (
          <div key={movie.movieId}>
            <img src={movie.image} alt="" width={300} height={300} />
            <p>Movie Name: {movie.moviename}</p>
            <p>Release Date: {movie.release_date}</p>
            <p>Genre: {movie.genre}</p>
            <p>Language: {movie.language} </p>
            <p>Run Time: {movie.run_timing} </p>
          </div>
        ))}
      </div>
    

<button>
<a href={`${moviename}/theater_name`} >Book Tickets</a>
      </button>
      
    </>
  );
};

export default Moviedetails;
