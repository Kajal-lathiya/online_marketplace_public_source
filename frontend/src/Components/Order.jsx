import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import styles from "./Order.module.css";
import { CHECKOUT_ACTION } from "../redux/actions/checkoutAction";

function Order(props) {
  const toast = useRef(null);
  const dispatch = useDispatch();
  let checkoutData = useSelector((state) => state.checkout.checkoutData);

  const [isOrderSubmit, setIsOrderSubmit] = useState(false);

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Successful!",
      detail: "Your order is submitted",
      life: 2500
    });
  };

  const showFail = () => {
    toast.current.show({
      severity: "error",
      summary: "Oops!!!",
      detail: "Submission fails",
      life: 2500
    });
  };

  const showSignInRequire = () => {
    toast.current.show({
      severity: "warn",
      summary: "Oops!!!",
      detail: "You have not signed in yet",
      life: 2500
    });
  };

  async function sendOrder() {
    dispatch(CHECKOUT_ACTION());
    if (checkoutData) {
      setIsOrderSubmit(true);
      showSuccess();
    } else {
      showFail();
    }
  }

  function handleOrderClick() {
    const userID = window.localStorage.getItem("bnUserID");
    const token = window.localStorage.getItem("bnToken");

    if (userID && token) {
      sendOrder();
    } else {
      showSignInRequire();
    }
  }

  return (
    <div className={styles.orderContainer}>
      <Toast ref={toast} position="bottom-right" />
      <div className={styles.orderTotal}>
        Total:{" "}
        <span className={styles.orderPrice}>
          ${props.totalMoney.toFixed(2)}
        </span>
      </div>
      <Button label="Send Order" icon="pi pi-send" onClick={handleOrderClick} />
    </div>
  );
}

export default Order;
