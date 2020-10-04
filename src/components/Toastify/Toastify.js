import React from "react";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export function Toastify() {
  return (
    <div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        style={{fontSize:14,fontWeight:"bold"}}
        pauseOnHover
      />
    </div>
  );
}
