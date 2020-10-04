import React, { useState } from "react";
import { useForm } from "react-hook-form";

import PhoneInput from "react-phone-input-2";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import CityInput from "../../components/CityInput/CityInput";
import { completeProfile } from "../../actions/auth";
const SocialLoginModal = ({ completeProfile, email, showModal }) => {
  const [phoneInput, setPhoneInput] = useState({
    number: "",
    error: "",
  });
  const { register, handleSubmit, errors } = useForm();
  const [city, setCity] = useState("");
  const [showError,setShowError]=useState(false)
  const onCityChange = (e) => {
    setCity(e.target.value);
  };
  const onSubmitHandler = async (data) => {
    let { number } = phoneInput;
    data.phone = number;
    const { phone, city, gender } = data;

    completeProfile({ email, phone, gender, city });
  };

  const onChangePhoneInput = (e) => {
    setPhoneInput({
      ...phoneInput,
      number: e,
      error: e.length < 12 ? "Invalid phone number" : "",
    });
  };
  let a = "modal";
  return (
    <Modal show={!showModal}>
      <Modal.Header>Hi</Modal.Header>
      <Modal.Body>
        <form className="mt-4" onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="form-group">
            <label style={{ float: "left", fontWeight: "bold" }}>Phone</label>
            <br />
          </div>
          <div className="form-group">
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
              onChange={(e) => {
                onChangePhoneInput(e);
              }}
              value={phoneInput.number}
            />

            {phoneInput.error && (
              <span style={{ color: "red" }}>{phoneInput.error}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="city" style={{ float: "left", fontWeight: "bold" }}>
              City
            </label>
             <CityInput
                  className={`form-control mb-0 ${
                    errors.city ? "is-invalid" : ""
                  }`}
                  register={register}
                  id="city"
                  placeholder="Select your city"
                  name="city"
                  value={city}
                  onChangeStatus={true}
                  onChange={(e) => {
                    onCityChange(e);
                  }}
                />
                {!errors.city && showError && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
          </div>
          <div className="form-group col-sm-6">
            <label className="d-block">Gender:</label>
            <div className="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                id="customRadio6"
                name="gender"
                className="custom-control-input"
                defaultChecked
                value={1}
                ref={register({ required: true })}
              />
              <label className="custom-control-label" htmlFor="customRadio6">
                Male{" "}
              </label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                ref={register({ required: true })}
                id="customRadio7"
                name="gender"
                className="custom-control-input"
                value={2}
              />
              <label className="custom-control-label" htmlFor="customRadio7">
                {" "}
                Female{" "}
              </label>
            </div>
          </div>
          <div className="d-inline-block w-100 mt-4">
            <button type="submit" className="btn btn-primary btn-block">
              Update
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};
const mapStateToProps = (state) => ({
  email: state.auth.user ? state.auth.user.email : "",

  showModal: state.auth.user ? state.auth.user.completeProfile : true,
});

export default connect(mapStateToProps, { completeProfile })(SocialLoginModal);
