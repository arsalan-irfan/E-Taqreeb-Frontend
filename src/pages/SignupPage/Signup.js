import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import IntroSlider from "../../components/IntroSlider";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import CityInput from "../../components/CityInput/CityInput";
import "react-phone-input-2/lib/style.css";

import { connect } from "react-redux";
import { registerUser } from "../../actions/auth";

function Signup(props) {
  const { register, handleSubmit, errors } = useForm();

  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const [matchPassError, setmatchPassError] = useState("");

  const [passInput, setPassInput] = useState("");

  const [image, setImage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (value) => {
    if (value === passInput) {
      setmatchPassError("");
      return true;
    } else {
      setmatchPassError("Passwords doesn't match");
      return false;
    }
  };

  const onSubmitHandler = async (data) => {
    let { number } = phoneInput;
    if (city.value) {
      setCity({
        ...setPhoneInput,
        error: "Phone Number is required",
      });
    }
    if (number.length < 12) {
      setPhoneInput({
        ...setPhoneInput,
        error: "Invalid Phone Number",
      });
    } else if (!number) {
      setPhoneInput({
        ...setPhoneInput,
        error: "Phone Number is required",
      });
    } else {
      data.city = city;
      data.phone = number;
      data.image = image;
      try {
        await props.registerUser(data, props.history);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    }
  };
  //email regex
  var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [phoneInput, setPhoneInput] = useState({
    number: "",
    error: "",
  });
  const [city, setCity] = useState({ value: "", error: "" });
  const onChangePhoneInput = (e) => {
    setPhoneInput({
      ...phoneInput,
      number: e,
      error: e.length < 12 ? "Invalid phone number" : "",
    });
  };
  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    setImage(e.target.files[0]);
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <section className="sign-in-page">
        <div id="container-inside">
          <div id="circle-small" />
          <div id="circle-medium" />
          <div id="circle-large" />
          <div id="circle-xlarge" />
          <div id="circle-xxlarge" />
        </div>
        <div className="container p-0">
          <div className="row no-gutters">
            <div className="col-md-6 text-center pt-5">
              <div className="sign-in-detail text-white">
                <div className="sign-in-logo mb-5">
                  <h1 style={{ color: "white", fontWeight: "bold" }}>
                    E-Taqreeb
                  </h1>
                </div>
                <div style={{ margin: "5em" }}>
                  <IntroSlider />
                </div>
              </div>
            </div>
            <div className="col-md-6 bg-white pt-2">
              <div className="sign-in-form">
                <h1 className="mb-0">Sign up</h1>

                <form className="mt-2" onSubmit={handleSubmit(onSubmitHandler)}>
                  <div className="form-group">
                    <label
                      htmlFor="name"
                      style={{ float: "left", fontWeight: "bold" }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      className={`form-control mb-0 ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      ref={register({ required: true })}
                      id="name"
                      placeholder="Enter name"
                      name="name"
                    />
                    {errors.name && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="exampleInputEmail1"
                      style={{ float: "left", fontWeight: "bold" }}
                    >
                      Email address
                    </label>
                    <input
                      type="text"
                      className={`form-control mb-0 ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      ref={register({ required: true, pattern: emailRegex })}
                      id="exampleInputEmail1"
                      placeholder="Enter email"
                      name="email"
                    />
                    {errors.email && errors.email.type === "required" && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                    {errors.email && errors.email.type === "pattern" && (
                      <span style={{ color: "red" }}>
                        Please Enter Valid Email!
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label
                      htmlFor="exampleInputPassword1"
                      style={{ float: "left", fontWeight: "bold" }}
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className={`form-control mb-0 ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      ref={register({
                        required: true,
                        minLength: 6,
                      })}
                      id="exampleInputPassword1"
                      placeholder="Password"
                      name="password"
                      value={passInput}
                      onChange={(e) => {
                        setPassInput(e.target.value);
                      }}
                    />
                    {errors.password && errors.password.type === "required" && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}

                    {errors.password &&
                      errors.password.type === "minLength" && (
                        <span style={{ color: "red" }}>
                          Password should contain atleast 6 character!
                        </span>
                      )}
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="exampleInputPassword2"
                      style={{ float: "left", fontWeight: "bold" }}
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className={`form-control mb-0 ${
                        matchPassError || errors.cpassword ? "is-invalid" : ""
                      }`}
                      ref={register({
                        required: true,
                        validate: validatePassword,
                      })}
                      id="exampleInputPassword2"
                      placeholder="Password"
                      name="cpassword"
                    />
                    {errors.cpassword &&
                      errors.cpassword.type === "required" && (
                        <span style={{ color: "red" }}>
                          This field is required
                        </span>
                      )}
                    {matchPassError && (
                      <span style={{ color: "red" }}>{matchPassError}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label style={{ float: "left", fontWeight: "bold" }}>
                      Phone
                    </label>
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
                    <label
                      htmlFor="city"
                      style={{ float: "left", fontWeight: "bold" }}
                    >
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
                        setCity(e.target.value);
                      }}
                    />
                    {city.error && (
                      <span style={{ color: "red" }}>{city.error}</span>
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
                      <label
                        className="custom-control-label"
                        htmlFor="customRadio6"
                      >
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
                      <label
                        className="custom-control-label"
                        htmlFor="customRadio7"
                      >
                        {" "}
                        Female{" "}
                      </label>
                    </div>
                  </div>
                  <div className="form-group row d-flex justify-content-center">
                    <div className="align-items-center">
                      <div
                        className="profile-img-edit "
                        onClick={() => imageUploader.current.click()}
                      >
                        <img
                          className="profile-pic"
                          src="https://s3-us-west-1.amazonaws.com/s3-lc-upload/assets/default_avatar.jpg"
                          alt="profile-pic"
                          ref={uploadedImage}
                          style={{
                            width: 150,
                            height: 150,
                            // alignItems: "center",
                            // marginLeft: 50,
                          }}
                        />
                        <div className="p-image">
                          <i className="ri-pencil-line upload-button" />
                          <input
                            className="file-upload"
                            type="file"
                            onChange={handleImageUpload}
                            accept="image/*"
                            ref={imageUploader}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-inline-block w-100">
                    {isLoading ? (
                      <button
                        className="btn btn-primary float-right"
                        disabled={true}
                      >
                        <div
                          className="spinner-grow spinner-grow-sm text-white"
                          role="status"
                        ></div>
                        Signing up ...
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-primary float-right "
                      >
                        Sign Up
                      </button>
                    )}

                    <div className="sign-info">
                      <span className="dark-color d-inline-block line-height-2">
                        Already have an account? <Link to="/">Sign in</Link>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default connect(null, { registerUser })(withRouter(Signup));
