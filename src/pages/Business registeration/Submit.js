import React from "react";

export default function Submit(props) {
  return (
    <div className="form-card">
      <div className="row">
        <div className="col-7">
          <h3 className="mb-4 text-left">Finish:</h3>
        </div>
        <div className="col-5">
          <h2 className="steps">Step 4 - 4</h2>
        </div>
      </div>
      <br />
      <br />
      <h2 className="text-success text-center">
        <strong>SUCCESS !</strong>
      </h2>
      <br />

      <br />
      <br />
      <div className="row justify-content-center">
        <div className="col-7 text-center">
          <h5 className="purple-text text-center">
            Your Form has been submitted Successfully, <br />
            Your application is being processed
          </h5>
        </div>
      </div>
    </div>
  );
}
