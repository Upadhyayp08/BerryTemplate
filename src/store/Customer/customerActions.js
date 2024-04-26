import axios from "axios";
import API from "helper/API";
import * as actionTypes from "./customerActionType";

export const createCustomer = (customerData) => async (dispatch) => {
  try {
    const response = await API.post(`/customers/store`, customerData);
    dispatch({
      type: actionTypes.CREATE_CUSTOMER,
      payload: response.data,
    });
  } catch (error) {
    // Handle error
  }
};

export const readCustomer = () => async (dispatch) => {
  try {
    const response = await API.post(`/customers/index`);
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
    await API.post(`/customers/delete`, customerId);
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
    console.log(response);
    dispatch({
      type: actionTypes.GETBYID_CUSTOMER,
      payload: response.data.response,
    });
  } catch (error) {
    // Handle error
  }
};
