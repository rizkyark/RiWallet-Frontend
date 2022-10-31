import axios from "axios";
import Cookies from "js-cookie";

const axiosApiIntances = axios.create({
  baseURL: process.env.URL_BACKEND,
});

// Add a request interceptor
axiosApiIntances.interceptors.request.use(
  function (config) {
    config.headers = {
      Authorization: `Bearer ${Cookies.get("token")}`,
    };

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosApiIntances.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 403) {
      localStorage.clear();
      Cookies.remove("token");
      Cookies.remove("id");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);
export default axiosApiIntances;
