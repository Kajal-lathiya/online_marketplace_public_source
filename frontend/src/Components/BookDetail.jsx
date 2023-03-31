import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import {
  addBookToCart,
  calcTotalMoney
} from "../features/orderBooks/orderBooksSlice";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import styles from "./BookDetail.module.css";

function BookDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const fetchUrl = `http://localhost:3001/books/book_details/${id}`;

  const [bookData, setBookData] = useState({});

  useEffect(() => {
    const fetchBook = async () => {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      fetch(fetchUrl, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          const book = {
            id: result._id,
            imgSrc: result.image_src,
            title: result.title,
            author: result.author,
            price: parseFloat(result.price),
            orderQuantity: 1,
            isbn_13: result.isbn_13,
            publisher: result.publisher,
            publish_date: result.publish_date
          };
          setBookData(book);
        })
        .catch((error) => console.log("error", error));
    };
    fetchBook();
  }, []);

  const header = (
    <div className={styles.imageContainer}>
      <img alt={bookData.title} src={bookData.imgSrc} />
    </div>
  );
  const footer = (
    <div className="flex flex-wrap justify-content-end gap-2">
      <Button
        label="Add to Cart"
        icon="pi pi-check-circle"
        onClick={() => {
          dispatch(addBookToCart(bookData));
          dispatch(calcTotalMoney());
        }}
      />
    </div>
  );

  return (
    <div className={styles.outerContainer}>
      <div className="card flex justify-content-center">
        <Card
          title={bookData.title}
          subTitle={`Author: ${bookData.author}`}
          footer={footer}
          header={header}
          className="md:w-25rem"
        >
          <p className="m-0">
            <div className={styles.cardPrice}>Price: ${bookData.price}</div>
            <div className={styles.additionalInfo}>Additional Information</div>
            <div>
              ISBN 13: <b>{bookData.isbn_13}</b>
            </div>
            <div>
              Publisher: <b>{bookData.publisher}</b>
            </div>
            <div>
              Publish Date: <b>{bookData.publish_date}</b>
            </div>
          </p>
        </Card>
      </div>
    </div>
  );
}

export default BookDetail;
