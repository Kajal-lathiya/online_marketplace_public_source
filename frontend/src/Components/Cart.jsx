import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CartItem from "./CartItem";
import Order from "./Order";
import { OrderList } from "primereact/orderlist";

import styles from "./Cart.module.css";
import { CARTITEMS_ACTION } from "../redux/actions/cartAction";

function Cart() {
  // const books = useSelector((state) => state.orderBooks.orderBooks);
  const dispatch = useDispatch();
  const searchArray = useSelector((state) => state.search.searchData);
  const [cartItems, setCartItems] = useState([]);

  const currentUserID = window.localStorage.getItem("bnUserID");

  useEffect(() => {
    dispatch(CARTITEMS_ACTION());
    let requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`http://localhost:3001/cart/${currentUserID}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("resultcartitems", result);
        setCartItems(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const itemTemplate = (item) => {
    return (
      <CartItem
        key={item._id}
        cartItemID={item._id}
        productId={item.productID._id}
        title={item.productID.title}
        imgSrc={item.productID.thumbnail}
        author={item.productID.brand}
        price={item.productID.price}
        orderQuantity={item.quantity}
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
              value={cartItems}
              itemTemplate={itemTemplate}
            ></OrderList>
          </div>
        </div>
        <Order books={cartItems} />
      </div>
    </div>
  );
}

export default Cart;
