import axios from "axios";
import {
  FETCH_LAWN_FAIL,
  FETCH_LAWN_SUCCESS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAIL,
  FETCH_SELECTED_LAWN_SUCCESS,

  FETCH_SELECTED_PHOTOGRAPHER_SUCCESS,
  FETCH_SELECTED_LAWN_FAIL,
  USER_COUNT_SUCCESS,
  LAWN_BLOCK_STATUS,
  OPEN_DIALOG,
  CLOSE_DIALOG,
  BUSINESS_FETCH_FAIL, 
  BUSINESS_FETCH_SUCCESS,
  SELECTED_BUSINESS_FETCH_SUCCESS,
  FETCH_APPROVED_LAWN_FAIL,
  FETCH_APPROVED_LAWN_SUCCESS,
  FETCH_APPROVED_PHOTOGRAPHER_FAIL,
  FETCH_APPROVED_PHOTOGRAPHER_SUCCESS,
  FETCH_UNAPPROVED_LAWN_SUCCESS,
  FETCH_UNAPPROVED_PHOTOGRAPHER_SUCCESS,
  APPROVE_LAWN_FAIL,
  APPROVE_LAWN_SUCCESS,

  APPROVE_PHOTOGRAPHER_SUCCESS
} from "./types";
import { setAlert, successAlert, errorsAlert } from "./alert";
import history from "../history";

const domain = "https://e-taqreeb-api.herokuapp.com";


export const fetchLawns = (token) => async dispatch => {
  const config = {
    headers:{
      'x-auth-token': token
    }
  }
  await axios
    .get(`${domain}/admin/getLawn/all`, config)
    .then(res => {
     // console.log(res.data);
      if (res) {
        console.log(res.data);
        dispatch({
          type: FETCH_APPROVED_LAWN_SUCCESS,
          payload: res.data
        });
      }
    })
    .catch(err => {
    //  console.log(err.message);
      dispatch({
        type: FETCH_APPROVED_LAWN_FAIL,
        payload: err.message
      });
    });
};



//fetch photographers
export const fetchPhotographers = (token) => async dispatch => {
  const config = {
    headers:{
      'x-auth-token': token
    }
  }
  await axios
    .get(`${domain}/admin/getPhotographer/all`, config)
    .then(res => {
     // console.log(res.data);
      if (res) {
        console.log(res.data);
        dispatch({
          type: FETCH_APPROVED_PHOTOGRAPHER_SUCCESS,
          payload: res.data
        });
      }
    })
    .catch(err => {
    //  console.log(err.message);
      dispatch({
        type: FETCH_APPROVED_PHOTOGRAPHER_FAIL,
        payload: err.message
      });
    });
};



export const fetchUsers = (token) => async dispatch => {
  const config = {
    headers:{
      'x-auth-token': token
    }
  }
  await axios
    .get(`${domain}/admin/getUsers`, config)
    .then(res => {
    //  console.log(res.data);
      if (res) {
        console.log("In if ", res);
        dispatch({
          type: FETCH_USERS_SUCCESS,
          payload: res.data
        });
      }
    })
    .catch(err => {
    //  console.log(err.message);
      dispatch({
        type: FETCH_USERS_FAIL,
        payload: err.message
      });
    });
};



//Fetch all pending lawns
export const fetchPendingLawns=()=>async dispatch=>{
  console.log('fetch pending lawns called')
  const config = {
    headers:{
      'x-auth-token': localStorage.getItem('token')
    }
  }
  await axios.get(`${domain}/admin/lawn/pendingLawn/all`, config).then(
    res=>{
    //  console.log('then of fetching of all unapproved lawns:', res.data)
      return dispatch({
        type:FETCH_UNAPPROVED_LAWN_SUCCESS,
        payload: res.data
      })
    }
  ).catch(error=>{
    console.log(error)
 
  })
}

//Fetch all pending photographers
export const fetchPendingPhotographers=()=>async dispatch=>{
  console.log('fetch pending photographers called')
  const config = {
    headers:{
      'x-auth-token': localStorage.getItem('token')
    }
  }
  await axios.get(`${domain}/admin/photographer/pendingPhotographer/all`, config).then(
    res=>{
    //  console.log('then of fetching of all unapproved photographers:', res.data)
      return dispatch({
        type:FETCH_UNAPPROVED_PHOTOGRAPHER_SUCCESS,
        payload: res.data
      })
    }
  ).catch(error=>{
    console.log(error)
 
  })
}




