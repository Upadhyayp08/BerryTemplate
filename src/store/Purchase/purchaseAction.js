import axios from "axios";
import * as actionTypes from "./purchaseActionType";
import API from "../../helper/API";
import Notification from "helper/Notification";

export const createPurchase = (customerData) => async (dispatch) => {
  try {
    const response = await API.post(`/purchase/store`, customerData);
    const {
      data: { message },
    } = response;
    Notification("success", message);
    dispatch({
      type: actionTypes.CREATE_PURCHASE,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPurchase =
  ({ page, page_size }) =>
  async (dispatch) => {
    try {
      const response = await API.post(
        `/purchase/index?page=${page}&page_size=${page_size}`
      );

      dispatch({
        type: actionTypes.GET_PURCHASE,
        payload: response.data.response,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const updatePurchase = (updatedData) => async (dispatch) => {
  try {
    const response = await API.post(`/purchase/update`, updatedData);
    const {
      data: { message },
    } = response;
    Notification("success", message);
    dispatch({
      type: actionTypes.UPDATE_PURCHASE,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletePurchase = (customerId) => async (dispatch) => {
  try {
    const response = await API.post(`/purchase/delete`, customerId);
    const {
      data: { message },
    } = response;
    Notification("success", message);
    dispatch({
      type: actionTypes.DELETE_PURCHASE,
      payload: customerId,
    });
  } catch (error) {
    console.log(error);
  }
};

export const PurchaseById = (customerId) => async (dispatch) => {
  try {
    const response = await API.post(`/purchase/edit`, { id: customerId });

    dispatch({
      type: actionTypes.GETBYID_PURCHASE,
      payload: response.data.response,
    });
  } catch (error) {
    console.log(error);
  }
};
