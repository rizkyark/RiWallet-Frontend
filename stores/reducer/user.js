const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  msg: "",
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER_PENDING":
      return {
        ...state,
        isLoading: true,
      };

    case "GET_USER_FULFILLED":
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };

    case "GET_USER_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        pageInfo: {},
        msg: action.payload.response.data,
      };

    case "GET_ALL_USER_PENDING":
      return {
        ...state,
        isLoading: true,
      };

    case "GET_ALL_USER_FULFILLED":
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.data,
        pageInfo: action.payload.data.pagination,
        msg: action.payload.data.msg,
      };

    case "CHECK_PIN_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        pageInfo: {},
        msg: action.payload.response.data,
      };

    case "CHECK_PIN_PENDING":
      return {
        ...state,
        isLoading: true,
      };

    case "CHECK_PIN_FULFILLED":
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.data,
        pageInfo: action.payload.data.pagination,
        msg: action.payload.data.msg,
      };

    case "GET_ALL_USER_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        pageInfo: {},
        msg: action.payload.response.data,
      };

    case "UPDATE_PROFILE_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case "UPDATE_PROFILE_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };

    case "UPDATE_PROFILE_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data,
      };

    case "UPDATE_IMAGE_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case "UPDATE_IMAGE_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };

    case "UPDATE_IMAGE_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data,
      };

    case "DELETE_IMAGE_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case "DELETE_IMAGE_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };

    case "DELETE_IMAGE_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data,
      };

    case "UPDATE_PASSWORD_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case "UPDATE_PASSWORD_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };

    case "UPDATE_PASSWORD_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data,
      };

    case "UPDATE_PHONE_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case "UPDATE_PHONE_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };

    case "UPDATE_PHONE_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data,
      };

    case "GET_DASHBOARD_PENDING":
      return {
        ...state,
        isLoading: true,
      };

    case "GET_DASHBOARD_FULFILLED":
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };

    case "GET_DASHBOARD_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        pageInfo: {},
        msg: action.payload.response.data,
      };

    default:
      return state;
  }
};

export default user;
