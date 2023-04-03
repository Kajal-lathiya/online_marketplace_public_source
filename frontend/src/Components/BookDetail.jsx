import React, {  useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  addBookToCart,
  calcTotalMoney
} from "../features/orderBooks/orderBooksSlice";
import { PRODUCTDETAILS_ACTION } from "../redux/actions/productAction";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import styles from "./BookDetail.module.css";

function BookDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.product.productDetails);
  const LOADER = useSelector((state) => state.product.productDetailsLoading);

  useEffect(() => {
    dispatch(PRODUCTDETAILS_ACTION(id));
  }, []);

  const header = (
    <div className={styles.imageContainer}>
      <img alt={productDetails.title} src={productDetails.thumbnail} />
    </div>
  );
  const footer = (
    <div className="flex flex-wrap justify-content-end gap-2">
      <Button
        label="Add to Cart"
        icon="pi pi-check-circle"
        onClick={() => {
          dispatch(addBookToCart(productDetails));
          dispatch(calcTotalMoney());
        }}
      />
    </div>
  );

  return (
    <div className={styles.outerContainer}>
      <div className="card flex justify-content-center">
        {!LOADER && (
          <Card
            title={productDetails.title}
            subTitle={`Category: ${productDetails.category}`}
            footer={footer}
            header={header}
            className="md:w-25rem"
          >
            <p className="m-0">
              <div className={styles.cardPrice}>Price: ${productDetails.price}</div>
              <div className={styles.additionalInfo}>
               {productDetails.description}
              </div>
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}

export default BookDetail;
