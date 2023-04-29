import React, { useState, useEffect } from "react";
import { ProgressSpinner } from "primereact/progressspinner";

import BookCard from "./BookCard";
import { OrderList } from "primereact/orderlist";
import styles from "./Bookstore.module.css";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCT_ACTION } from "../redux/actions/productAction";

function Bookstore() {
  const dispatch = useDispatch();
  const productArray = useSelector((state) => state.product.productData);

  useEffect(() => {
    dispatch(PRODUCT_ACTION());
  }, []);

  const itemTemplate = (product) => {
    return (
      <BookCard
        title={product.title}
        category={product.category}
        brand={product.brand}
        thumbnail={product.thumbnail}
        description={product.description}
        price={product.price}
        addtocart={product.addtocart}
        id={product._id}
        key={product._id}
      />
    );
  };

  return (
    <div className={styles.outerContainer}>
      <div className="card  m:flex m:justify-content-center">
        {productArray && productArray.length !== 0 ? (
          <OrderList
            value={productArray}
            itemTemplate={itemTemplate}
            header="Products"
            filter
            filterBy="title"
          ></OrderList>
        ) : (
          <ProgressSpinner
            style={{ width: "50px", height: "50px" }}
            strokeWidth="8"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        )}
      </div>
    </div>
  );
}

export default Bookstore;
