import axios from "axios";
import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  USER_LOADED,
  VERIFICATION_CODE_STATUS,
  PASSWORD_RESET,
  LOGOUT_SUCCESS,
  LOAD_USER_FAIL,
  SOCIAL_LOGIN_SUCCESS,
  EMAIL_SENT,
  Update_User_DP_Failed,
  Update_User_DP_Success,
  Update_User_Failed,
  Update_User_Success,
  PROFILE_COMPLETE,
  IS_OFFLINE,
  EMAIL_VERIFIED
} from "./types";
import history from "../history";
//import { fetchBusiness } from "./admin";

//import setAuthToken from "../utils/setAuthToken";
import { setAlert, dum, successAlert, errorsAlert } from "./alert";
import { fetchUserCount, fetchLawns, fetchPhotographers, fetchUsers } from "./admin";

const domain = "https://e-taqreeb-api.herokuapp.com";

//Load User

export const loadToken = (token) => async (dispatch) => {
  console.log("inside load Token:", token);
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: token,
  });
};

export const loadUser = () => async (dispatch) => {
  console.log('load user dispatched!')
  if (localStorage.token) {
    const config = {
      headers: {
        "x-auth-token": localStorage.token,
      },
    };
    await axios
      .get(`${domain}/authUser`, config)
      .then((res) => {
        console.log(res.data);
        if (res) {
          if(res.data.type == "admin"){
            console.log('condition matched')
            dispatch(fetchUserCount(localStorage.token))
            dispatch(fetchUsers(localStorage.token))
            dispatch(fetchLawns(localStorage.token))
            dispatch(fetchPhotographers(localStorage.token))

          }
          dispatch({
            type: USER_LOADED,
            payload: res.data,
          });
          //Fetching Business
          if (res.data.business) 
          console.log('lets fetch business' )
          // dispatch(fetchBusiness(res.data.business));
        }
      })
      .catch((err) => {
        console.log('Error Auth',err)
        if(err.response){
          const Errors = err.response.data.Errors;
          if (Errors) {
            errorsAlert(Errors);
          }
  
          dispatch({
            type: LOGIN_USER_FAIL,
          });  
        }
        else{
          dispatch({
            type: IS_OFFLINE,
          });
        }
        
      });
  }


};

//SignUp
export const updateUser = ({ name, phone, gender, city }) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "x-auth-token": localStorage.token,
      },
    };
    let res = await axios.post(
      `${domain}/users/update`,
      { name, phone, gender, city },
      config
    );

    if (res.data.user) {
      successAlert("Account created successfully");
      dispatch({
        type: Update_User_Success,
        payload: res.data,
      });
    }
  } catch (error) {
    let Errors = [];
    Errors.push({ error: error.response.data.error });
    errorsAlert(Errors);
    dispatch({
      type: Update_User_Failed,
    });
  }
};

export const updateDp = ({ image }) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "x-auth-token": localStorage.token,
      },
    };
    var formData = new FormData();
    formData.append("image", image);

    const res = await axios.post(
      `${domain}/users//updateProfilePic`,
      formData,
      config
    );
    if (res.data.user) {
      successAlert("Profile picture changed successfully");
      dispatch({
        type: Update_User_DP_Success,
        payload: res.data,
      });
    } else {
      errorsAlert("Failed in changing profile picture");
      dispatch({
        type: Update_User_DP_Failed,
      });
    }
  } catch (error) {
    let Errors = error.response.data.Errors;
    errorsAlert(Errors);
    dispatch({
      type: Update_User_DP_Failed,
    });
  }
};

export const registerUser = (
  { name, email, phone, password, password2, image, gender, city },
  router
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  let imageURL =
    "https://s3-us-west-1.amazonaws.com/s3-lc-upload/assets/default_avatar.jpg";
  var formData = new FormData();
  formData.append("image", image);

  if (image) {
    try {
      const ires = await axios.post(`${domain}/users/upload`, formData);
      imageURL = ires.data;
    } catch (error) {
      console.log(error);
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error,
      });
    }
  }
  try {
    const body = JSON.stringify({
      email,
      name,
      password,
      password2,
      phone,
      imageURL: imageURL,
      gender,
      city,
    });
    //}
    //console.log(body);
    const res = await axios.post(`${domain}/users/register`, body, config);

    if (res.data && res.data.token) {
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: res.data,
      });
      successAlert("Account created successfully");
      router.push("/user");
    }
    if (res.data.Errors && res.data.Errors.length) {
      errorsAlert(res.data.Errors);
    }
  } catch (error) {
    let Errors = error.response.data.Errors;
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error,
    });
    console.log(Errors);
    errorsAlert(Errors);
  }
  //If Image is not there
};
//Login
export const login = ({ email, password }, router) => async (dispatch) => {
 
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email, password });
    await axios
      .post(`${domain}/users/login`, body, config)
      .then((res) => {
        if (res.data && res.data.token) {
          dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: res.data,
          });
          successAlert("Authorized Successfully!");
          if(res.data.type ==  "admin"){
            dispatch(fetchUserCount(localStorage.token))
            dispatch(fetchUsers(localStorage.token))
            dispatch(fetchLawns(localStorage.token))
            dispatch(fetchPhotographers(localStorage.token))

            router.push("/admin");
        }
          else if(res.data.type == "user")
          router.push("/user");
          
        }
      })
      .catch((err) => {
        console.log(err);
        const Errors = err.response.data.Errors;
        if (Errors) {
          errorsAlert(Errors);
        }

        dispatch({
          type: LOGIN_USER_FAIL,
        });
      });
  // }
};

