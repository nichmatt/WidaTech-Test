import { DAHSBOARD_FETCH } from "../action/actionType";

const initialState = {
  data: [],
  isLoading: false,
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case DAHSBOARD_FETCH:
      return {
        ...state,
        data: action.payload,
      };
  }
  return state;
};

export default dashboardReducer;