//get User Counts for months
export const fetchUserCount = (token) => async dispatch => {
  console.log('fetchUsercount called');
 const config = {
  headers:{
    'x-auth-token': token
  }
}
  await axios.get(`${domain}/admin/getUserCount`, config).then(res=>{
   // console.log('fetchUsercount called',res.data);
    dispatch({
      type: USER_COUNT_SUCCESS,
      payload: res.data
    })
  })
  .catch(err=>{
    console.log('error', err.response.data);
  })
}


//Fetch Unapproved Selected lawn by id
export const fetchSelectedLawn = id => async dispatch => {
  const config = {
    headers:{
      'x-auth-token': localStorage.getItem('token')
    }
  }
  console.log('fetch selected lawn:', id)
  await axios
    .get(`${domain}/admin/pendingLawn/${id}`, config)
    .then(res => {
      if(res){
        console.log("Lawn Profile"+res.data.lawn)
        
     dispatch({
          type: FETCH_SELECTED_LAWN_SUCCESS,
          payload: res.data
        });
      }
    })
    .catch(error => {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach(error => console.log(error));
      }
    });
};



//Fetch Unapproved Selected photographer by id
export const fetchSelectedPhotographer = id => async dispatch => {
  const config = {
    headers:{
      'x-auth-token': localStorage.getItem('token')
    }
  }
  console.log('fetch selected photographer:', id)
  await axios
    .get(`${domain}/admin/pendingPhotographer/${id}`, config)
    .then(res => {
      if(res){
        console.log("photographer Profile"+res.data.photographer)
        
     dispatch({
          type: FETCH_SELECTED_PHOTOGRAPHER_SUCCESS,
          payload: res.data
        });
      }
    })
    .catch(error => {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach(error => console.log(error));
      }
    });
};





//Approve Lawn
export const approveLawn = (bid) => async dispatch => {

  const config = {
    headers: {
      "x-auth-token": localStorage.getItem('token')
    }
  };
  await axios
    .get(`${domain}/admin/lawn/approve/${bid}`, config)
    .then(res => {
     // console.log(res.data);
      if (res) {
     //   console.log("Approval Status response ", res);
       successAlert('Lawn has been approved successfully')
        
        dispatch({
          type: APPROVE_LAWN_SUCCESS,
          payload: res.data
        });
        history.push("/");
         
        // var  alert_msg = '';
        // console.log(typeof res.data.msg);
        // console.log(typeof res.data.lawn.company);
        // alert_msg=alert_msg.concat(res.data.msg,' for ',res.data.lawn.company)
        // console.log(alert_msg)
        // dispatch(setAlert(alert_msg,'success'));
        // history.push('/');
      }
      else{
        dispatch({
          type: APPROVE_LAWN_FAIL
        })
      }

    })
    .catch(err => {
      console.log("Approval Status error ", err.msg);
      dispatch({
        type: FETCH_SELECTED_LAWN_FAIL,
        payload: err.message
      });
    });
};



//Approve Photographer
export const approvePhotographer = (bid) => async dispatch => {

  const config = {
    headers: {
      "x-auth-token": localStorage.getItem('token')
    }
  };
  await axios
    .get(`${domain}/admin/photographer/approve/${bid}`, config)
    .then(res => {
     // console.log(res.data);
      if (res) {
     //   console.log("Approval Status response ", res);
       successAlert('Photographer has been approved successfully')
        
        dispatch({
          type: APPROVE_PHOTOGRAPHER_SUCCESS,
          payload: res.data
        });
        history.push("/");
         
        // var  alert_msg = '';
        // console.log(typeof res.data.msg);
        // console.log(typeof res.data.lawn.company);
        // alert_msg=alert_msg.concat(res.data.msg,' for ',res.data.lawn.company)
        // console.log(alert_msg)
        // dispatch(setAlert(alert_msg,'success'));
        // history.push('/');
      }
      else{
        dispatch({
          type: APPROVE_LAWN_FAIL
        })
      }

    })
    .catch(err => {
      console.log("Approval Status error ", err.msg);
      dispatch({
        type: FETCH_SELECTED_LAWN_FAIL,
        payload: err.message
      });
    });
};




