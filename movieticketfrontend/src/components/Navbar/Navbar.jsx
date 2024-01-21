import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.css";


const Navbar = () => {
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
      <img className='logoimage' src="./moviemaybe3.png" ></img>
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
          <li class="nav-item active">
            <a class="nav-link" href="/home">
              Home 
            </a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="/movies">
            
              Movies 
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/theater">
            
              Theaters
            </a>
          </li>
        </ul>
        <button class="btn btn-outline-success my-2 ms-auto" type="submit">
          Sign up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
