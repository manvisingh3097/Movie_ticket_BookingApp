// MovieList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Searchpanel/Searchpanel.module.css";

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
      <div className={styles.container}>
        <div>
          <h1 className={styles.header1}>WELCOME TO MOVIE-MAYBE</h1>
          <h1 className={styles.header2}>WHAT ARE YOU LOOKING FOR</h1>
        </div>
        <div className={styles.box}>
          <div className={styles.searchWrapper}>
            <input
              className={styles.searchinput}
              type="text"
              placeholder="Search For Movies"
            />
            <svg
              className={styles.searhIcon + "bi bi-search"}
              xmins="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </div>
          <div>
            <input
              className={styles.selectcity}
              type="text"
              placeholder="Select a City"
            />
          </div>

          <input
            className={styles.searchinput}
            type="text"
            placeholder="Cinema"
          />
        </div>
      </div>
      <center>
      <h2 className={styles.listofmovies} > List of Movies</h2>
      </center>
     
      <div className={styles.movielist} >
        {movies
          ? movies.map((movie) => (
              <div className={styles.movieimg} key={movie.id}>
                <Link to={{ pathname: `/details/${movie.moviename}` }}>
                  <img src={movie.image} alt={movie.moviename} width={250} height={400} />
                </Link>

                <p>{movie.moviename}</p>
                <p>
                  <img 
                    src="https://cdn.iconscout.com/icon/premium/png-256-thumb/film-time-3846862-3190997.png"
                    width={50}
                    
                    alt="Film Time"
                  />
                  : {movie.run_timing} hrs
                  <img
                    src="http://tinyurl.com/2fztm64d"
                    width={50}
                    alt="Star"
                  />{" "}
                  : {movie.rate_star}/5{" "}
                </p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default MovieList;
