// albumReducer.js

import * as actionTypes from "./albumActionType";

export const initialState = {
  albums: [],
  albumbyid: {},
};

const albumReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_ALBUM:
      return {
        ...state,
        albums: [...state.albums, action.payload],
      };
    case actionTypes.GET_ALBUM:
      // You can implement logic to read a specific customer if needed
      return {
        ...state,
        albums: [...action.payload],
      };
    case actionTypes.GETBYID_ALBUM:
      // You can implement logic to read a specific customer if needed
      return {
        ...state,
        albumbyid: { ...action.payload },
      };
    case actionTypes.UPDATE_ALBUM:
      return {
        ...state,
        albums: state.albums.map((customer) =>
          customer.id === action.payload.customerId
            ? { ...customer, ...action.payload.updatedData }
            : customer
        ),
      };
    case actionTypes.DELETE_ALBUM:
      return {
        ...state,
        albums: state.albums.filter(
          (customer) => customer.id !== action.payload
        ),
      };
    case actionTypes.DELETE_IMAGE:
      return {
        ...state,
        albums: state.albums.filter(
          (customer) => customer.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default albumReducer;
