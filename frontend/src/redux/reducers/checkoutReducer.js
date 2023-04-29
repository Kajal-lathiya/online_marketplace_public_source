const initialState = {};

export default function checkout(state = initialState, action = {}) {
  switch (action.type) {
    case "CHECKOUT_ORDER": {
      return {
        ...state,
        checkoutError: action.error ? action.error : null,
        checkoutSuccess: action.subtype === "success",
        checkoutLoading: action.subtype === "loading",
        checkoutData:
          action.subtype === "success"
            ? action.checkoutData
            : state.checkoutData
      };
    }

    default:
      return state;
  }
}
