const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  msg: "",
};

const Transaction = (state = initialState, action) => {
  switch (action.type) {
    case "TRANSFER_PENDING":
      return {
        ...state,
        isError: false,

        isLoading: true,
      };

    case "TRANSFER_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,

        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };

    case "TRANSFER_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        pageInfo: {},
        msg: action.payload.response.data,
      };

    case "TOPUP_PENDING":
      return {
        ...state,
        isError: false,
        isLoading: true,
      };

    case "TOPUP_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };

    case "TOPUP_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        pageInfo: {},
        msg: action.payload.response.data,
      };

    case "HISTORY_PENDING":
      return {
        ...state,
        isError: false,
        isLoading: true,
      };

    case "HISTORY_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };

    case "HISTORY_REJECTED":
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

export default Transaction;
