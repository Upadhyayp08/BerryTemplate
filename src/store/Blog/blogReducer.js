// blogReducer.js

import * as actionTypes from "./blogActionType";

export const initialState = {
  blogs: [],
  blogbyid: {},
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_BLOG:
      return {
        ...state,
        blogs: [...state.blogs, action.payload],
      };
    case actionTypes.GET_BLOG:
      // You can implement logic to read a specific customer if needed
      return {
        ...state,
        blogs: [...action.payload],
      };
    case actionTypes.GETBYID_BLOG:
      // You can implement logic to read a specific customer if needed
      return {
        ...state,
        blogbyid: { ...action.payload },
      };
    case actionTypes.UPDATE_BLOG:
      return {
        ...state,
        blogs: state.blogs.map((customer) =>
          customer.id === action.payload.customerId
            ? { ...customer, ...action.payload.updatedData }
            : customer
        ),
      };
    case actionTypes.DELETE_BLOG:
      return {
        ...state,
        blogs: state.blogs.filter((customer) => customer.id !== action.payload),
      };
    default:
      return state;
  }
};

export default blogReducer;
