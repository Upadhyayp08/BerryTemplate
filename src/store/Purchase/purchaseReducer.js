// customerReducer.js

import * as actionTypes from "./purchaseActionType";

export const initialState = {
  purchases: [],
  purchasebyid: {},
};

const purchaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_PURCHASE:
      return {
        ...state,
        purchases: [...state.purchases, action.payload],
      };
    case actionTypes.GET_PURCHASE:
      return {
        ...state,
        purchases: action.payload,
      };
    case actionTypes.GETBYID_PURCHASE:
      return {
        ...state,
        purchasebyid: { ...action.payload },
      };
    case actionTypes.UPDATE_PURCHASE:
      return {
        ...state,
        purchases: state.purchases.map((customer) =>
          customer.id === action.payload.customerId
            ? { ...customer, ...action.payload.updatedData }
            : customer
        ),
      };
    case actionTypes.DELETE_PURCHASE:
      return {
        ...state,
        purchases: state.purchases.filter(
          (customer) => customer.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default purchaseReducer;
