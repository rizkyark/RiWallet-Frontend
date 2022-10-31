import axios from "../../utils/axios";

export const logout = () => {
  return {
    type: "LOGOUT",
    payload: axios.post(`auth/logout`),
  };
};
