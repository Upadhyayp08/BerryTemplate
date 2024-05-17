import axios from "axios";
import * as actionTypes from "./materialActionType";
import API from "../../helper/API";
import Notification from "helper/Notification";

export const createMaterial = (customerData) => async (dispatch) => {
  try {
    const response = await API.post(`/materials/store`, customerData);
    const {
      data: { message },
    } = response;
    Notification("success", message);
    dispatch({
      type: actionTypes.CREATE_MATERIAL,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMaterial = (data) => async (dispatch) => {
  try {
    const response = await API.post(
      `/materials/index?page=${data?.page ? data.page : ""}&page_size=${data?.page_size ? data.page_size : ""}`
    );
    console.log(response);
    dispatch({
      type: actionTypes.GET_MATERIAL,
      payload: response.data.response,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateMaterial = (updatedData) => async (dispatch) => {
  try {
    const response = await API.post(`/materials/update`, updatedData);
    const {
      data: { message },
    } = response;
    Notification("success", message);
    dispatch({
      type: actionTypes.UPDATE_MATERIAL,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteMATERIAL = (customerId) => async (dispatch) => {
  try {
    const response = await API.post(`/materials/delete`, customerId);
    const {
      data: { message },
    } = response;
    Notification("success", message);
    dispatch({
      type: actionTypes.DELETE_MATERIAL,
      payload: customerId,
    });
  } catch (error) {
    console.log(error);
  }
};

export const MaterialById = (customerId) => async (dispatch) => {
  try {
    const response = await API.post(`/materials/edit`, { id: customerId });

    dispatch({
      type: actionTypes.GETBYID_MATERIAL,
      payload: response.data.response,
    });
  } catch (error) {
    console.log(error);
  }
};
