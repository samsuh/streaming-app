import { combineReducers } from "redux";
import authReducer from "./authReducer";

export default combineReducers({
  // replaceThis: () => "here so redux doesnt error",
  auth: authReducer,
});
