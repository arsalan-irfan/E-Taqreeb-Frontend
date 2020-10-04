import {
  SET_ALERT,
  REMOVE_ALERT,
  NEW_NOTIFICATION,
  MESSAGE_ADD,
} from "./types";
import uuid from "uuid";
import { toast } from "react-toastify";
import NotifyTune from '../assets/when.mp3'

const audio = new Audio(NotifyTune)

export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  const id = uuid.v4();
  console.log("set alert called");
  console.log(msg, " ", alertType, id);
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });
  setTimeout(
    () =>
      dispatch({
        type: REMOVE_ALERT,
        payload: id,
      }),
    timeout
  );
};

export const notify = ({ data }) => (dispatch) => {
  console.log("notify called");
  console.log(data);
  dispatch({
    type: NEW_NOTIFICATION,
    payload: data,
  });
};

export const successAlert = (msg) => {
  toast.success(msg);
};

export const errorsAlert = (errors) => {
  errors.forEach((err) => {
    toast.error(err.error);
  });
};
export const notifyToast=(msg)=>{
  toast.dark(
    msg,
    {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }
  );
  audio.play()
}

export const dum = () => {
  console.log("i am called");
};
