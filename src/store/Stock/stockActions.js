import axios from "axios";
import API from "helper/API";
import Notification from "helper/Notification";
import * as actionTypes from "./stockActionType";

export const createStock = (customerData) => async (dispatch) => {
  try {
    const response = await API.post(`/stocks/store`, customerData);
    const {
      data: { message },
    } = response;
    Notification("success", message);
    dispatch({
      type: actionTypes.CREATE_STOCK,
      payload: response.data,
    });
  } catch (error) {
    // Handle error
  }
};

export const getStock = (data) => async (dispatch) => {
  try {
    const response = await API.post(
      `/stocks/index?page=${data ? data.page : ""}&page_size=${data ? data.page_size : ""}`
    );

    dispatch({
      type: actionTypes.GET_STOCK,
      payload: response.data.response,
    });
  } catch (error) {
    // Handle error
  }
};

export const updateStock = (updatedData) => async (dispatch) => {
  try {
    const response = await API.post(`/stocks/update`, updatedData);
    const {
      data: { message },
    } = response;
    Notification("success", message);
    dispatch({
      type: actionTypes.UPDATE_STOCK,
      payload: response.data,
    });
  } catch (error) {
    // Handle error
  }
};

export const deleteStock = (customerId) => async (dispatch) => {
  try {
    const response = await API.post(`/stocks/delete`, customerId);
    const {
      data: { message },
    } = response;
    Notification("success", message);
    dispatch({
      type: actionTypes.DELETE_STOCK,
      payload: customerId,
    });
  } catch (error) {
    console.log(error);
  }
};

export const StockById = (customerId) => async (dispatch) => {
  try {
    const response = await API.post(`/stocks/edit`, { id: customerId });

    dispatch({
      type: actionTypes.GETBYID_STOCK,
      payload: response.data.response,
    });
  } catch (error) {
    // Handle error
  }
};
