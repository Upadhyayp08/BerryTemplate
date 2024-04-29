import axios from "axios";
// import { useNavigate } from 'react-router-dom';
// import Notification from '../layouts/Notification/Notification';

const baseUrl = "https://sahten.thebizzbuddy.com/public/api";

const API = axios.create({
  baseURL: baseUrl,
  timeout: 30000, // 30 secs
  validateStatus: (status) => status,
});
// Request interceptor to add headers conditionally
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 Unauthorized globally
API.interceptors.response.use(
  (response) => {
    // Successful response, return it so it can be processed by then/catch

    if (response && response.status === 401) {
      // Clear local storage or specific items like token
      //   Notification('error', 'Login First');
      localStorage.clear();
      // window.location.href = "/free/pages/login/login3";
      window.location.href = "/pages/login/login3";
    }
    return response;
  },
  (error) => {
    if (error && error.status === 401) {
      // Consider replacing console.log with a more secure logging solution for production
      console.log("Unauthorized error:", error);

      // Clearing local storage and redirecting to the login page
      localStorage.clear();
      // window.location.href = "/free/pages/login/login3";
      window.location.href = "/pages/login/login3";

      // Display a notification to the user
      Notification("error", "Please login to Continue");
    }

    // Return any error which is not due to 401 to be handled in then/catch
    return Promise.reject(error);
  }
);

export default API;
