import { GET_SEARCH, GET_SEARCH_LOADING, GET_SEARCH_ERROR } from "../actions";

const initialState = {
  searchData: [],
  isLoading: true,
  isError: false
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SEARCH:
      return {
        ...state,
        searchData: action.payload
      };
    case GET_SEARCH_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case GET_SEARCH_ERROR:
      return {
        ...state,
        isError: action.payload
      };

    default:
      return state;
  }
};

export default searchReducer;