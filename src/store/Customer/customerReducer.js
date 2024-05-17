// customerReducer.js

import * as actionTypes from "./customerActionType";

export const initialState = {
  customers: [],
  customerbyid: {},
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_CUSTOMER:
      return {
        ...state,
        customers: [...state.customers, action.payload],
      };
    case actionTypes.READ_CUSTOMER:
      // You can implement logic to read a specific customer if needed
      return {
        ...state,
        customers: action.payload,
      };
    case actionTypes.GETBYID_CUSTOMER:
      // You can implement logic to read a specific customer if needed
      return {
        ...state,
        customerbyid: { ...action.payload },
      };
    case actionTypes.UPDATE_CUSTOMER:
      return {
        ...state,
        customers: state.customers.map((customer) =>
          customer.id === action.payload.customerId
            ? { ...customer, ...action.payload.updatedData }
            : customer
        ),
      };
    case actionTypes.DELETE_CUSTOMER:
      return {
        ...state,
        customers: state.customers.filter(
          (customer) => customer.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default customerReducer;
