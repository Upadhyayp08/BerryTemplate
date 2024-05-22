import axios from "axios";
import * as actionTypes from "./employeeActionType";
import API from "../../helper/API";
import Notification from "helper/Notification";

// export const createEmployee = (customerData) => async (dispatch) => {
//   try {
//     const response = await API.post(`/employees/store`, customerData);
//     const {
//       data: { message },
//     } = response;
//     Notification("success", message);
//     dispatch({
//       type: actionTypes.CREATE_EMPLOYEE,
//       payload: response.data,
//     });
//   } catch (error) {
//     // Handle error
//   }
// };
export const createEmployee = (customerData) => async (dispatch) => {
  try {
    const response = await API.post(`/employees/store`, customerData);
    const {
      status,
      data: { message },
    } = response;
    // if (status === 200) {
    // Notification("success", message);
    dispatch({
      type: actionTypes.CREATE_EMPLOYEE,
      payload: response.data,
    });
    // } else {
    //   Notification("error", message);
    // }
    return response;
  } catch (error) {
    // Notification("error", error.response);
    throw error; // Rethrow error to be caught in handleSubmit
  }
};

export const getEmployee = (data) => async (dispatch) => {
  try {
    const response = await API.post(
      `/employees/index?page=${data ? data.page : ""}&page_size=${data ? data.page_size : ""}`
    );
    dispatch({
      type: actionTypes.GET_EMPLOYEE,
      payload: response.data.response,
    });
  } catch (error) {
    // Handle error
  }
};

// export const updateEmployee = (updatedData) => async (dispatch) => {
//   try {
//     const response = await API.post(`/employees/update`, updatedData);
//     const {
//       data: { message },
//     } = response;
//     Notification("success", message);
//     dispatch({
//       type: actionTypes.UPDATE_EMPLOYEE,
//       payload: response.data,
//     });
//   } catch (error) {
//     // Handle error
//   }
// };
export const updateEmployee = (updatedData) => async (dispatch) => {
  try {
    const response = await API.post(`/employees/update`, updatedData);
    const {
      data: { message },
    } = response;
    Notification("success", message);
    dispatch({
      type: actionTypes.UPDATE_EMPLOYEE,
      payload: response.data,
    });
  } catch (error) {
    Notification("error", error.response.data.message);
    throw error; // Rethrow error to be caught in handleSubmit
  }
};

export const deleteEmployee = (customerId) => async (dispatch) => {
  try {
    const response = await API.post(`/employees/delete`, customerId);
    const {
      data: { message },
    } = response;
    Notification("success", message);
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

    dispatch({
      type: actionTypes.GETBYID_EMPLOYEE,
      payload: response.data.response,
    });
  } catch (error) {
    // Handle error
  }
};
