import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CartItem from "./CartItem";
import Order from "./Order";
import { OrderList } from "primereact/orderlist";

import styles from "./Cart.module.css";
import { CARTITEMS_ACTION } from "../redux/actions/cartAction";

function Cart() {
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.cart.cartItemsLoading);
  const cartItemsArray = useSelector((state) => state.cart.cartData);
  const [totalMoney, setTotalMoney] = useState(0);
  useEffect(() => {
    dispatch(CARTITEMS_ACTION())
      .then((res) => {
        console.log("res", res);
        let total = 0;
        for (let orderProduct of res) {
          total =
            total +
            parseInt(orderProduct.quantity) *
              parseFloat(orderProduct.productID.price);
        }
        console.log("total::", total);
        setTotalMoney(total);
      })
      .catch((err) => console.log("err", err));
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
      {!loader && (
        <div className={styles.innerContainer}>
          <div>
            <h1>Cart Information</h1>
          </div>
          <div className={styles.cartInformation}>
            <div className={styles.cartBooks}>
              <OrderList
                value={cartItemsArray}
                itemTemplate={itemTemplate}
              ></OrderList>
            </div>
          </div>
          <Order books={cartItemsArray} totalMoney={totalMoney} />
        </div>
      )}
    </div>
  );
}

export default Cart;
