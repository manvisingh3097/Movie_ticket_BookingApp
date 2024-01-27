import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './dashboard.css'
import Navbar from "../../components/Navbar/Navbar";

const Dashboard = () => {
  const [data, setdata] = useState([]);
  const [theaterdata, settheaterdata] = useState([]);
  const username = localStorage.getItem('username');;
  var url = "";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        if (username) {
          url = `http://127.0.0.1:8000/api/tickets?username=${username}`;
        }
        const response = await axios.get(url);
        setdata(response.data);

        // Fetch theater data for each ticket
        const theaterDataPromises = response.data.map(async (ticket) => {
          const theaterUrl = `http://127.0.0.1:8000/api/tickettheater?theaterid=${ticket.theater_id}`;
          const theaterResponse = await axios.get(theaterUrl);
          return theaterResponse.data;
        });

        // Wait for all theater data to be fetched
        const theaterDetails = await Promise.all(theaterDataPromises);
        settheaterdata(theaterDetails);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, []);

  return (

    
    <div className="imageforticket">
        <Navbar/>
      <h1 className="Bookedtickets">Booked Tickets for {username}</h1>
      {data.map((ticket, index) => (
        <div className="dashboardclass" key={ticket.id}>
          <p className="ptickets">Ticketnumber : {index+1}</p>
          <p className="ptickets">Theater : {ticket.theater_id}</p>
          <p className="ptickets">Seats: {ticket.seats}</p>
          <p className="ptickets">Total Price : {ticket.total_price}</p>
          {theaterdata[index] && (
            <>
              <p className="ptickets">Movie Name : {theaterdata[index].moviename}</p>
              <p className="ptickets">City : {theaterdata[index].city} </p>
            <p className="ptickets">Show Time : {theaterdata[index].movie_time}</p>
              {/* Add other theater-related information here */}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
