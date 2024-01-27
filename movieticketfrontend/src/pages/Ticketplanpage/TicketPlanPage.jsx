import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import "./TicketPlanPage.css";
import { Link } from "react-router-dom";

const TicketPlan = () => {
  const { theatername } = useParams();
  const { movie_time } = useParams();

  const [Bookedseats, setBookedseats] = useState([]);
  const [availableseats, setavailableseats] = useState([]);
  const [selectedseats, setselectedseats] = useState([]);
  const [rows, setrows] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [coloumn, setcoloumn] = useState(["A", "B", "C", "D", "E"]);
  const [bookingResponse, setBookingResponse] = useState(null);
  const [theaterid, settheaterId] = useState(null);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const seat_url = `http://127.0.0.1:8000/api/seats?theater=${theatername}&movietime=${movie_time}`;
        const response = await axios.get(seat_url);
        setBookedseats(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchSeats();
  }, [theatername]);

  useEffect(() => {
    const fetchid = async () => {
      try {
        const theater_url = `http://127.0.0.1:8000/api/theater?theatername=${theatername}&movietime=${movie_time}`;
        const response = await axios.get(theater_url);
        settheaterId(response.data["0"]["id"]);
      } catch (error) {
        console.error("Error fetching theater:", error);
      }
    };

    fetchid();
  }, [theatername]);

  const handleselectseats = (seat) => {
    //first empty list will be present , once we select any seat it will
    //check in selected seats list whether it is already present or not
    if (selectedseats.includes(seat)) {
      //if it is true(i.e the selected seats includes the triggered seats)
      //compare each seat and if it matches any , filter it out (i.e remove from the setselectedseats list)
      setselectedseats((alreadySelected) =>
        alreadySelected.filter((s) => s !== seat)
      );
    } else {
      //else append the triggered seat in the selected seats list
      setselectedseats((alreadySelected) => [...alreadySelected, seat]);
    }
  };

  const handlebookticket = async (theatername, seat) => {
    console.log(theaterid);
    const Data = {
      theater: theaterid,
      user: localStorage.getItem('userid'),
      total_price: seat.length * 120,
      seats: seat.join(),
    };
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/tickets",
        Data,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Post request sucessful:", response.data);
      setBookingResponse(
        `total Price is ${
          seat.length * 120
        } and bookedseats: ${seat.join()} and movie time: ${movie_time}}`
      );
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };
  console.log(selectedseats);

  return (
    <>
      <Navbar />

      <h1 className="THEATERNAME">{theatername}</h1>
      <h2 className="tickets">Price : Per Ticket price is 120</h2>
      <center>
        <div className="container">
          {coloumn.map((col, colIndex) => (
            <div className="btn-row">
              {rows.map((r, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  <button
                    className={
                      "btn " +
                      (selectedseats.includes(`${col}${r}`)
                        ? "btn-selected "
                        : "") +
                      (Bookedseats.includes(`${col}${r}`) ? "disabled" : "")
                    }
                    onClick={() => handleselectseats(`${col}${r}`)}
                  >
                    {col}
                    {r}
                  </button>
                  {(rowIndex + 1) % 10 === 0 &&
                    rowIndex !== rows.length - 1 && <br />}{" "}
                  {/* Add line break if not the last row */}
                </React.Fragment>
              ))}
            </div>
          ))}
          <div className="hrline">
            <hr class="style-seven" size="20" width="100%" color="darkblue" />
            <p>SCREEN</p>
          </div>

          <center>
            <button
              onClick={() => handlebookticket(theatername, selectedseats)}
              className={`book-btn ${
                selectedseats.length < 1 ? "disabled" : ""
              }`}
              disabled={selectedseats.length < 1}
            >
              BookTicket
            </button>
          </center>

          {bookingResponse && (
            <div className="response-container">
              <h3>Booking Response:</h3>
              <p>{JSON.stringify(bookingResponse, null, 2)}</p>
            </div>
          )}
        </div>
      </center>
    </>
  );
};

export default TicketPlan;
