const BASE_URL = "http://localhost:3001";
const currentUserID = window.localStorage.getItem("bnUserID");

export function CHECKOUT_ACTION() {
  console.log("cart calling");
  return function (dispatch, getState) {
    return new Promise(async (resolve, rejects) => {
      try {
        dispatch({
          type: "CHECKOUT_ORDER",
          subtype: "loading"
        });
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let raw = JSON.stringify({
          product: {
            name: "iPhone 12",
            image:
              "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-12-purple-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1617130317000",
            amount: 100,
            quantity: 1
          }
        });
        let requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };

        fetch(`${BASE_URL}/payment`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            dispatch({
              type: "CHECKOUT_ORDER",
              subtype: "success",
              checkoutData: result
            });
            resolve(result);
          })
          .catch((error) => {
            console.log("error", error);
            rejects(error);
            dispatch({
              type: "CHECKOUT_ORDER",
              subtype: "loading"
            });
            dispatch({
              type: "CHECKOUT_ORDER",
              error: error
            });
          });
      } catch (e) {
        rejects(e);
        dispatch({
          type: "CHECKOUT_ORDER",
          error: e
        });
      }
    });
  };
}
