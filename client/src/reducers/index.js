import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";

export default combineReducers({
  // replaceThis: () => "here so redux doesnt error",
  auth: authReducer,
  form: formReducer,
});
