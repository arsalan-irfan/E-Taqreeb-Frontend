import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";

export default function OwnerInfo(props) {
  const { register, handleSubmit, watch, errors } = useForm();

  const [phoneInput, setPhoneInput] = useState({
    number: "",
    error: "",
  });

  const onChangePhoneInput = (e) => {
    setPhoneInput({
      ...phoneInput,
      number: e,
      error: e.length < 12 ? "Invalid phone number" : "",
    });
  };
  const onSubmitHandler = (data) => {
    console.log("Submit handler",data)
    if (phoneInput.number) {
      data.phone = phoneInput.number;
      props.nextClicked(3, data);
    }
  };

  return (
    <div>
      <form
        id="form-wizard1"
        className="text-center mt-4"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div className="form-card text-left">
          <div className="row">
            <div className="col-7">
              <h3 className="mb-4">Owner Information:</h3>
            </div>
            <div className="col-5">
              <h2 className="steps">Step 2 - 4</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Owner Name: *</label>
                <input
                  type="text"
                  className={`form-control mb-0 ${
                    errors.owner ? "is-invalid" : ""
                  }`}
                  id="owner"
                  name="owner"
                  placeholder="Owner Name "
                  ref={register({ required: true })}
                />
                {errors.owner && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label>Phone Number: *</label>

                <PhoneInput
                  disableDropdown={true}
                  countryCodeEditable={false}
                  inputClass={`form-control mb-0 ${
                    phoneInput.error ? "is-invalid" : ""
                  }`}
                  country={"pk"}
                  // ref={register({ required: true })}
                  id="phone"
                  placeholder="Enter phone number"
                  name="phone"
                  st
                  onChange={(e) => {
                    onChangePhoneInput(e);
                  }}
                  value={phoneInput.number}
                />

                {phoneInput.error && (
                  <span style={{ color: "red" }}>{phoneInput.error}</span>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Address: *</label>
                <textarea
                  className={`form-control mb-0 ${
                    errors.address ? "is-invalid" : ""
                  }`}
                  type="text"
                  id="exampleFormControlTextarea2"
                  name="address"
                  rows="3"
                  placeholder="Your Address"
                  ref={register({ required: true, minLength: 10 })}
                ></textarea>
                {errors.address && errors.address.type === "required" && (
                  <span style={{ color: "red" }}>Please Fill this Field</span>
                )}
                {errors.address && errors.address.type === "minLength" && (
                  <span style={{ color: "red" }}>
                    Describe your address in detail
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary action-button float-right"
        >
          Next
        </button>
        <button
          type="button"
          name="previous"
          className="btn btn-dark previous action-button-previous float-right mr-3"
          value="Previous"
          onClick={(e) => {
            e.preventDefault();
            props.previousClicked(1);
          }}
        >
          Previous
        </button>
      </form>
    </div>
  );
}
