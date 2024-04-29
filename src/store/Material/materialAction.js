import axios from "axios";
import * as actionTypes from "./materialActionType";
import API from "../../helper/API";

export const createMaterial = (customerData) => async (dispatch) => {
  try {
    const response = await API.post(`/materials/store`, customerData);
    dispatch({
      type: actionTypes.CREATE_MATERIAL,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMaterial = () => async (dispatch) => {
  try {
    const response = await API.post(`/materials/index`);
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
    await API.post(`/materials/delete`, customerId);
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
    console.log(response);
    dispatch({
      type: actionTypes.GETBYID_MATERIAL,
      payload: response.data.response,
    });
  } catch (error) {
    console.log(error);
  }
};