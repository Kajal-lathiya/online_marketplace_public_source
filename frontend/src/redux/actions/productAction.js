const BASE_URL = "http://localhost:3001";
const BASE_URL1 = "https://dummyjson.com";

export function PRODUCT_ACTION() {
  return function (dispatch, getState) {
    return new Promise(async (resolve, rejects) => {
      try {
        // let userToken = await AsyncStorage.getItem("USER_TOKEN");
        dispatch({
          type: "GET_PRODUCT",
          subtype: "loading"
        });
        let response = await fetch(`${BASE_URL}/products`);
        if (response.ok) {
          let result = await response.json();
          dispatch({
            type: "GET_PRODUCT",
            subtype: "success",
            productData: result
          });
          resolve(result);
        } else {
          //   rejects(error);
          dispatch({
            type: "GET_PRODUCT",
            subtype: "loading"
          });
          dispatch({
            type: "GET_PRODUCT",
            error: false
          });
        }
      } catch (e) {
        rejects(e);
        dispatch({
          type: "GET_PRODUCT",
          error: e
        });
      }
    });
  };
}

export function PRODUCTDETAILS_ACTION(productID) {
  console.log("productID:", productID);
  return function (dispatch, getState) {
    return new Promise(async (resolve, rejects) => {
      try {
        // let userToken = await AsyncStorage.getItem("USER_TOKEN");
        dispatch({
          type: "PRODUCT_DETAILS",
          subtype: "loading"
        });
        
        let requestOptions = {
            method: "GET",
            redirect: "follow"
          };
        fetch(`${BASE_URL}/products/product_details/${productID}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log("product details", result);
          dispatch({
            type: "PRODUCT_DETAILS",
            subtype: "success",
            productDetails: result
          });
          resolve(result);
        })
        .catch((error) => {
          console.log("error", error);
          rejects(error);
          dispatch({
            type: "PRODUCT_DETAILS",
            subtype: "loading"
          });
          dispatch({
            type: "PRODUCT_DETAILS",
            error: error
          });
        });
      } catch (e) {
        rejects(e);
        dispatch({
          type: "PRODUCT_DETAILS",
          error: e
        });
      }
    });
  };
}