export const SocialLogin = () => (dispatch) => {
  //console.log('social login');
  dispatch({
    type: SOCIAL_LOGIN_SUCCESS,
  });
  successAlert("Authorized Successfully");
  history.push("/user");
};

//Complete Profile

export const completeProfile = ({ email, phone, gender, city }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, phone, gender, city });

  await axios
    .post(`${domain}/users/completeProfile`, body, config)
    .then((res) => {
      if (res.data) {
        successAlert("Profile Completed Successfully");
        console.log(res.data.user);
        dispatch({
          type: PROFILE_COMPLETE,
          payload: res.data.user,
        });
        // router.push('/user')
      }
    })
    .catch((err) => {
      console.log(err);
      const Errors = err.response.data.Errors;
      if (Errors) {
        errorsAlert(Errors);
      }
    });
};

//Send Verification Code Via Email
export const SendCode = ({ email }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email });
  localStorage.setItem("email", email);
  //  console.log(body);
  try {
    const res = await axios.post(
      `${domain}/users/forgotPassword`,
      body,
      config
    );
    if (res) {
      dispatch({
        type: EMAIL_SENT,
      });
      successAlert(res.data);
    }
  } catch (err) {
    const Errors = err.response.data.Errors;
    console.log("inside catch and errors:", Errors);
    if (Errors) {
      errorsAlert(Errors);
    }
    dispatch({
      type: LOGIN_USER_FAIL,
    });
  }
};

//Check Verification code
export const CheckCode = ({ verificationCode }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    resetPasswordCode: verificationCode,
  });
  //console.log(body);
  await axios
    .post(`${domain}/users/resetCheck`, body, config)
    .then((user) => {
      //console.log(user.data);
      dispatch({
        type: VERIFICATION_CODE_STATUS,
        payload: user.data,
      });
      successAlert(user.data.msg);
      history.push("/newPassword");
    })
    .catch((err) => {
      const Errors = err.response.data.Errors;
      console.log(Errors);
      if (Errors) {
        errorsAlert(Errors);
      }
    });
};

//Reset Password
export const resetPassword = ({ email, password, confirm_password }) => async (
  dispatch
) => {
  console.log("validation passed!!");

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = {
    email,
    password,
    confirm_password,
  };

  //console.log(body);
  await axios
    .post(`${domain}/users/resetPassword`, body, config)
    .then((user) => {
      localStorage.removeItem("email");
      dispatch({
        type: PASSWORD_RESET,
      });
      successAlert(user.data);
      history.push("/");
    })
    .catch((err) => {
      const Errors = err.response.data.Errors;
      if (Errors) {
        errorsAlert(Errors);
      }
    });
};

//Image Upload
export const ImageUpload = ({ formData }) => async (dispatch) => {
  const body = { formData };
  const res = await axios.post(`${domain}/imageUpload`, body);
  if (res) {
  }
};

//Send Email Verification code via Email

export const SendEmailVerificationCode = ( email ) => async (dispatch) => {
   console.log( ' send email verification code clicked', email );
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email });
    console.log(body);
  try {
    const res = await axios.post(
      `${domain}/users/sendEmailVerificationCode`,
      body,
      config
    );
    if (res.data) {
      // console.log(res.data.msg);
      successAlert(res.data.msg)
      //dispatch(setAlert(res.data.msg, "success"));
    }
  } catch (err) {
    const errors = err.msg;
    console.log("on catch error");
    if (errors) {
      errorsAlert(errors);
    }
  }
};

//Email Verification
export const EmailVerification = ( email, code ) => async (dispatch) => {
  console.log('email verification')
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, code });
  //  console.log(body);
  try {
    const res = await axios.post(
      `${domain}/users/emailVerification`,
      body,
      config
    );
    if (res.data) {
      successAlert(res.data.msg)
      dispatch({
        type: EMAIL_VERIFIED,
        payload: res.data.user
      })
    //  setTimeout(() => history.push("/user/home"), 1000);
    }
 
  } catch (err) {
    const errors = err.response.data.Errors;
    console.log(errors);
    if (errors) {
      errorsAlert(errors)
    }
  }
};

//Logout
export const logout = (router) => (dispatch) => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });
  router.push("/");
};
