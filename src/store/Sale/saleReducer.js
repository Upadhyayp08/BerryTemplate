// saleReducer.js

import * as actionTypes from "./saleActionType";

export const initialState = {
  sales: [],
  salebyid: {},
};

const saleReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_SALE:
      return {
        ...state,
        sales: [...state.sales, action.payload],
      };
    case actionTypes.GET_SALE:
      // You can implement logic to read a specific customer if needed
      return {
        ...state,
        sales: [...action.payload],
      };
    case actionTypes.GETBYID_SALE:
      // You can implement logic to read a specific customer if needed
      return {
        ...state,
        salebyid: { ...action.payload },
      };
    case actionTypes.UPDATE_SALE:
      return {
        ...state,
        sales: state.sales.map((customer) =>
          customer.id === action.payload.customerId
            ? { ...customer, ...action.payload.updatedData }
            : customer
        ),
      };
    case actionTypes.DELETE_SALE:
      return {
        ...state,
        sales: state.sales.filter((customer) => customer.id !== action.payload),
      };
    // case actionTypes.DELETE_IMAGE:
    //   return {
    //     ...state,
    //     sales: state.sales.filter((customer) => customer.id !== action.payload),
    //   };
    default:
      return state;
  }
};

export default saleReducer;
