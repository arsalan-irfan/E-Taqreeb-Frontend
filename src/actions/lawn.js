import axios from "axios";
import {
  LAWN_IMAGES_UPLOAD_SUCCESS,
  LAWN_IMAGES_UPLOAD_FAILED,
  FETCH_LAWN_SUCCESS,
  FETCH_LAWN_FAIL,
  LAWN_PACKAGE_ADD_FAIL,
  LAWN_PACKAGE_ADD_SUCCESS,
  LAWN_PACKAGE_DELETE_SUCCESS,
  LAWN_PACKAGE_DELETE_FAIL,
  LAWN_PACKAGE_UPDATE_SUCCESS,
  LAWN_PACKAGE_UPDATE_FAIL,
  LAWN_ACCOUNT_UPDATE_FAIL,
  LAWN_ACCOUNT_UPDATE_SUCCESS,
  LAWN_LOGO_UPDATED_SUCCESS,
  LAWN_LOGO_UPDATED_FAIL,
  FETCH_ALL_LAWN_FAIL,
  FETCH_ALL_LAWN_SUCCESS,
  SELECTED_LAWN_FAIL,
  SELECTED_LAWN_SUCCESS,
  LAWN_IMAGE_DELETE_FAILED,
  LAWN_IMAGE_DELETE_SUCCESS,
  PUBLISH_LAWN_FAILED,
  PUBLISH_LAWN_SUCCESS,
  PUSH_NEW_LAWN,
  POP_NEW_LAWN,
  IS_OFFLINE,
} from "./types";
import { errorsAlert, setAlert, successAlert,notifyToast } from "./alert";
import history from "../history";
import { loadUser } from "./auth";
//import { loadUser } from "./auth";
let domain = "https://e-taqreeb-api.herokuapp.com";

export const fetchAllLawns = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    let res = await axios.get(`${domain}/lawn`, config);
    dispatch({
      type: FETCH_ALL_LAWN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    if(err.response){
      errorsAlert([{error:"Error while fetching lawns"}]);
      dispatch({
        type: FETCH_ALL_LAWN_FAIL,
        payload: err.message,
      });  
    }
    else{
      dispatch({
        type: IS_OFFLINE,
      });
      errorsAlert([{error:"Error while fetching lawns"}]);
    }
    
  }
};

//get Approved Lawn
export const getLawn = () => async (dispatch) => {
  const config = {
    headers: {
      "x-auth-token": localStorage.token,
    },
  };
  await axios
    .get("/lawn/getLawn", config)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: FETCH_LAWN_SUCCESS,
        payload: res.data.lawn,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: FETCH_LAWN_FAIL,
        payload: err.message,
      });
    });
};

export const uploadAllImages = (imageCollection) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "x-auth-token": localStorage.token,
    },
  };

  var formData = new FormData();
  imageCollection.map((item, n) => {
    console.log(`item${n}`, item);
    formData.append("image", item);
  });
  try {
    const res = await axios.post(
      `${domain}/lawn/upload-images`,
      formData,
      config
    );
    if (res.data) {
      dispatch({
        type: LAWN_IMAGES_UPLOAD_SUCCESS,
        payload: res.data,
      });
      successAlert("Images uploaded sucessfully");
    }
  } catch (error) {
    errorsAlert([{ error: "Images uploading failed" }]);
    dispatch({
      type: LAWN_IMAGES_UPLOAD_FAILED,
    });
  }
};

