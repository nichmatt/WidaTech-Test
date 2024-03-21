import { INVOICE_FETCH } from "./actionType";

const API_URL = "http://localhost:3002";

export function fetchInvoices(p) {
  return async (dispatch, getState) => {
    try {
      console.log("masuk");
      const response = await fetch(API_URL + "/invoices?p=" + p);
      const responseJson = await response.json();
      console.log(responseJson);
      dispatch({
        type: INVOICE_FETCH,
        payload: responseJson,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}
