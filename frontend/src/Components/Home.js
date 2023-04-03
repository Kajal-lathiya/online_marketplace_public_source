import React, { useEffect } from "react";
import styles from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getSearchAPI } from "../redux/actions";
import { PRODUCT_ACTION } from "../redux/actions/productAction";
import "primeflex/primeflex.css";
import { Card } from "primereact/card";
import { Carousel } from "primereact/carousel";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";

function Home() {
  const dispatch = useDispatch();
  const productArray = useSelector((state) => state.product.productData);
  useEffect(() => {
    dispatch(getSearchAPI());
    dispatch(PRODUCT_ACTION());
  }, []);

  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
      case "INSTOCK":
        return "success";

      case "LOWSTOCK":
        return "warning";

      case "OUTOFSTOCK":
        return "danger";

      default:
        return null;
    }
  };
  const responsiveOptions = [
    {
      breakpoint: "1199px",
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: "991px",
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: "767px",
      numVisible: 1,
      numScroll: 1
    }
  ];

  const productTemplate = (product) => {
    return (
      <div className="border-1 surface-border border-round shadow-2 m-2 text-center py-5 px-3">
        <div className="mb-3">
          <img
            src={product.thumbnail}
            alt={product.name}
            className={`w-6 shadow-2 ${styles.imageSize}`}
          />
        </div>
        <div>
          <h4 className="mb-1">{product.name}</h4>
          <h6 className="mt-0 mb-3">${product.price}</h6>
          <Tag
            value={product.inventoryStatus}
            severity={getSeverity(product)}
          ></Tag>
          <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
            <Button icon="pi pi-search" className="p-button p-button-rounded" />
            <Button
              icon="pi pi-star-fill"
              className="p-button-success p-button-rounded"
            />
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className={styles.App}>
      <div className="card m-4">
        <Card title="Welcome to our online marketplace!">
          <p className="m-0">
            Our website is designed to make your shopping experience easy and
            enjoyable. Use our search bar to find specific items, or browse
            through our categories to discover new and exciting products. We
            also offer personalized recommendations based on your shopping
            history and preferences, making it easier than ever to find the
            perfect item.
          </p>
        </Card>
        <div className="card mt-4">
          <Carousel
            value={productArray}
            numVisible={3}
            numScroll={3}
            responsiveOptions={responsiveOptions}
            itemTemplate={productTemplate}
          />
        </div>
      </div>
      <footer>
        <div className={styles.footerContainer}>
          <div className={styles.footerColumn}>
            <h3>About Us</h3>
            <p>
              We are a team of passionate developers who love building awesome
              products.
            </p>
          </div>
          <div className={styles.footerColumn}>
            <h3>Contact Us</h3>
            <ul>
              <li>Email: kajalbodarya77@gmail.com</li>
              <li>Phone: +1 555-555-5555</li>
              <li>Address: 123 Main St, London UK</li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h3>Follow Us</h3>
            <ul>
              <li>
                <a href="#">Facebook</a>
              </li>
              <li>
                <a href="#">Twitter</a>
              </li>
              <li>
                <a href="#">Instagram</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );

  // return (
  //   <div className={styles.outerContainer}>
  //     <div className={styles.innerContainer}>
  //       <h1>Welcome to my personal project: BN Bookstore</h1>
  //       <div>
  //         <p>
  //           BN Bookstore is developed using MERN stack (MongoDB, ExpressJS,
  //           ReactJS and NodeJS) to demonstrate the stack's capabilities for
  //           educational purpose.
  //         </p>
  //         <p>
  //           The following list are libraries and frameworks which were used in
  //           this project:
  //         </p>
  //         <ul>
  //           <li>
  //             Frontend: <a href={"https://reactjs.org/"}>ReactJS</a>,{" "}
  //             <a href={"https://redux.js.org/"}>Redux</a>,{" "}
  //             <a href={"https://reactrouter.com/"}>React Router</a>,{" "}
  //             <a href={"https://formik.org/"}>Formik</a>,{" "}
  //             <a href={"https://www.primefaces.org/primereact/"}>PrimeReact</a>
  //           </li>
  //           <li>
  //             Backend: <a href={"https://expressjs.com/"}>ExpressJS</a>,{" "}
  //             <a href={"https://github.com/dcodeIO/bcrypt.js#readme"}>
  //               Bcryptjs
  //             </a>
  //             ,{" "}
  //             <a href={"https://github.com/auth0/node-jsonwebtoken#readme"}>
  //               Jsonwebtoken
  //             </a>
  //             , <a href={"http://www.passportjs.org/"}>PassportJS</a>,{" "}
  //             <a href={"https://github.com/expressjs/cors#readme"}>CORS</a>
  //           </li>
  //           <li>
  //             Database: <a href={"https://www.mongodb.com/"}>MongoDB Atlas</a>
  //           </li>
  //         </ul>
  //         <p>
  //           BN Bookstore provides different functions for customers and admins,
  //           including:
  //         </p>
  //         <ul>
  //           <li>
  //             Customers: Sign In, Sign Up, browse books, search books by title,
  //             view detail information of a book, add books to cart, cart
  //             management, submit books order
  //           </li>
  //           <li>Admin:</li>
  //           <ul>
  //             <li>
  //               There is only one Admin account available. Admin sign in page
  //               can be access via domain.com/admin/signin
  //             </li>
  //             <li>
  //               After logging in, the admin is directed to a specific page to
  //               view all the available invoices
  //             </li>
  //           </ul>
  //           <li>Authentication: Salt and hash</li>
  //           <li>
  //             Authorization: JWT (JSON Web Token, the token expires in 1 week)
  //           </li>
  //         </ul>
  //       </div>
  //       <p>
  //         <b>
  //           Notes: Beautiful and responsive CSS effects is not the purpose of
  //           this project
  //         </b>
  //       </p>
  //       <br />
  //       <br />
  //       <h2>Developer Contact:</h2>
  //       <p>
  //         <i className="pi pi-envelope"></i> <b>Email:</b>{" "}
  //         kajalbodarya77@gmail.com
  //       </p>
  //       <p>
  //         <i className="pi pi-github"></i> <b>Github:</b>{" "}
  //         https://github.com/Kajal-lathiya
  //       </p>
  //     </div>
  //   </div>
  // );
}

export default Home;
