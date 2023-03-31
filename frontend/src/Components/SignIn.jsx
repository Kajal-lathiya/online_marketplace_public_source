import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// import { useDispatch } from "react-redux";
import { userSignIn } from "../features/orderBooks/userSlice";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";

import styles from "./SignIn.module.css";

function SignIn() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const toast = useRef(null);

  const [formData, setFormData] = useState({});

  async function postSignIn(userData) {
    try {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        email: "user111@gmail.com",
        password: "Welcome123!"
      });

      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch("http://localhost:3001/users/login", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          window.localStorage.setItem("bnToken", result.accessToken);
          window.localStorage.setItem("bnUserID", result._id);
          showSuccess();
          navigate("/");
        })
        .catch((error) => console.log("error", error));
    } catch (err) {
      showFail();
    }
  }

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Welcome!",
      detail: "Signed in successfully",
      life: 2500
    });
  };

  const showFail = () => {
    toast.current.show({
      severity: "error",
      summary: "Oops!!!",
      detail: "Sign in fails",
      life: 2500
    });
  };

  const formik = useFormik({
    initialValues: {
      email: "user111@gmail.com",
      password: "Welcome123!"
    },
    validate: (data) => {
      let errors = {};

      if (!data.email) {
        errors.email = "Email is required.";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)
      ) {
        errors.email = "Invalid email address. E.g. example@email.com";
      }

      if (!data.password) {
        errors.password = "Password is required.";
      }

      return errors;
    },
    onSubmit: (data) => {
      setFormData(data);
      postSignIn(data);
      formik.resetForm();
    }
  });

  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  return (
    <div className="form-demo">
      <Toast ref={toast} position="bottom-right" />
      <div className="m-d-flex m-jc-center ">
        <div className="card">
          <h1 className={`p-text-center ${styles.titleText}`}>User Sign In</h1>
          <form onSubmit={formik.handleSubmit} className="p-fluid">
            <div className={styles.pField}>
              <span className="p-float-label p-input-icon-right">
                <i className="pi pi-envelope" />
                <InputText
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className={classNames({
                    "p-invalid": isFormFieldValid("email")
                  })}
                />
                <label
                  htmlFor="email"
                  className={classNames({
                    "p-error": isFormFieldValid("email")
                  })}
                >
                  Email*
                </label>
              </span>
              {getFormErrorMessage("email")}
            </div>
            <div className={styles.pField}>
              <span className="p-float-label">
                <Password
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  toggleMask
                  className={classNames({
                    "p-invalid": isFormFieldValid("password")
                  })}
                />
                <label
                  htmlFor="password"
                  className={classNames({
                    "p-error": isFormFieldValid("password")
                  })}
                >
                  Password*
                </label>
              </span>
              {getFormErrorMessage("password")}
            </div>

            <Button type="submit" label="Sign In" className="mt-6" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
