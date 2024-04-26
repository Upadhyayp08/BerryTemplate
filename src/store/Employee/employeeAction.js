import axios from "axios";
import * as actionTypes from "./employeeActionType";
import API from "../../helper/API";

export const createEmployee = (customerData) => async (dispatch) => {
  try {
    const response = await API.post(`/employees/store`, customerData);
    dispatch({
      type: actionTypes.CREATE_EMPLOYEE,
      payload: response.data,
    });
  } catch (error) {
    // Handle error
  }
};

export const getEmployee = () => async (dispatch) => {
  try {
    const response = await API.post(`/employees/index`);
    dispatch({
      type: actionTypes.GET_EMPLOYEE,
      payload: response.data.response,
    });
  } catch (error) {
    // Handle error
  }
};

export const updateEmployee = (updatedData) => async (dispatch) => {
  try {
    const response = await API.post(`/employees/update`, updatedData);
    dispatch({
      type: actionTypes.UPDATE_EMPLOYEE,
      payload: response.data,
    });
  } catch (error) {
    // Handle error
  }
};

export const deleteEmployee = (customerId) => async (dispatch) => {
  try {
    await API.post(`/employees/delete`, customerId);
    dispatch({
      type: actionTypes.DELETE_EMPLOYEE,
      payload: customerId,
    });
  } catch (error) {
    // Handle error
  }
};

export const EmployeeById = (customerId) => async (dispatch) => {
  try {
    const response = await API.post(`/employees/edit`, { id: customerId });
    console.log(response);
    dispatch({
      type: actionTypes.GETBYID_EMPLOYEE,
      payload: response.data.response,
    });
  } catch (error) {
    // Handle error
  }
};
