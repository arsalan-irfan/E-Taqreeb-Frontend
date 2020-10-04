import React from "react";
import { Link } from "react-router-dom";

export default function Requested(props) {
  return (
    <div className="form-card">
      <br />
      <br />
      <h2 className="text-Warning text-center">
        <strong>Order Requested Successfully</strong>
      </h2>
      <br />

      <br />
      <br />
      <div className="row justify-content-center">
        <div className="col-7 text-center">
          <h5 className="purple-text text-center">
          Dear User, Your booking request has been recieved  <br />
           you will be notified when request will be approved by business owner 
          </h5>
        </div>
       </div> 
        <div className="row justify-content-center">
        <div className="col-7 text-center">
        <Link
        to="/"
        className="btn btn-success purple-text text-center"
        style={{marginTop: '5%'}}
        >
            Home
        </Link>
        </div>
        </div>
      
    </div>
  );
}
