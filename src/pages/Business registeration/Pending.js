import React from "react";

export default function Submit(props) {
  return (
    <div className="form-card">
      <br />
      <br />
      <h2 className="text-Warning text-center">
        <strong>Pending !</strong>
      </h2>
      <br />

      <br />
      <br />
      <div className="row justify-content-center">
        <div className="col-7 text-center">
          <h5 className="purple-text text-center">
            You have already requested to register business, <br />
            Your application is being processed
          </h5>
        </div>
      </div>
    </div>
  );
}
