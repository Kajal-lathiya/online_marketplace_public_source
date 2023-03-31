import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import CartItem from "./CartItem";
import Order from "./Order";
import { OrderList } from "primereact/orderlist";

import styles from "./Cart.module.css";

function Cart() {
  // const books = useSelector((state) => state.orderBooks.orderBooks);
  const [books, setBooks] = useState([]);

  useEffect(() => {
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
  }, []);

  const itemTemplate = (book) => {
    return (
      <CartItem
        key={book.id}
        id={book.id}
        title={book.title}
        imgSrc={book.imgSrc}
        author={book.author}
        price={book.price}
        orderQuantity={book.orderQuantity}
      />
    );
  };

  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <div>
          <h1>Cart Information</h1>
        </div>
        <div className={styles.cartInformation}>
          <div className={styles.cartBooks}>
            <OrderList
              value={books}
              onChange={(e) => setBooks(e.value)}
              itemTemplate={itemTemplate}
            ></OrderList>
          </div>
        </div>
        <Order books={books} />
      </div>
    </div>
  );
}

export default Cart;
