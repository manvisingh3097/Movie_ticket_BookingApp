import React from "react";
import "bootstrap/dist/css/bootstrap.css";

import styles from "./Content.module.css"

const Content = () => {

    return(
        <div className={styles.banner}>
            <h1 className={styles.header1}>
                GET <span className={styles.header2}>MOVIE</span> TICKETS </h1>
                <p>
                Buy movie tickets in advance, find movie times watch trailers,
                </p>
                <p>
                read movie reviews and much more
                </p>
            


        </div>
    )
    
}

export default Content;