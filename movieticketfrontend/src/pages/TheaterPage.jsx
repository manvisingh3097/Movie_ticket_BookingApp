import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import axios from "axios";
import './Theaterpage.css';
import { useParams } from "react-router-dom";

const TheaterPage = ({ moviename = "I am not a robot" }) => {
  const [theaters, setTheaters] = useState([]);
  const { theater_name } = useParams();
  console.log(theater_name);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const url = `http://127.0.0.1:8000/api/theater?movie_name=${theater_name}`;
        const response = await axios.get(url);
        setTheaters(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [moviename, theater_name]);

  if (!theaters || theaters.length === 0) {
    return <div>No theater in the movie selected</div>;
  }

  return (
    <div>
      <Navbar />
      <a href={`/${moviename}/book-tickets`} >Book Tickets</a>
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
                  <button>Book Seats</button>
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
