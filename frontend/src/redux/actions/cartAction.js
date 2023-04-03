const BASE_URL = "http://localhost:3001";
const currentUserID = window.localStorage.getItem("bnUserID");

export function CARTITEMS_ACTION() {
    console.log('cart calling');
  return function (dispatch, getState) {
    return new Promise(async (resolve, rejects) => {
      try {
        // let userToken = await AsyncStorage.getItem("USER_TOKEN");
        dispatch({
          type: "GET_CARTITEMS",
          subtype: "loading"
        });

        let requestOptions = {
          method: "GET",
          redirect: "follow"
        };
        fetch(`http://localhost:3001/cart/${currentUserID}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log("cartitems action", result);
            dispatch({
              type: "GET_CARTITEMS",
              subtype: "success",
              cartData: result
            });
            resolve(result);
          })
          .catch((error) => {
            console.log("error", error);
            rejects(error);
            dispatch({
              type: "GET_CARTITEMS",
              subtype: "loading"
            });
            dispatch({
              type: "GET_CARTITEMS",
              error: error
            });
          });
      } catch (e) {
        rejects(e);
        dispatch({
          type: "GET_CARTITEMS",
          error: e
        });
      }
    });
  };
}

export function ADDTOCART_ACTION(product) {
  return function (dispatch, getState) {
    return new Promise(async (resolve, rejects) => {
      try {
        // let userToken = await AsyncStorage.getItem("USER_TOKEN");
        dispatch({
          type: "ADDTO_CART",
          subtype: "loading"
        });
        console.log("product:", product);
        let cartItem = {
          userID: currentUserID,
          productID: product.id,
          quantity: 1
        };
        console.log("cartItem;", cartItem);

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify(cartItem);

        let requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };

        fetch(`http://localhost:3001/cart/addToCart`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            dispatch({
              type: "ADDTO_CART",
              subtype: "success",
              addtocartData: result
            });
            resolve(result);
            // setItemAdded(true);
          })
          .catch((error) => {
            console.log("error", error);
            rejects(error);
            dispatch({
              type: "ADDTO_CART",
              subtype: "loading"
            });
            dispatch({
              type: "ADDTO_CART",
              error: error
            });
          });
      } catch (e) {
        rejects(e);
        dispatch({
          type: "ADDTO_CART",
          error: e
        });
      }
    });
  };
}
