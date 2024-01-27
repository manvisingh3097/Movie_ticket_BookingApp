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
    <div>
      <div>
        <center>
          <h1 className={styles.header1}>WELCOME TO MOVIE-MAYBE</h1>
          <h1 className={styles.header2}>WHAT ARE YOU LOOKING FOR</h1>
        </center>
      </div>

      <div className={styles.box}>
        <div className={styles.searchWrapper}>
          <input
            className={styles.selectcity}
            type="text"
            placeholder="Search For Movies"
          />
        </div>
        <div>
          <input
            className={styles.selectcity}
            type="text"
            placeholder="Select a City"
          />
        </div>
        <div>
          <input
            className={styles.searchcity}
            type="text"
            placeholder="Cinema"
          />
        </div>
      </div>
    </div>
  );
};

export default Searchpanel;
