// customerReducer.js

import * as actionTypes from "./materialActionType";

export const initialState = {
  materials: [],
  materialbyid: {},
};

const materialReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_MATERIAL:
      return {
        ...state,
        materials: [...state.materials, action.payload],
      };
    case actionTypes.GET_MATERIAL:
      return {
        ...state,
        materials: action.payload,
      };
    case actionTypes.GETBYID_MATERIAL:
      return {
        ...state,
        materialbyid: { ...action.payload },
      };
    case actionTypes.UPDATE_MATERIAL:
      return {
        ...state,
        materials: state.materials.map((customer) =>
          customer.id === action.payload.customerId
            ? { ...customer, ...action.payload.updatedData }
            : customer
        ),
      };
    case actionTypes.DELETE_MATERIAL:
      return {
        ...state,
        materials: state.materials.filter(
          (customer) => customer.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default materialReducer;