export const addPackage = ({
  title,
  capacity,
  timeFrom,
  timeTo,
  description,
  price,
  advance,
}) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      "x-auth-token": localStorage.token,
    },
  };

  await axios
    .post(
      `${domain}/lawn/package`,
      { title, capacity, timeFrom, timeTo, description, price, advance },
      config
    )
    .then((res) => {
      if (res.data) {
        dispatch({
          type: LAWN_PACKAGE_ADD_SUCCESS,
          payload: res.data,
        });
        successAlert("Package Created Successfully!");
      } else {
        dispatch({
          type: LAWN_PACKAGE_ADD_FAIL,
          payload: "Creating Package Failed",
        });
        errorsAlert([{ error: "Creating Package Failed" }]);
      }
    })
    .catch((err) => {
      errorsAlert([{ error: "Creating Package Failed" }]);
      console.log(err.response);
      dispatch({
        type: LAWN_PACKAGE_ADD_FAIL,
        payload: err.message,
      });
    });
};
export const updatePackage = (packageObj) => async (dispatch) => {
  const {
    title,
    capacity,
    price,
    timeTo,
    timeFrom,
    description,
    date,
    id,
    advance,
  } = packageObj;
  const config = {
    headers: {
      "Content-type": "application/json",
      "x-auth-token": localStorage.token,
    },
  };

  await axios
    .put(
      `${domain}/lawn/package/${id}`,
      { title, capacity, price, timeTo, timeFrom, date, advance, description },
      config
    )
    .then((res) => {
      if (res) {
        console.log(res.data);
        dispatch({
          type: LAWN_PACKAGE_UPDATE_SUCCESS,
          payload: res.data,
        });

        successAlert("Package Updated Successfully!");
      } else {
        errorsAlert([{ error: "Updating Package Failed" }]);
        dispatch({
          type: LAWN_PACKAGE_UPDATE_FAIL,
          payload: "Package updation failed",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      errorsAlert([{ error: "Updating Package Failed" }]);
      dispatch({
        type: LAWN_PACKAGE_UPDATE_FAIL,
      });
    });
};
export const deletePackage = (pid) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      "x-auth-token": localStorage.token,
    },
  };
  await axios
    .delete(`${domain}/lawn/package/${pid}`, config)
    .then((res) => {
      if (res.data) {
        successAlert("Package deleted Successfully!");

        dispatch({
          type: LAWN_PACKAGE_DELETE_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: LAWN_PACKAGE_DELETE_FAIL,
          payload: "Package unsuccessfully deleted",
        });
        errorsAlert([{ error: "Package Deletion Failed" }]);
      }
    })
    .catch((err) => {
      dispatch({
        type: LAWN_PACKAGE_DELETE_FAIL,
        payload: err.message,
      });
      errorsAlert([{ error: "Package Deletion Failed" }]);
    });
};

export const deleteImage = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      "x-auth-token": localStorage.token,
    },
  };
  await axios
    .delete(`${domain}/lawn/image/${id}`, config)
    .then((res) => {
      if (res.data) {
        successAlert("Image Deleted Successfully!");

        dispatch({
          type: LAWN_IMAGE_DELETE_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: LAWN_IMAGE_DELETE_FAILED,
        });
        errorsAlert([{ error: "Image Deletion Failed" }]);
      }
    })
    .catch((err) => {
      dispatch({
        type: LAWN_IMAGE_DELETE_FAILED,
      });
      errorsAlert([{ error: "Image Deletion Failed" }]);
    });
};

export const publishLawn = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      "x-auth-token": localStorage.token,
    },
  };

  await axios
    .post(`${domain}/lawn/publish`, {}, config)
    .then((res) => {
      if (res.data.lawn) {
        dispatch({
          type: PUBLISH_LAWN_SUCCESS,
          payload: res.data,
        });
        successAlert(res.data.msg);
      } else {
        dispatch({
          type: PUBLISH_LAWN_FAILED,
        });
        errorsAlert([{ error: "Error While Publishing" }]);
      }
    })
    .catch((err) => {
      errorsAlert(err.response.data.Errors);
      dispatch({
        type: PUBLISH_LAWN_FAILED,
      });
    });
};

export const addYoutubeUrl = (url) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      "x-auth-token": localStorage.token,
    },
  };
  const body = JSON.stringify({
    url: url,
  });
  await axios
    .post("/lawn/addYoutubeUrl", body, config)
    .then((res) => {
      dispatch(setAlert(res.data.msg, "success"));
    })
    .catch((err) => {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
    });
};

