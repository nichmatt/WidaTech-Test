import { combineReducers } from "redux";
import invoiceReducer from "./invoiceReducer";

const rootReducer = combineReducers({
  invoiceReducer,
});

export default rootReducer;
