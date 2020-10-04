import React from "react";

const Offline = (props) => {
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
            <h1 className="text-in-box">500</h1>
            <h2 className="mb-0">Oops! No Internet Connection.</h2>
            <p>If you are connected to internet please reload the page.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offline;
