import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import styles from "./CartItem.module.css";
import {
  calcTotalMoney,
  changeQuantity,
  decreaseQuantity,
  increaseQuantity,
  removeBookFromCart
} from "../features/orderBooks/orderBooksSlice";

function CartItem(props) {
  const dispatch = useDispatch();
  const book = {
    id: props.id,
    orderQuantity: props.orderQuantity
  };

  const [quantity, setQuantity] = useState(1);

  function handleChangeQuantity(e) {
    setQuantity(parseInt(e.target.value));
  }

  function selectQuantity(e) {
    if (e.key === "Enter") {
      if (e.target.value >= 1 && e.target.value <= 99) {
        setQuantity(parseInt(e.target.value));
        book.orderQuantity = parseInt(quantity);
        dispatch(changeQuantity(book));
        dispatch(calcTotalMoney());
      } else {
        setQuantity(1);
        book.orderQuantity = parseInt(quantity);
        dispatch(changeQuantity(book));
        dispatch(calcTotalMoney());
      }
    }
  }

  return (
    <div>
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
          <div className={styles.cardButtonContainer}>
            {props.orderQuantity <= 1 ? (
              <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger"
                onClick={() => {
                  dispatch(removeBookFromCart(book));
                  dispatch(calcTotalMoney());
                }}
              />
            ) : (
              <Button
                icon="pi pi-minus"
                className="p-button-rounded"
                onClick={() => {
                  setQuantity(quantity - 1);
                  dispatch(decreaseQuantity(book));
                  dispatch(calcTotalMoney());
                }}
              />
            )}
            <span>
              <InputText
                value={quantity}
                className={styles.bookQuantity}
                onChange={handleChangeQuantity}
                onKeyDown={selectQuantity}
              />
            </span>
            <Button
              icon="pi pi-plus"
              className="p-button-rounded"
              onClick={() => {
                setQuantity(quantity + 1);
                dispatch(increaseQuantity(book));
                dispatch(calcTotalMoney());
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
