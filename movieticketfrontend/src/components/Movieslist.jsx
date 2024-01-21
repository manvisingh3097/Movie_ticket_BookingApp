// MovieList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const url = "http://127.0.0.1:8000/api/movies";
        const response = await axios.get(url);
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h2>List of Movies</h2>
      {movies
        ? movies.map((movie) => (
            <div key={movie.id}>
              <Link to={{ pathname: `/details/${movie.moviename}` }}>
                <img src={movie.image} alt={movie.moviename} width={250} />
              </Link>

              <p>{movie.moviename}</p>
              <p>
                <img
                  src="https://cdn.iconscout.com/icon/premium/png-256-thumb/film-time-3846862-3190997.png"
                  width={50}
                  alt="Film Time"
                />
                : {movie.run_timing} hrs
                <img src="http://tinyurl.com/2fztm64d" width={50} alt="Star" /> :{" "}
                {movie.rate_star}/5{" "}
              </p>
            </div>
          ))
        : null}
    </div>
  );
};

export default MovieList;
