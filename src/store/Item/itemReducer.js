// blogReducer.js

import * as actionTypes from "./itemActionType";

export const initialState = {
  items: [],
  itembyid: {},
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case actionTypes.GET_ITEM:
      // You can implement logic to read a specific customer if needed
      return {
        ...state,
        items: [...action.payload],
      };
    case actionTypes.GETBYID_ITEM:
      // You can implement logic to read a specific customer if needed
      return {
        ...state,
        itembyid: { ...action.payload },
      };
    case actionTypes.UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map((customer) =>
          customer.id === action.payload.customerId
            ? { ...customer, ...action.payload.updatedData }
            : customer
        ),
      };
    case actionTypes.DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((customer) => customer.id !== action.payload),
      };
    default:
      return state;
  }
};

export default itemReducer;
