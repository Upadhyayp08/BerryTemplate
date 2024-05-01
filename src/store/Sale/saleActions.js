import axios from "axios";
import API from "helper/API";
import Notification from "helper/Notification";
import * as actionTypes from "./saleActionType";

export const createSale = (customerData) => async (dispatch) => {
  try {
    const response = await API.post(`/sells/store`, customerData);
    const {
      data: { message },
    } = response;
    Notification("success", message);
    dispatch({
      type: actionTypes.CREATE_SALE,
      payload: response.data,
    });
  } catch (error) {
    Notification("error", "Something Went Wrong");
  }
};

export const getSale = () => async (dispatch) => {
  try {
    const response = await API.post(`/sells/index`);
    dispatch({
      type: actionTypes.GET_SALE,
      payload: response.data.response,
    });
  } catch (error) {
    // Handle error
  }
};

export const updateSale = (updatedData) => async (dispatch) => {
  try {
    const response = await API.post(`/sells/update`, updatedData);
    const {
      data: { message },
    } = response;
    Notification("success", message);
    dispatch({
      type: actionTypes.UPDATE_SALE,
      payload: response.data,
    });
  } catch (error) {
    // Handle error
  }
};

export const deleteSale = (customerId) => async (dispatch) => {
  try {
    const response = await API.post(`/sells/delete`, customerId);
    const {
      data: { message },
    } = response;
    Notification("success", message);
    dispatch({
      type: actionTypes.DELETE_SALE,
      payload: customerId,
    });
  } catch (error) {
    console.log(error);
  }
};
// // export const deleteImage = (customerId) => async (dispatch) => {
// //   try {
// //     const response = await API.post(`/gallery/image-delete`, customerId);
// //     const {
// //       data: { message },
// //     } = response;
// //     Notification("success", message);
// //     dispatch({
// //       type: actionTypes.DELETE_IMAGE,
// //       payload: customerId,
// //     });
// //   } catch (error) {
// //     console.log(error);
// //   }
// // };

export const SaleById = (customerId) => async (dispatch) => {
  try {
    const response = await API.post(`/sells/edit`, { id: customerId });
    console.log(response);
    dispatch({
      type: actionTypes.GETBYID_SALE,
      payload: response.data.response,
    });
  } catch (error) {
    // Handle error
  }
};
