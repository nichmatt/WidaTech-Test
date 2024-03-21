import { redirect } from "react-router-dom";
import { DAHSBOARD_FETCH, INVOICE_FETCH } from "./actionType";

const API_URL = "http://localhost:3002";

export function fetchInvoices(p) {
  return async (dispatch) => {
    try {
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

export function addInvoice(payload) {
  return async (dispatch) => {
    try {
      console.log("masuk");
      await fetch(API_URL + "/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      dispatch(fetchInvoices());
      return redirect("/card-invoice");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

export function fetchDashboard(type) {
  return async (dispatch) => {
    try {
      if (type === "daily") {
        const response = await fetch(API_URL + "/revenue/daily");
        const responseJson = await response.json();
        console.log(responseJson);
        dispatch({
          type: DAHSBOARD_FETCH,
          payload: responseJson,
        });
      }
      if (type === "monthly") {
        const response = await fetch(API_URL + "/revenue/monthly");
        const responseJson = await response.json();
        console.log(responseJson);
        dispatch({
          type: DAHSBOARD_FETCH,
          payload: responseJson,
        });
      }
      if (type === "yearly") {
        const response = await fetch(API_URL + "/revenue/yearly");
        const responseJson = await response.json();
        console.log(responseJson);
        dispatch({
          type: DAHSBOARD_FETCH,
          payload: responseJson,
        });
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}
