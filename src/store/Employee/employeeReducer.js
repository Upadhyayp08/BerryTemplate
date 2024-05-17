// customerReducer.js

import * as actionTypes from "./employeeActionType";

export const initialState = {
  employees: [],
  employeebyid: {},
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_EMPLOYEE:
      return {
        ...state,
        employees: [...state.employees, action.payload],
      };
    case actionTypes.GET_EMPLOYEE:
      // You can implement logic to read a specific customer if needed
      return {
        ...state,
        employees: action.payload,
      };
    case actionTypes.GETBYID_EMPLOYEE:
      // You can implement logic to read a specific customer if needed
      return {
        ...state,
        employeebyid: { ...action.payload },
      };
    case actionTypes.UPDATE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.map((customer) =>
          customer.id === action.payload.customerId
            ? { ...customer, ...action.payload.updatedData }
            : customer
        ),
      };
    case actionTypes.DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter(
          (customer) => customer.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default employeeReducer;
