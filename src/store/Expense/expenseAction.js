import axios from "axios";
import * as actionTypes from "./expenseActionType";
import API from "../../helper/API";

export const createExpense = (customerData) => async (dispatch) => {
  try {
    const response = await API.post(`/expense/store`, customerData);
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
    await API.post(`/expense/delete`, customerId);
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
