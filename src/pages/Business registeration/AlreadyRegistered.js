import React from "react";

export default function Submit(props) {
  return (
    <div className="form-card">
      <br />
      <br />
      <h2 className="text-Warning text-center">
        <strong>Business Already Registered !</strong>
      </h2>
      <br />

      <br />
      <br />
      <div className="row justify-content-center">
        <div className="col-7 text-center">
          <h5 className="purple-text text-center">
            You can't register more than one business, <br />
            In order to register new business you need to create a new account
          </h5>
        </div>
      </div>
    </div>
  );
}
