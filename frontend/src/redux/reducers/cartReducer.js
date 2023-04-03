const initialState = {};

export default function cart(state = initialState, action = {}) {
  switch (action.type) {
    case "GET_CARTITEMS": {
      return {
        ...state,
        cartItemsError: action.error ? action.error : null,
        cartItemsSuccess: action.subtype === "success",
        cartItemsLoading: action.subtype === "loading",
        cartData:
          action.subtype === "success" ? action.cartData : state.cartData
      };
    }
    case "ADDTO_CART": {
      return {
        ...state,
        addtocartError: action.error ? action.error : null,
        addtocartSuccess: action.subtype === "success",
        addtocartLoading: action.subtype === "loading",
        addtocartData:
          action.subtype === "success"
            ? action.addtocartData
            : state.addtocartData
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
