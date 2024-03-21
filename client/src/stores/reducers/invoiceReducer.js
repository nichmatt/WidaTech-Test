import { INVOICE_FETCH } from "../action/actionType";

const initialState = {
  data: [],
  isLoading: false,
};

const invoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case INVOICE_FETCH:
      console.log("fetching invoices");
      return {
        ...state,
        data: action.payload,
      };
  }
  return state;
};

export default invoiceReducer;
