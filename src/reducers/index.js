import { combineReducers } from "redux";
import app from "./app";
import auth from "./auth";
import alert from "./alert";
import admin from "./admin";
import main from "./main";
export default combineReducers({
  app,
  auth,
  alert,
  admin,
  main,
});
