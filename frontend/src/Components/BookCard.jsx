import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ADDTOCART_ACTION } from "../redux/actions/cartAction";
import { useDispatch } from "react-redux";

import { Button } from "primereact/button";

import styles from "./BookCard.module.css";
import { PRODUCT_ACTION } from "../redux/actions/productAction";

function BookCard(props) {
  let navigate = useNavigate();

  const dispatch = useDispatch();

  const product = {
    id: props.id,
    thumbnail: props.thumbnail,
    title: props.title,
    brand: props.brand,
    price: parseFloat(props.price),
    orderQuantity: 1
  };

  function navigateBookDetail() {
    navigate(`/bookstore/book/${props.id}`);
  }

  const addBookToCart = (product) => {
    console.log("calling", product);
    dispatch(ADDTOCART_ACTION(product))
      .then((response) => {
        console.log("response", response);
        dispatch(PRODUCT_ACTION());
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="p-d-flex p-jc-center p-my-4 p-px-4 p-py-4 p-shadow-3">
      <div className="flex flex-wrap p-2 align-items-center gap-6">
        <img
          className="w-4rem shadow-2 flex-shrink-0 border-round"
          src={props.thumbnail}
          alt={props.title}
        />
        <div className="flex-1 flex flex-column gap-2 xl:mr-8">
          <span className="font-bold">{props.brand}</span>
          <div className="flex align-items-center gap-2">
            <i className="pi pi-tag text-sm"></i>
            <span>{props.title}</span>
          </div>
        </div>
        <span className="font-bold text-900">${props.price}</span>
        {!props.addtocart && (
          <Button
            label="Add to Cart"
            icon="pi pi-check-circle"
            className={styles.addCartButton}
            onClick={() => {
              console.log("calling");
              addBookToCart(product);
            }}
          />
        )}
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
