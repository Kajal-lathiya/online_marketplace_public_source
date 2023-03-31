import React, { useState, useEffect } from "react";
import { ProgressSpinner } from "primereact/progressspinner";

import BookCard from "./BookCard";
import { OrderList } from "primereact/orderlist";
import styles from "./Bookstore.module.css";

function Bookstore() {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      let requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      fetch("http://localhost:3001/books", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setBooks(result);
        })
        .catch((error) => console.log("error", error));
    };
    fetchBooks();
  }, []);

  const itemTemplate = (book) => {
    return (
      <BookCard
        title={book.title}
        author={book.author}
        imgSrc={book.image_src}
        price={book.price}
        id={book._id}
        key={book._id}
      />
    );
  };

  return (
    <div className={styles.outerContainer}>
      <div className="card  m:flex m:justify-content-center">
        {books && books.length !== 0 ? (
          <OrderList
            value={books}
            onChange={(e) => setBooks(e.value)}
            itemTemplate={itemTemplate}
            header="Products"
            filter
            filterBy="title"
          ></OrderList>
        ) : (
          <ProgressSpinner
            style={{ width: "50px", height: "50px" }}
            strokeWidth="8"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        )}
      </div>
    </div>
  );
}

export default Bookstore;
