import axios from "axios";
import * as actionTypes from "./expenseActionType";
import API from "../../helper/API";
import Notification from "helper/Notification";

export const createExpense = (customerData) => async (dispatch) => {
  try {
    const response = await API.post(`/expense/store`, customerData);
    const {
      data: { message },
    } = response;
    Notification("success", message);
    dispatch({
      type: actionTypes.CREATE_EXPENSE,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getExpense = () => async (dispatch) => {
  try {
    const response = await API.post(`/expense/index`);

    dispatch({
      type: actionTypes.GET_EXPENSE,
      payload: response.data.response,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateExpense = (updatedData) => async (dispatch) => {
  try {
    const response = await API.post(`/expense/update`, updatedData);
    const {
      data: { message },
    } = response;
    Notification("success", message);
    dispatch({
      type: actionTypes.UPDATE_EXPENSE,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteExpense = (customerId) => async (dispatch) => {
  try {
    const response = await API.post(`/expense/delete`, customerId);
    const {
      data: { message },
    } = response;
    Notification("success", message);
    dispatch({
      type: actionTypes.DELETE_EXPENSE,
      payload: customerId,
    });
  } catch (error) {
    console.log(error);
  }
};

export const ExpenseById = (customerId) => async (dispatch) => {
  try {
    const response = await API.post(`/expense/edit`, { id: customerId });
    console.log(response);
    dispatch({
      type: actionTypes.GETBYID_EXPENSE,
      payload: response.data.response,
    });
  } catch (error) {
    console.log(error);
  }
};
