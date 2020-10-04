import axios from "axios";
import {
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
  FETCH_ALL_PHOTOGRAPHER_FAIL,
  FETCH_ALL_PHOTOGRAPHER_SUCCESS,
  PHOTOGRAPHER_IMAGE_DELETE_FAILED,
  PHOTOGRAPHER_IMAGE_DELETE_SUCCESS,
  PUBLISH_PHOTOGRAPHER_FAILED,
  PUBLISH_PHOTOGRAPHER_SUCCESS,
  IS_OFFLINE,
  PUSH_NEW_PHOTOGRAPHER,
  POP_NEW_PHOTOGRAPHER
} from "./types";
import { errorsAlert, setAlert, successAlert,notifyToast } from "./alert";

import history from "../history";
import { loadUser } from "./auth";
let domain = "https://e-taqreeb-api.herokuapp.com";

export const fetchAllPhotographers = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    let res = await axios.get(`${domain}/photographer`, config);
    dispatch({
      type: FETCH_ALL_PHOTOGRAPHER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    if (err.response) {
      errorsAlert([{ error: "Error while fetching photographer" }]);
      dispatch({
        type: FETCH_ALL_PHOTOGRAPHER_FAIL,
        payload: err.message,
      });
    } else {
      dispatch({
        type: IS_OFFLINE,
      });
      errorsAlert([{ error: "Error while fetching photographer" }]);
    }
  }
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
      `${domain}/photographer/upload-images`,
      formData,
      config
    );
    if (res.data) {
      dispatch({
        type: PHOTOGRAPHER_IMAGES_UPLOAD_SUCCESS,
        payload: res.data,
      });
      successAlert("Images uploaded sucessfully");
    }
  } catch (error) {
    errorsAlert([{ error: "Images uploading failed" }]);
    dispatch({
      type: PHOTOGRAPHER_IMAGES_UPLOAD_FAILED,
    });
  }
};

