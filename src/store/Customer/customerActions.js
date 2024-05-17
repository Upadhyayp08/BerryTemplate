import axios from "axios";
import API from "helper/API";
import Notification from "helper/Notification";
import * as actionTypes from "./customerActionType";

export const createCustomer = (customerData) => async (dispatch) => {
  try {
    const response = await API.post(`/customers/store`, customerData);
    const {
      data: { message },
    } = response;
    Notification("success", message);
    dispatch({
      type: actionTypes.CREATE_CUSTOMER,
      payload: response.data,
    });
  } catch (error) {
    // Handle error
  }
};

export const readCustomer = (data) => async (dispatch) => {
  try {
    const response = await API.post(
      `/customers/index?page=${data ? data.page : ""}&page_size=${data ? data.page_size : ""}`
    );
    dispatch({
      type: actionTypes.READ_CUSTOMER,
      payload: response.data.response,
    });
  } catch (error) {
    // Handle error
  }
};

export const updateCustomer = (updatedData) => async (dispatch) => {
  try {
    const response = await API.post(`/customers/update`, updatedData);
    const {
      data: { message },
    } = response;
    Notification("success", message);
    dispatch({
      type: actionTypes.UPDATE_CUSTOMER,
      payload: response.data,
    });
  } catch (error) {
    // Handle error
  }
};

export const deleteCustomer = (customerId) => async (dispatch) => {
  try {
    const response = await API.post(`/customers/delete`, customerId);
    const {
      data: { message },
    } = response;
    Notification("success", message);
    dispatch({
      type: actionTypes.DELETE_CUSTOMER,
      payload: customerId,
    });
  } catch (error) {
    // Handle error
  }
};

export const CustomerById = (customerId) => async (dispatch) => {
  try {
    const response = await API.post(`/customers/get-by-id`, { id: customerId });

    dispatch({
      type: actionTypes.GETBYID_CUSTOMER,
      payload: response.data.response,
    });
  } catch (error) {
    // Handle error
  }
};
