import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.css";
import { Routes, Route, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const navigatesignup = () => {
    navigate("/login");
  };

  return (
    // <nav>
    //   <div className="navbar-container navbar-bg">
    //     {/* <Link to="/" className="navbar-brand">Your Logo</Link> */}
    //     <img className='logoimage' src="./moviemaybe3.png" ></img>

    //       <ul className='logoname'>MovieMaybe</ul>

    //       <Link to="/" className="navbar-link home">Home</Link>

    //       <button className='loginbtn'>
    //       Join Us
    //     </button>

    //   </div>
    // </nav>

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <img className="logoimage" src="./moviemaybe3.png"></img>
      <a class="navbar-brand" href="/home">
        MovieMaybe
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item ">
            <a class="nav-link" href="/home">
              Home
            </a>
          </li>
          <li class="nav-item ">
            <a class="nav-link" href="/movies">
              Movies
            </a>
          </li>
          <li class="nav-item ">
            <a class="nav-link" href="/dashboard">
              Dashboard
            </a>
          </li>
        </ul>

        <div className="signup">
          <button onClick={navigatesignup}>Sign up</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
