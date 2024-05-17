import axios from "axios";
import API from "helper/API";
import Notification from "helper/Notification";
import * as actionTypes from "./itemActionType";

export const createItem = (customerData) => async (dispatch) => {
  try {
    const response = await API.post(`/items/store`, customerData);
    const {
      data: { message },
    } = response;
    Notification("success", message);
    dispatch({
      type: actionTypes.CREATE_ITEM,
      payload: response.data,
    });
  } catch (error) {
    // Handle error
  }
};

export const getItem = (data) => async (dispatch) => {
  try {
    const response = await API.post(
      `/items/index?page=${data ? data.page : ""}&page_size=${data ? data.page_size : ""}`
    );

    dispatch({
      type: actionTypes.GET_ITEM,
      payload: response.data.response,
    });
  } catch (error) {
    // Handle error
  }
};

export const updateItem = (updatedData) => async (dispatch) => {
  try {
    const response = await API.post(`/items/update`, updatedData);
    const {
      data: { message },
    } = response;
    Notification("success", message);
    dispatch({
      type: actionTypes.UPDATE_ITEM,
      payload: response.data,
    });
  } catch (error) {
    // Handle error
  }
};

export const deleteItem = (customerId) => async (dispatch) => {
  try {
    const response = await API.post(`/items/delete`, customerId);
    const {
      data: { message },
    } = response;
    Notification("success", message);
    dispatch({
      type: actionTypes.DELETE_ITEM,
      payload: customerId,
    });
  } catch (error) {
    console.log(error);
  }
};

export const ItemById = (customerId) => async (dispatch) => {
  try {
    const response = await API.post(`/items/edit`, { id: customerId });

    dispatch({
      type: actionTypes.GETBYID_ITEM,
      payload: response.data.response,
    });
  } catch (error) {
    // Handle error
  }
};
