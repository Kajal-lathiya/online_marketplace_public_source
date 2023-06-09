export const GET_SEARCH = "GET_SEARCH";
export const GET_SEARCH_LOADING = "GET_SEARCH_LOADING";
export const GET_SEARCH_ERROR = " GET_SEARCH_ERROR";

export const getSearchAPI = (value) => {
  return async (dispatch, getState) => {
    console.log("getState", getState());
    try {
      let response = await fetch(`https://dummyjson.com/products`);
      if (response.ok) {
        let result = await response.json();
        console.log('result:', result);
        dispatch({
          type: GET_SEARCH,
          payload: result.products
        });

        setTimeout(() => {
          dispatch({
            type: GET_SEARCH_LOADING,
            payload: false
          });
        }, 100);
      } else {
        console.log("error");
        dispatch({
          type: GET_SEARCH_LOADING,
          payload: false
        });
        dispatch({
          type: GET_SEARCH_ERROR,
          payload: true
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_SEARCH_LOADING,
        payload: false
      });
      dispatch({
        type: GET_SEARCH_ERROR,
        payload: true
      });
    }
  };
};
