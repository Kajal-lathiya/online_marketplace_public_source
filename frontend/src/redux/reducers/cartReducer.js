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
    case "UPDATE_QUNTITY": {
      return {
        ...state,
        updateQuntityError: action.error ? action.error : null,
        updateQuntitySuccess: action.subtype === "success",
        updateQuntityLoading: action.subtype === "loading",
        updateQuntity:
          action.subtype === "success"
            ? action.updateQuntity
            : state.updateQuntity
      };
    }

    case "REMOVE_CARTITEM": {
      return {
        ...state,
        deleteCartItemError: action.error ? action.error : null,
        deleteCartItemSuccess: action.subtype === "success",
        deleteCartItemLoading: action.subtype === "loading",
        deleteCartItem:
          action.subtype === "success"
            ? action.deleteCartItem
            : state.deleteCartItem
      };
    }
    default:
      return state;
  }
}
