import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
// import {
//   addBookToCart,
//   calcTotalMoney
// } from "../features/orderBooks/orderBooksSlice";

import { Button } from "primereact/button";

import styles from "./BookCard.module.css";

function BookCard(props) {
  let navigate = useNavigate();
  const [orderBooks, setOrderBooks] = useState([]);

  const dispatch = useDispatch();

  const book = {
    id: props.id,
    imgSrc: props.imgSrc,
    title: props.title,
    author: props.author,
    price: parseFloat(props.price),
    orderQuantity: 1
  };

  function navigateBookDetail() {
    navigate(`/bookstore/book/${props.id}`);
  }
  console.log("orderBooks:", orderBooks);

  const addBookToCart = (book) => {
    setOrderBooks((oldArray) => [...oldArray, book]);
  };

  return (
    <div className="p-d-flex p-jc-center p-my-4 p-px-4 p-py-4 p-shadow-3">
      <div className="flex flex-wrap p-2 align-items-center gap-6">
        <img
          className="w-4rem shadow-2 flex-shrink-0 border-round"
          src={props.imgSrc}
          alt={props.title}
        />
        <div className="flex-1 flex flex-column gap-2 xl:mr-8">
          <span className="font-bold">{props.author}</span>
          <div className="flex align-items-center gap-2">
            <i className="pi pi-tag text-sm"></i>
            <span>{props.title}</span>
          </div>
        </div>
        <span className="font-bold text-900">${props.price}</span>
        <Button
          label="Add to Cart"
          icon="pi pi-check-circle"
          className={styles.addCartButton}
          onClick={() => {
            console.log("calling");
            addBookToCart(book);
            setOrderBooks((oldArray) => [...oldArray, book]);
            // dispatch(addBookToCart(book));
            // dispatch(calcTotalMoney());
          }}
        />
        <Button
          label="Details"
          icon="pi pi-info-circle"
          className={`p-button-info ${styles.addCartButton}`}
          onClick={navigateBookDetail}
        />
      </div>
    </div>
  );
}

export default BookCard;
