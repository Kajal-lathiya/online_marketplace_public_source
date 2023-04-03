const initialState = {};

export default function product(state = initialState, action = {}) {
  switch (action.type) {
    case "GET_PRODUCT": {
      return {
        ...state,
        productError: action.error ? action.error : null,
        productSuccess: action.subtype === "success",
        productLoading: action.subtype === "loading",
        productData:
          action.subtype === "success" ? action.productData : state.productData
      };
    }
    case "PRODUCT_DETAILS": {
      return {
        ...state,
        productDetailsError: action.error ? action.error : null,
        productDetailsSuccess: action.subtype === "success",
        productDetailsLoading: action.subtype === "loading",
        productDetails:
          action.subtype === "success"
            ? action.productDetails
            : state.productDetails
      };
    }
  // case "PENDING_ORDER": {
    //   return {
    //     ...state,
    //     pendingOrderError: action.error ? action.error : null,
    //     pendingOrderSuccess: action.subtype === "success",
    //     pendingOrderLoading: action.subtype === "loading",
    //     pendingOrder:
    //       action.subtype === "success"
    //         ? action.pendingOrder
    //         : state.pendingOrder
    //   };
    // }
    default:
      return state;
  }
}
