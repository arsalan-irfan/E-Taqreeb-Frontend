import { BUSINESS_CREATE_FAIL, BUSINESS_CREATE_SUCCESS } from "./types";
import axios from "axios";
import { getLawn } from "../actions/lawn";
import { setAlert } from "./alert";

import { successAlert, errorsAlert } from "./alert";

let domain = "https://e-taqreeb-api.herokuapp.com";

export const createBusiness = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.token,
    },
  };
  console.log("businessData", data);
  let Errors = [];

  try {
    let {
      company,
      businessEmail,
      category,
      description,
      owner,
      address,
      phone,
      city,
      cnic,
    } = data;
    const res1 = await axios.post(
      `${domain}/business`,
      {
        company,
        businessEmail,
        category,
        description,
        owner,
        address,
        phone,
        city,
      },
      config
    );

    if (res1.data.bid) {
      var formData = new FormData();
      formData.append("image", cnic);
      let res2 = await axios.post(
        `${domain}/business/cnic/${category}/${res1.data.bid}`,formData,config
      );
      if (res2.data.user)
        dispatch({
          type: BUSINESS_CREATE_SUCCESS,
          payload: res2.data,
        });

      successAlert("Business registered successfully!");
      return true;
    }
    else{
      Errors.push({error:"Error business registration!"})
    }
  } catch (error) {
    const errors = error.response.data.Errors;
    if (errors) {
      console.log(errors);
      errors.forEach((errorObj) => {
        Errors.push({ error: errorObj.msg });
      });
      errorsAlert(Errors);
    } else {
      Errors.push({ error: "Business registration failed" });
    }
    dispatch({
      type: BUSINESS_CREATE_FAIL,
    });
    return false;
  }
};
