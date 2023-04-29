import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import styles from "./CartItem.module.css";
import {
  REMOVE_CARTITEM_ACTION,
  UPDATE_QUNTITY_ACTION
} from "../redux/actions/cartAction";

function CartItem(props) {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(props.orderQuantity);
  const currentUserID = window.localStorage.getItem("bnUserID");

  const updateQuntity = (qty) => {
    if (qty >= 1) {
      let item = {
        userID: currentUserID,
        productID: props.productId,
        quantity: qty
      };
      dispatch(UPDATE_QUNTITY_ACTION(item));
    }
  };
  
  const removeBookFromCart = () => {
    dispatch(REMOVE_CARTITEM_ACTION(props.cartItemID));
  };

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
            {quantity <= 1 ? (
              <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger"
                onClick={() => {
                  // dispatch(removeBookFromCart());
                  // dispatch(calcTotalMoney());
                  removeBookFromCart();
                }}
              />
            ) : (
              <Button
                icon="pi pi-minus"
                className="p-button-rounded"
                onClick={() => {
                  setQuantity(quantity - 1);
                  let qty = quantity - 1;
                  updateQuntity(qty);
                }}
              />
            )}
            <span>
              <InputText value={quantity} className={styles.bookQuantity} />
            </span>
            <Button
              icon="pi pi-plus"
              className="p-button-rounded"
              onClick={() => {
                setQuantity(quantity + 1);
                // dispatch(increaseQuantity(book));
                // dispatch(calcTotalMoney());
                let qty = quantity + 1;
                updateQuntity(qty);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
