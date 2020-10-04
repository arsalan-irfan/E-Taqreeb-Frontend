import React, { useState } from "react";

export default function LogoUpload(props) {
  const [cnic, setCnic] = useState(null);
  const onChangeHandler = (e) => {
    setCnic(e.target.files[0]);
    props.form3Valid(e.target.files[0]);

  };

  return (
    <div>
      <div className="form-card text-left">
        <div className="row">
          <div className="col-7">
            <h3 className="mb-4">Image Upload:</h3>
          </div>
          <div className="col-5">
            <h2 className="steps">Step 3 - 4</h2>
          </div>
        </div>
        <div className="form-group">
          <label>Upload CNIC Photo:</label>
          <input
            type="file"
            className="form-control"
            name="image"
            onChange={(e) => onChangeHandler(e)}
            accept="image/*"
          />
          {!cnic ? (
            <span style={{ color: "red" }}>
              Cnic image is required for verification
            </span>
          ) : (
            <span></span>
          )}
        </div>
      </div>
      <button
        className="btn btn-primary next action-button float-right"
        value="Submit"
        onClick={() => {
          if (cnic) props.nextClicked(4, cnic);
        }}
        disabled={!cnic || props.isLoading ? true : false}
      >
        {props.isLoading?"Submitting....":"Submit"}
      </button>
      <button
        type="button"
        name="previous"
        className="btn btn-dark previous action-button-previous float-right mr-3"
        value="Previous"
        onClick={() => {
          props.previousClicked(2);
        }}
      >
        Previous
      </button>
    </div>
  );
}
