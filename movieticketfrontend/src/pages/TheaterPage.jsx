import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import axios from "axios";
import "./Theaterpage.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


const TheaterPage = () => {
  const [theaters, setTheaters] = useState([]);
  const { moviename } = useParams();
  console.log(moviename);
  var url = "";
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        if (moviename) {
          url = `http://127.0.0.1:8000/api/theater?moviename=${moviename}`;
        }
        //if no moviename provided directrly route to theater
        else {
          url = `http://127.0.0.1:8000/api/theater`;
        }

        const response = await axios.get(url);
        console.log(response.data);
        setTheaters(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [moviename]);

  if (!theaters || theaters.length === 0) {
    return <div>No theater in the movie selected</div>;
  }

  return (
    <div>
      <Navbar />
      <h1> Booking for :  {moviename}</h1>
      <div className="App">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Date</th>
              <th>Available Seats</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {theaters.map((theater) => (
              <tr key={theater.id}>
                <td>{theater.theater_name}</td>
                <td>{theater.city}</td>
                <td>{theater.movie_time}</td>
                <td>{theater.available_seats}</td>
                <td>
                  <Link to={{ pathname: `/booking/${theater.theater_name}/${theater.movie_time}` }}>
                    <button>Book Seats</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody> 
        </table>
      </div>
    </div>
  );
};

export default TheaterPage;