export const addPackage = ({
  title,
  videoLength,
  noOfImages,
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
      `${domain}/photographer/package`,
      { title, videoLength, noOfImages, description, price, advance },
      config
    )
    .then((res) => {
      if (res.data) {
        dispatch({
          type: PHOTOGRAPHER_PACKAGE_ADD_SUCCESS,
          payload: res.data,
        });
        successAlert("Package Created Successfully!");
      } else {
        dispatch({
          type: PHOTOGRAPHER_PACKAGE_ADD_FAIL,
          payload: "Creating Package Failed",
        });
        errorsAlert([{ error: "Creating Package Failed" }]);
      }
    })
    .catch((err) => {
      errorsAlert([{ error: "Creating Package Failed" }]);
      console.log(err.response);
      dispatch({
        type: PHOTOGRAPHER_PACKAGE_ADD_FAIL,
        payload: err.message,
      });
    });
};
export const updatePackage = (packageObj) => async (dispatch) => {
  const {
    title,
    price,
    noOfImages,
    videoLength,
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
      `${domain}/photographer/package/${id}`,
      { title, price, noOfImages, videoLength, date, advance, description },
      config
    )
    .then((res) => {
      if (res) {
        console.log(res.data);
        dispatch({
          type: PHOTOGRAPHER_PACKAGE_UPDATE_SUCCESS,
          payload: res.data,
        });

        successAlert("Package Updated Successfully!");
      } else {
        errorsAlert([{ error: "Updating Package Failed" }]);
        dispatch({
          type: PHOTOGRAPHER_PACKAGE_UPDATE_FAIL,
          payload: "Package updation failed",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      errorsAlert([{ error: "Updating Package Failed" }]);
      dispatch({
        type: PHOTOGRAPHER_PACKAGE_UPDATE_FAIL,
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
    .delete(`${domain}/photographer/package/${pid}`, config)
    .then((res) => {
      if (res.data) {
        successAlert("Package deleted Successfully!");

        dispatch({
          type: PHOTOGRAPHER_PACKAGE_DELETE_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: PHOTOGRAPHER_PACKAGE_DELETE_FAIL,
          payload: "Package unsuccessfully deleted",
        });
        errorsAlert([{ error: "Package Deletion Failed" }]);
      }
    })
    .catch((err) => {
      dispatch({
        type: PHOTOGRAPHER_PACKAGE_DELETE_FAIL,
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
    .delete(`${domain}/photographer/image/${id}`, config)
    .then((res) => {
      if (res.data) {
        successAlert("Image Deleted Successfully!");

        dispatch({
          type: PHOTOGRAPHER_IMAGE_DELETE_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: PHOTOGRAPHER_IMAGE_DELETE_FAILED,
        });
        errorsAlert([{ error: "Image Deletion Failed" }]);
      }
    })
    .catch((err) => {
      dispatch({
        type: PHOTOGRAPHER_IMAGE_DELETE_FAILED,
      });
      errorsAlert([{ error: "Image Deletion Failed" }]);
    });
};

export const publishPhotographer = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      "x-auth-token": localStorage.token,
    },
  };

  await axios
    .post(`${domain}/photographer/publish`, {}, config)
    .then((res) => {
      if (res.data.photographer) {
        dispatch({
          type: PUBLISH_PHOTOGRAPHER_SUCCESS,
          payload: res.data,
        });
        successAlert(res.data.msg);
      } else {
        dispatch({
          type: PUBLISH_PHOTOGRAPHER_FAILED,
        });
        errorsAlert([{ error: "Error While Publishing" }]);
      }
    })
    .catch((err) => {
      errorsAlert(err.response.data.Errors);
      dispatch({
        type: PUBLISH_PHOTOGRAPHER_FAILED,
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
    .post("/photographer/addYoutubeUrl", body, config)
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

export const updatePhotographerAccount = (data) => async (dispatch) => {
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
      `${domain}/photographer/update`,
      { owner, company, businessEmail, phone, address, description, city },
      config
    );
    dispatch({
      type: PHOTOGRAPHER_ACCOUNT_UPDATE_SUCCESS,
      payload: res.data,
    });
    successAlert("photographer info updated successfully!");
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
      Errors.push({ error: "Updating photographer Info failed failed" });
    }
    dispatch({
      type: PHOTOGRAPHER_ACCOUNT_UPDATE_FAIL,
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
      let res = await axios.post(
        `${domain}/photographer/logo`,
        formData,
        config
      );
      dispatch({
        type: PHOTOGRAPHER_LOGO_UPDATED_SUCCESS,
        payload: res.data,
      });
      successAlert("Logo updated successfully!");
    } else {
      dispatch({
        type: PHOTOGRAPHER_LOGO_UPDATED_FAIL,
      });
      errorsAlert([{ error: "Please Insert and image" }]);
    }
  } catch (error) {
    let Errors = error.response.data.Errors;
    console.log("Errors", Errors);
    errorsAlert([{ error: "Image Uploading Failed" }]);
    dispatch({
      type: PHOTOGRAPHER_LOGO_UPDATED_FAIL,
      payload: error.message,
    });
  }
};
export const newPhotographerPublished=(photographer,msg)=>dispatch=>{
  dispatch({
    type:PUSH_NEW_PHOTOGRAPHER,
    payload:photographer
  })
  notifyToast(msg)
}
export const photographerUnPublished=(photographer)=>dispatch=>{
  
  dispatch({
    type:POP_NEW_PHOTOGRAPHER,
    payload:photographer
  })

}


//request photographer booking
export const requestPhotographer = async (userId, photographerId, packageId, bookingDate)=> {
  //console.log('request photographer action!',localStorage.token)

  const config = {
    headers: {
      'Content-Type': "application/json",
      'x-auth-token': localStorage.token
    },
  };
  const body = {
    userId,
    photographerId,
    packageId,
    bookingDate
  }
  console.log('body is:', body)
  console.log('config headers are', config)
  try {
    let res = await axios.post(`${domain}/photographer/requestPhotographer`, body , config);
    if(res){
      successAlert(res.data.msg);
      history.push('/user/orderrequested');
    }
  } catch (err) {
    console.log('errors are:',)
    errorsAlert([{ error: "request photographer failed" }]);
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
    const res = await axios.post(`${domain}/photographer/acceptOrder`, body, config )
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
    const res = await axios.delete(`${domain}/photographer/rejectOrder/${id}` , config )
    if(res){
      dispatch(loadUser())
      successAlert(res.data.msg)

    }
  } catch (error) {
    console.log('errors are:',)
    errorsAlert([{ error: "rejecting request failed" }]);
  }
}

