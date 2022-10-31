import axios from "../../utils/axios";

export const getUser = (id) => {
  return {
    type: "GET_USER",
    payload: axios.get(`user/profile/${id}`),
  };
};

export const getAllUser = ({ page, limit, search, sort } = {}) => {
  return {
    type: "GET_ALL_USER",
    payload: axios.get(
      `/user?page=1&limit=${limit}&search=&sort=firstName ASC`
    ),
  };
};

export const checkPin = (pin) => {
  return {
    type: "CHECK_PIN",
    payload: axios.get(`user/pin/${pin}`),
  };
};

export const updateProfile = (id, form) => {
  return {
    type: "UPDATE_PROFILE",
    payload: axios.patch(`user/profile/${id}`, form),
  };
};

export const updateImage = (id, form) => {
  return {
    type: "UPDATE_IMAGE",
    payload: axios.patch(`user/image/${id}`, form),
  };
};

export const deleteImage = (id) => {
  return {
    type: "DELETE_IMAGE",
    payload: axios.delete(`user/image/${id}`),
  };
};

export const changePassword = (id, form) => {
  return {
    type: "UPDATE_PASSWORD",
    payload: axios.patch(`user/password/${id}`, form),
  };
};

export const changePhone = (id, form) => {
  return {
    type: "UPDATE_PHONE",
    payload: axios.patch(`user/profile/${id}`, { noTelp: form }),
  };
};

export const dashboard = (id) => {
  return {
    type: "GET_DASHBOARD",
    payload: axios.get(`dashboard/${id}`),
  };
};
