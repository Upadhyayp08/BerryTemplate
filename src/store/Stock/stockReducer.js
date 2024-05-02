// blogReducer.js

import * as actionTypes from "./stockActionType";

export const initialState = {
  stocks: [],
  stockbyid: {},
};

const stockReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_STOCK:
      return {
        ...state,
        stocks: [...state.stocks, action.payload],
      };
    case actionTypes.GET_STOCK:
      // You can implement logic to read a specific customer if needed
      return {
        ...state,
        stocks: [...action.payload],
      };
    case actionTypes.GETBYID_STOCK:
      // You can implement logic to read a specific customer if needed
      return {
        ...state,
        stockbyid: { ...action.payload },
      };
    case actionTypes.UPDATE_STOCK:
      return {
        ...state,
        stocks: state.stocks.map((customer) =>
          customer.id === action.payload.customerId
            ? { ...customer, ...action.payload.updatedData }
            : customer
        ),
      };
    case actionTypes.DELETE_STOCK:
      return {
        ...state,
        stocks: state.stocks.filter(
          (customer) => customer.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default stockReducer;
