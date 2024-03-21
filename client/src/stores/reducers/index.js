import { combineReducers } from "redux";
import invoiceReducer from "./invoiceReducer";
import dashboardReducer from "./dashboardReducer";

const rootReducer = combineReducers({
  invoiceReducer,
  dashboardReducer,
});

export default rootReducer;
