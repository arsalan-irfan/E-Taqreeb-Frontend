import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  USER_LOADED,
  VERIFICATION_CODE_STATUS,
  PASSWORD_RESET,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  SOCIAL_LOGIN_SUCCESS,
  EMAIL_SENT,
  Update_User_Failed,
  Update_User_Success,
  Update_User_DP_Success,
  Update_User_DP_Failed,
  PROFILE_COMPLETE,
  BUSINESS_CREATE_SUCCESS,
  BUSINESS_CREATE_FAIL,
  LAWN_ACCOUNT_UPDATE_SUCCESS,
  LAWN_ACCOUNT_UPDATE_FAIL,
  LAWN_PACKAGE_ADD_SUCCESS,
  LAWN_PACKAGE_ADD_FAIL,
  LAWN_PACKAGE_UPDATE_SUCCESS,
  LAWN_PACKAGE_UPDATE_FAIL,
  LAWN_PACKAGE_DELETE_SUCCESS,
  LAWN_PACKAGE_DELETE_FAIL,
  LAWN_LOGO_UPDATED_FAIL,
  LAWN_LOGO_UPDATED_SUCCESS,
  LAWN_IMAGES_UPLOAD_SUCCESS,
  LAWN_IMAGES_UPLOAD_FAILED,
  LAWN_IMAGE_DELETE_FAILED,
  LAWN_IMAGE_DELETE_SUCCESS,
  PUBLISH_LAWN_FAILED,
  PUBLISH_LAWN_SUCCESS,
  
  PHOTOGRAPHER_IMAGES_UPLOAD_SUCCESS,
  PHOTOGRAPHER_IMAGES_UPLOAD_FAILED,
  PHOTOGRAPHER_PACKAGE_ADD_FAIL,
  PHOTOGRAPHER_PACKAGE_ADD_SUCCESS,
  PHOTOGRAPHER_PACKAGE_DELETE_SUCCESS,
  PHOTOGRAPHER_PACKAGE_DELETE_FAIL,
  PHOTOGRAPHER_PACKAGE_UPDATE_SUCCESS,
  PHOTOGRAPHER_PACKAGE_UPDATE_FAIL,
  PHOTOGRAPHER_ACCOUNT_UPDATE_FAIL,
  PHOTOGRAPHER_ACCOUNT_UPDATE_SUCCESS,
  PHOTOGRAPHER_LOGO_UPDATED_SUCCESS,
  PHOTOGRAPHER_LOGO_UPDATED_FAIL,
  PHOTOGRAPHER_IMAGE_DELETE_FAILED,
  PHOTOGRAPHER_IMAGE_DELETE_SUCCESS,
  PUBLISH_PHOTOGRAPHER_FAILED,
  PUBLISH_PHOTOGRAPHER_SUCCESS,
  EMAIL_VERIFIED,

} from "../actions/types";
import LawnPackageModal from "../components/LawnPackageModal/LawnPackageModal";
const initialState = {
  token: localStorage.getItem("token"),
  user: null,
  business: null,
  error: null,
  isLoading: true,
  isAuthenticated: false,
  resetCodeVerified: false,
  processDone: false,
  msg: "",
  emailExist: false,
  type: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        user: payload.user,
        business: payload.business,
        isAuthenticated: true,
        isLoading: false,
        type: payload.type ? payload.type : "user",
      };
    case EMAIL_VERIFIED:
      return{
        ...state,
        user: payload
      }
    case REGISTER_USER_SUCCESS:
    case LOGIN_USER_SUCCESS:
      localStorage.setItem("token", payload.token);
      localStorage.setItem("type", payload.type);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        type: payload.type,
      };
    case SOCIAL_LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
      };
    case PROFILE_COMPLETE:
      console.log(payload);
      return {
        ...state,
        user: payload,
      };
    case EMAIL_SENT:
      return {
        ...state,
        emailExist: true,
      };
    case LOAD_USER_FAIL:
      console.log("load user fail");
      return {
        ...state,
        error: payload,
      };
    case LOGIN_USER_FAIL:
    case REGISTER_USER_FAIL:
      localStorage.removeItem("token");
      localStorage.removeItem("type");

      return {
        ...state,
        user: {},
        error: payload,
        isLoading: false,
        isAuthenticated: false,
      };

    case PASSWORD_RESET:
      return {
        ...state,
        user: null,
        processDone: true,
      };
    case VERIFICATION_CODE_STATUS:
      console.log(payload);
      localStorage.setItem("email", payload.user);
      return {
        ...state,
        user: payload.user,
        resetCodeVerified: true,
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      localStorage.removeItem("type");
      return {
        initialState,
      };

    case Update_User_DP_Success:
    case Update_User_Success:
      return {
        ...state,
        user: payload.user,
      };
    case Update_User_DP_Failed:
    case Update_User_Failed:
      return state;

    case BUSINESS_CREATE_SUCCESS:
      console.log(payload);
      return {
        ...state,
        user: payload.user,
      };
    case LAWN_ACCOUNT_UPDATE_FAIL:
    case BUSINESS_CREATE_FAIL:
      console.log(payload);
      return state;
    case LAWN_ACCOUNT_UPDATE_SUCCESS:
      return {
        ...state,
        business: payload.lawn,
      };
    case PUBLISH_LAWN_FAILED:
    case LAWN_IMAGE_DELETE_FAILED:
    case LAWN_IMAGES_UPLOAD_FAILED:
    case LAWN_LOGO_UPDATED_FAIL:
    case LAWN_PACKAGE_DELETE_FAIL:
    case LAWN_PACKAGE_UPDATE_FAIL:
    case LAWN_PACKAGE_ADD_FAIL:
      return state;

    case PUBLISH_LAWN_SUCCESS:
    case LAWN_IMAGE_DELETE_SUCCESS:
    case LAWN_IMAGES_UPLOAD_SUCCESS:
    case LAWN_LOGO_UPDATED_SUCCESS:
    case LAWN_PACKAGE_DELETE_SUCCESS:
    case LAWN_PACKAGE_UPDATE_SUCCESS:
    case LAWN_PACKAGE_ADD_SUCCESS:
      return {
        ...state,
        business: payload.lawn,
      };

    case PHOTOGRAPHER_ACCOUNT_UPDATE_FAIL:
      console.log(payload);
      return state;
    case PHOTOGRAPHER_ACCOUNT_UPDATE_SUCCESS:
      return {
        ...state,
        business: payload.photographer,
      };
    case PUBLISH_PHOTOGRAPHER_FAILED:
    case PHOTOGRAPHER_IMAGE_DELETE_FAILED:
    case PHOTOGRAPHER_IMAGES_UPLOAD_FAILED:
    case PHOTOGRAPHER_LOGO_UPDATED_FAIL:
    case PHOTOGRAPHER_PACKAGE_DELETE_FAIL:
    case PHOTOGRAPHER_PACKAGE_UPDATE_FAIL:
    case PHOTOGRAPHER_PACKAGE_ADD_FAIL:
      return state;

    case PUBLISH_PHOTOGRAPHER_SUCCESS:
    case PHOTOGRAPHER_IMAGE_DELETE_SUCCESS:
    case PHOTOGRAPHER_IMAGES_UPLOAD_SUCCESS:
    case PHOTOGRAPHER_LOGO_UPDATED_SUCCESS:
    case PHOTOGRAPHER_PACKAGE_DELETE_SUCCESS:
    case PHOTOGRAPHER_PACKAGE_UPDATE_SUCCESS:
    case PHOTOGRAPHER_PACKAGE_ADD_SUCCESS:
      return {
        ...state,
        business: payload.photographer,
      };

    default:
      return state;
  }
}
