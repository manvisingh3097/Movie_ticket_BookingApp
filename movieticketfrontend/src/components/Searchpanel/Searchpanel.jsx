import React, { useEffect, useState } from "react";
import styles from "./Searchpanel.module.css";

const Searchpanel = () => {
  const [selectedcity, setselectedcity] = useState();
  const [selectedcinema, setselectedcinema] = useState();

  const cities = [
    { name: "Mumbai" },
    { name: "pune" },
    { name: "lucknow" },
    { name: "delhi" },
    { name: "newyork" },
  ];

  const cinemas = [
    { name: "Maxus" },
    { name: "cinemax" },
    { name: "INOX" },
    { name: "PVR" },
  ];

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.header1}>WELCOME TO MOVIE-MAYBE</h1>
        <h1 className={styles.header2}>WHAT ARE YOU LOOKING FOR</h1>
      </div>

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

      <input className={styles.searchinput} type="text" placeholder="Cinema" />
      
    </div>
  );
};

export default Searchpanel;
