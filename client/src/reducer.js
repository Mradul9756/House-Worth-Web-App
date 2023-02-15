export const initialState = {
  listing_result: null,
  loggedIn: false,
  user: null
};

const reducer = (state, action) => {
  switch (action.type) {
    // User code started
    case "UPDATE_LISTING":
      return {
        ...state,
        listing_result: action.listing_result,
      };
    case "UPDATE_LOGGED_IN":
      return {
        ...state,
        status: action.status,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default reducer;