export const updateLawnAccount = (data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.token,
      },
    };
    let {
      owner,
      company,
      businessEmail,
      phone,
      address,
      description,
      city,
    } = data;
    let res = await axios.post(
      `${domain}/lawn/update`,
      { owner, company, businessEmail, phone, address, description, city },
      config
    );
    dispatch({
      type: LAWN_ACCOUNT_UPDATE_SUCCESS,
      payload: res.data,
    });
    successAlert("Lawn info updated successfully!");
  } catch (error) {
    let Errors = [];
    const errors = error.response.data.Errors;
    if (errors) {
      console.log(errors);
      errors.forEach((errorObj) => {
        Errors.push({ error: errorObj.msg });
      });
      errorsAlert(Errors);
    } else {
      Errors.push({ error: "Updating Lawn Info failed failed" });
    }
    dispatch({
      type: LAWN_ACCOUNT_UPDATE_FAIL,
      payload: error.message,
    });
  }
};
export const updateLogo = (image) => async (dispatch) => {
  try {
    var formData = new FormData();
    formData.append("image", image);
    const config = {
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.token,
      },
    };
    if (image) {
      let res = await axios.post(`${domain}/lawn/logo`, formData, config);
      dispatch({
        type: LAWN_LOGO_UPDATED_SUCCESS,
        payload: res.data,
      });
      successAlert("Logo updated successfully!");
    } else {
      dispatch({
        type: LAWN_LOGO_UPDATED_FAIL,
      });
      errorsAlert([{ error: "Please Insert and image" }]);
    }
  } catch (error) {
    let Errors = error.response.data.Errors;
    console.log("Errors", Errors);
    errorsAlert([{ error: "Image Uploading Failed" }]);
    dispatch({
      type: LAWN_LOGO_UPDATED_FAIL,
      payload: error.message,
    });
  }
};

export const fetchSelectedLawn = (lid) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    let res = await axios.get(`/lawn/${lid}`, config);
    dispatch({
      type: SELECTED_LAWN_SUCCESS,
      payload: res.data.lawn,
    });
  } catch (err) {
    dispatch({
      type: SELECTED_LAWN_FAIL,
      payload: err.message,
    });
  }
};

//request lawn booking
export const requestLawn = async (userId, lawnId, packageId, bookingDate)=> {
  //console.log('request lawn action!',localStorage.token)

  const config = {
    headers: {
      'Content-Type': "application/json",
      'x-auth-token': localStorage.token
    },
  };
  const body = {
    userId,
    lawnId,
    packageId,
    bookingDate
  }
  console.log('body is:', body)
  console.log('config headers are', config)
  try {
    let res = await axios.post(`${domain}/lawn/requestLawn`, body , config);
    if(res){
      successAlert(res.data.msg);
      history.push('/user/orderrequested');
    }
  } catch (err) {
   // console.log('errors are:',err.response.data)
    errorsAlert([{ error: err.response.data.error }]);
  }
}


//accept order by id 
export const acceptOrder =  ({orderId})  => async dispatch => {
  console.log('accept order dispatched!')
  const config = {
    headers:{
      'Content-Type': "application/json",
      'x-auth-token': localStorage.token
    }
  }
  const body = JSON.stringify({
    id: orderId
  })

  try {
    const res = await axios.post(`${domain}/lawn/acceptOrder`, body, config )
    if(res){
    //  console.log('response from accepting order')
      dispatch(loadUser())
      successAlert(res.data.msg)
  
    }
  } catch (error) {
    console.log('errors are:',error.response.data)
    errorsAlert([{ error: "accepting request failed" }]);
  }
}


//reject order by id 
export const rejectOrder = (id)=> async dispatch => {
  const config = {
    headers:{
      'Content-Type': "application/json",
      'x-auth-token': localStorage.token
    }
  }
  try {
    const res = await axios.delete(`${domain}/lawn/rejectOrder/${id}` , config )
    if(res){
      dispatch(loadUser())
      successAlert(res.data.msg)

    }
  } catch (error) {
    console.log('errors are:',)
    errorsAlert([{ error: "rejecting request failed" }]);
  }
}
export const newLawnPublished=(lawn,msg)=>dispatch=>{
  dispatch({
    type:PUSH_NEW_LAWN,
    payload:lawn
  })
  notifyToast(msg)
}
export const lawnUnPublished=(lawn)=>dispatch=>{
  
  dispatch({
    type:POP_NEW_LAWN,
    payload:lawn
  })

}