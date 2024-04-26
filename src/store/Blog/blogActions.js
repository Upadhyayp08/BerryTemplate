import axios from "axios";
import API from "helper/API";
import * as actionTypes from "./blogActionType";

export const createBlog = (customerData) => async (dispatch) => {
  try {
    const response = await API.post(`/blogs/store`, customerData);
    dispatch({
      type: actionTypes.CREATE_BLOG,
      payload: response.data,
    });
  } catch (error) {
    // Handle error
  }
};

export const getBlog = () => async (dispatch) => {
  try {
    const response = await API.post(`/blogs/index`);
    dispatch({
      type: actionTypes.GET_BLOG,
      payload: response.data.response,
    });
  } catch (error) {
    // Handle error
  }
};

export const updateBlog = (updatedData) => async (dispatch) => {
  try {
    const response = await API.post(`/blogs/update`, updatedData);
    dispatch({
      type: actionTypes.UPDATE_BLOG,
      payload: response.data,
    });
  } catch (error) {
    // Handle error
  }
};

export const deleteBlog = (customerId) => async (dispatch) => {
  try {
    await API.post(`/blogs/delete`, customerId);
    dispatch({
      type: actionTypes.DELETE_BLOG,
      payload: customerId,
    });
  } catch (error) {
    console.log(error);
  }
};

export const BlogById = (customerId) => async (dispatch) => {
  try {
    const response = await API.post(`/blogs/edit`, { id: customerId });
    console.log(response);
    dispatch({
      type: actionTypes.GETBYID_BLOG,
      payload: response.data.response,
    });
  } catch (error) {
    // Handle error
  }
};
