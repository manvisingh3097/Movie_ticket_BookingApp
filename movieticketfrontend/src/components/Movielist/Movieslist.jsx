// MovieList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Movielist.module.css";

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
      <div>
        
        <center>
          
          <div className={styles.box}>
            
            <div className="wrapper">
            <div>
          <center>
            <h1 className={styles.header1}>WELCOME TO MOVIE-MAYBE</h1>
            <h1 className={styles.header2}>WHAT ARE YOU LOOKING FOR</h1>
          </center>
        </div>
              <input
                className={styles.selectcity}
                type="text"
                placeholder="Search For Movies"
              />
              <input
                className={styles.selectcity}
                type="text"
                placeholder="Select a City"
              />
              <input
                className={styles.selectcity}
                type="text"
                placeholder="Cinema"
              />
              <img
                src="https://cdn3.iconfinder.com/data/icons/feather-5/24/search-512.png"
                width="25px"
              ></img>
            </div>
          </div>
        </center>
      </div>
      <center>
        <h2 className={styles.listofmovies}> List of Movies</h2>
      </center>

      <div className={styles.movielist}>
        {movies
          ? movies.map((movie) => (
              <div className={styles.movieimg} key={movie.id}>
                <Link to={{ pathname: `/details/${movie.moviename}` }}>
                  <img
                    src={movie.image}
                    alt={movie.moviename}
                    width={250}
                    height={400}
                  />
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
