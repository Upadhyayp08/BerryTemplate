// customerReducer.js

import * as actionTypes from "./expenseActionType";

export const initialState = {
  expenses: [],
  expensebyid: {},
};

const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case actionTypes.GET_EXPENSE:
      // You can implement logic to read a specific customer if needed
      return {
        ...state,
        expenses: action.payload,
      };
    case actionTypes.GETBYID_EXPENSE:
      // You can implement logic to read a specific customer if needed
      return {
        ...state,
        expensebyid: { ...action.payload },
      };
    case actionTypes.UPDATE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.map((customer) =>
          customer.id === action.payload.customerId
            ? { ...customer, ...action.payload.updatedData }
            : customer
        ),
      };
    case actionTypes.DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter(
          (customer) => customer.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default expenseReducer;
