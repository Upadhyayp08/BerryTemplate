import axios from "axios";
import API from "helper/API";
import Notification from "helper/Notification";
import * as actionTypes from "./albumActionType";

export const createAlbum = (customerData) => async (dispatch) => {
  try {
    const response = await API.post(`/gallery/store`, customerData);
    const {
      data: { message },
    } = response;
    Notification("success", message);
    dispatch({
      type: actionTypes.CREATE_ALBUM,
      payload: response.data,
    });
  } catch (error) {
    // Handle error
  }
};

export const getAlbum = () => async (dispatch) => {
  try {
    const response = await API.post(`/gallery/index`);
    dispatch({
      type: actionTypes.GET_ALBUM,
      payload: response.data.response,
    });
  } catch (error) {
    // Handle error
  }
};

export const updateAlbum = (updatedData) => async (dispatch) => {
  try {
    const response = await API.post(`/gallery/update`, updatedData);
    const {
      data: { message },
    } = response;
    Notification("success", message);
    dispatch({
      type: actionTypes.UPDATE_ALBUM,
      payload: response.data,
    });
  } catch (error) {
    // Handle error
  }
};

export const deleteAlbum = (customerId) => async (dispatch) => {
  try {
    const response = await API.post(`/gallery/delete`, customerId);
    const {
      data: { message },
    } = response;
    Notification("success", message);
    dispatch({
      type: actionTypes.DELETE_ALBUM,
      payload: customerId,
    });
  } catch (error) {
    console.log(error);
  }
};
export const deleteImage = (customerId) => async (dispatch) => {
  try {
    const response = await API.post(`/gallery/image-delete`, customerId);
    const {
      data: { message },
    } = response;
    Notification("success", message);
    dispatch({
      type: actionTypes.DELETE_IMAGE,
      payload: customerId,
    });
  } catch (error) {
    console.log(error);
  }
};

export const AlbumById = (customerId) => async (dispatch) => {
  try {
    const response = await API.post(`/gallery/edit`, { id: customerId });

    dispatch({
      type: actionTypes.GETBYID_ALBUM,
      payload: response.data.response,
    });
  } catch (error) {
    // Handle error
  }
};
