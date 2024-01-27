// MovieList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Movielist.module.css";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState('');
  const [updated, setUpdated] = useState(message);

  const [messageMovie, setmessageMovie] = useState('');
  const [updatedMovie, setupdatedMovie] = useState(messageMovie);

  const [messageLanguage, setmessageLanguage] = useState('');
  const [updatedLanguage, setupdatedLanguage] = useState(messageLanguage);

  const handleClick = () => {
    //  "message" stores input field value
    setUpdated(message);
    setupdatedMovie(messageMovie);
    setupdatedLanguage(messageLanguage);
  };
  const handleChangegenre = (event) => {
 
    setMessage(event.target.value);
   
  };

  const handleChangemovie = (event) => {
 
    
    setmessageMovie(event.target.value);
    
  };

  const handleChangelanguage = (event) => {
 
    setmessageLanguage(event.target.value);
  };




  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const url = `http://127.0.0.1:8000/api/movies?genre=${updated}&name=${updatedMovie}&language=${updatedLanguage}`;
        const response = await axios.get(url);
        setMovies(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [updated , updatedLanguage, updatedMovie]);

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
              id ="Movie"
                className={styles.selectcity}
                type="text"
                placeholder="Search For Movies"
                onChange={handleChangemovie}
              />
              <input
              id="language"
                className={styles.selectcity}
                type="text"
                placeholder="Language"
                onChange={handleChangelanguage}

              />
              <input
                id="genre"
                className={styles.selectcity}
                type="text"
                placeholder="Genre"
                onChange={handleChangegenre}

              />
             <button onClick={handleClick}>Search</button>
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
