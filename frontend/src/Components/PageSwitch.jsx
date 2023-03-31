import React, { useState } from "react";
import { Link, useMatch } from "react-router-dom";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import styles from "./PageSwitch.module.css";

function PageSwitch(props) {
  const [currentPage, setCurrentPage] = useState(props.currentPage);

  // let { url } = useMatch();
  function increasePageNumber() {
    if (currentPage <= props.totalPages) {
      setCurrentPage(currentPage + 1);
      props.onChangePageNumber(currentPage + 1);
    } else if (currentPage === 1) {
      setCurrentPage(currentPage);
    }
  }

  function decreasePageNumber() {
    if (currentPage >= 2 && currentPage <= props.totalPages) {
      setCurrentPage(currentPage - 1);
      props.onChangePageNumber(currentPage - 1);
    } else if (currentPage < 2) {
      setCurrentPage(1);
      props.onChangePageNumber(1);
    } else if (currentPage === 1) {
      setCurrentPage(currentPage);
    }
  }

  function changePageNumber(e) {
    if (e.key === "Enter") {
      if (e.target.value >= 1 && e.target.value <= props.totalPages) {
        setCurrentPage(parseInt(e.target.value));
        props.onChangePageNumber(parseInt(e.target.value));
      } else {
        setCurrentPage(1);
        props.onChangePageNumber(1);
      }
    }
  }

  function handleChange(e) {
    setCurrentPage(parseInt(e.target.value));
  }

  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.pageSwitchContainer}>
          <Link
            to={`/bookstore/page/${currentPage - 1 <= 1 ? 1 : currentPage - 1}`}
            className={styles.switchButton}
          >
            <Button
              icon="pi pi-caret-left"
              className="p-button-rounded p-button-primary"
              onClick={decreasePageNumber}
            />
          </Link>
          <span className={styles.currentPageGroup}>
            Page{" "}
            <InputText
              value={currentPage}
              className={styles.currentPage}
              onChange={handleChange}
              onKeyDown={changePageNumber}
            />{" "}
            of {props.totalPages}
          </span>
          <Link
            to={`/bookstore/page/${currentPage + 1}`}
            className={styles.switchButton}
          >
            <Button
              icon="pi pi-caret-right"
              className="p-button-rounded p-button-primary"
              onClick={increasePageNumber}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PageSwitch;
