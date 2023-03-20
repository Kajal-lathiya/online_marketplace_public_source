import React from "react";

import styles from "./Contact.module.css";

function Contact() {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <div>
          <h2>Developer Contact:</h2>
          <p>
            <i className="pi pi-envelope"></i> <b>Email:</b> kajalbodarya77@gmail.com
          </p>
          <p>
            <i className="pi pi-github"></i> <b>Github:</b>{" "}
            https://github.com/Kajal-lathiya
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
