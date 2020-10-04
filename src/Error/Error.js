import React from "react";
import { Link } from "react-router-dom";
const Error = (props) => {
  return (
    <div className="container p-0">
      <div className="row no-gutters">
        <div className="col-sm-12 text-center">
          <div className="iq-error position-relative mt-5">
            <img
              src={require("../assets/images/error/01.png")}
              className="img-fluid iq-error-img"
              alt=""
            />
            <h1 className="text-in-box">404</h1>
            <h2 className="mb-0">{props.message}</h2>
            <p>{props.subMessage}</p>
            <Link className="btn btn-primary mt-3" to="/user">
              <i className="ri-home-4-line" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