//Reject Lawn by id
export const rejectLawn = (bid) => async dispatch => {

  const config = {
    headers: {
      "x-auth-token": localStorage.getItem('token')
    }
  };
  await axios
    .delete(`${domain}/admin/lawn/reject/${bid}`, config)
    .then(res => {
     // console.log(res.data);
      if (res) {
     //   console.log("Approval Status response ", res);
       successAlert('Lawn has been rejected successfully')
        
        // dispatch({
        //   type: REJECT_LAWN_SUCCESS,
        //   payload: res.data
        // });
        history.push("/");
      }
      

    })
    .catch(err => {
      console.log("Approval Status error ", err.msg);
      errorsAlert('cannott reject request right now')
      // dispatch({
      //   type: FETCH_SELECTED_LAWN_FAIL,
      //   payload: err.message
      // });
    });
};

//Reject Photographer by id

export const rejectPhotographer = (bid) => async dispatch => {

  const config = {
    headers: {
      "x-auth-token": localStorage.getItem('token')
    }
  };
  await axios
    .delete(`${domain}/admin/photographer/reject/${bid}`, config)
    .then(res => {
     // console.log(res.data);
      if (res) {
     //   console.log("Approval Status response ", res);
       successAlert('photographer has been rejected successfully')
        
        // dispatch({
        //   type: REJECT_photographer_SUCCESS,
        //   payload: res.data
        // });
        history.push("/");
      }
      

    })
    .catch(err => {
      console.log("Approval Status error ", err.msg);
      errorsAlert('cannott reject request right now')
      // dispatch({
      //   type: FETCH_SELECTED_photographer_FAIL,
      //   payload: err.message
      // });
    });
};






//Block or Unblock Lawn
export const changeBlockStatusLawn = (lawn_id, currentBlockStatus) => async dispatch => {
  console.log('lawn id:', lawn_id)
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem('token')
    }
  };
  const body = {
    currentBlockStatus,
    lawn_id
  }
  await axios.post(`${domain}/admin/lawn/changeBlockStatus`,body, config)
  .then(res =>{
    if(res){
    //  console.log('Block Status has been changed', res.data);
    successAlert('block status of lawn has been changed successfully')  
    dispatch(fetchLawns(localStorage.getItem('token')));
    history.push('/admin/lawn')  
    }

  })
  .catch(err => { 
    console.log(err)

  }

  )
}

//Block or Unblock Photographer

export const changeBlockStatusPhotographer = (photographer_id, currentBlockStatus) => async dispatch => {
  console.log('photographer id:', photographer_id)
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem('token')
    }
  };
  const body = {
    currentBlockStatus,
    photographer_id
  }
  await axios.post(`${domain}/admin/photographer/changeBlockStatus`,body, config)
  .then(res =>{
    if(res){
    //  console.log('Block Status has been changed', res.data);
    successAlert('block status of photographer has been changed successfully')  
    dispatch(fetchPhotographers());
    history.push('/admin/photographer') 
    }

  })
  .catch(err => { 
    console.log(err.response.data)

  }

  )
}



//Block or Unblock User
export const changeBlockStatusUser = (user_id, currentBlockStatus) => async dispatch => {
  console.log('user id:', user_id)
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem('token')
    }
  };
  const body = {
    currentBlockStatus,
    user_id
  }
  await axios.post(`${domain}/admin/user/changeBlockStatus`,body, config)
  .then(res =>{
    if(res){
    //  console.log('Block Status has been changed', res.data);
    successAlert('block status of user has been changed successfully')  
    dispatch(fetchUsers());
     
    }

  })
  .catch(err => { 
    console.log(err)

  }

  )
}







//open dialog

export const openDialog = () => dispatch => {
  console.log('values are')
  var count=0;

  console.log('here', count)
  dispatch({
    type: OPEN_DIALOG
  })
}


//close dialog 
export const closeDialog = () => dispatch => {
  dispatch({
    type: CLOSE_DIALOG
  })
}