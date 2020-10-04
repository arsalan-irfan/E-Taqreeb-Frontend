import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import CityInput from "../../components/CityInput/CityInput";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import {
  updateUser,
  updateDp,
  SendEmailVerificationCode,
  EmailVerification,
} from "../../actions/auth";
function UserProfile(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const resetCodeClicked = async () => {
    console.log("reset code clicked", props.user.email);
    setIsLoading(true);
    await props.SendEmailVerificationCode(props.user.email);
    setIsLoading(false);
  };
  const VerifyClicked = async (event) => {
    // CheckCode()
    console.log("verify clicked");
    event.preventDefault();
    setIsVerifying(true);
    await props.EmailVerification(props.user.email, verificationCode);
    setIsVerifying(false);
  };
  var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const { register, handleSubmit, watch, errors } = useForm();

  const [updateBtnDisable, setUpdateBtnDisable] = useState(true);

  const [matchPassError, setmatchPassError] = useState("");

  const [passInput, setPassInput] = useState("");

  const [currentTab, setCurrentTab] = useState(1);

  const [user, setUser] = useState({
    name: {
      value: "",
      error: "",
    },
    phone: {
      value: "",
      error: "",
    },
    city: {
      value: "",
      error: "",
    },
    gender: {
      value: "",
      error: "",
    },
  });
  let { name, gender, city, phone } = user;

  useEffect(() => {
    if (props.user) {
      setUserValues();
    }
  }, [props.user]);

  const setUserValues = (e) => {
    setUser({
      ...user,
      name: {
        ...user.name,
        value: props.user.name,
      },
      gender: {
        ...user.gender,
        value: props.user.gender,
      },
      city: {
        ...user.city,
        value: props.user.city,
      },
      phone: {
        ...user.phone,
        value: props.user.phone,
      },
    });
  };

  const onNameChange = (e) => {
    let error = "";
    let value = "";
    if (!e.target.value) {
      error = "Name is required";
      setUpdateBtnDisable(true);
    } else {
      value = e.target.value;
      setUpdateBtnDisable(false);
    }
    setUser({
      ...user,
      name: {
        ...user.name,
        value,
        error,
      },
    });
  };

  const onPhoneChange = (e) => {
    console.log("here in phone change input", e);
    let error = "";
    let value = "";
    if (!e) {
      error = "Phone number is required";
      setUpdateBtnDisable(true);
    }
    if (e.length > 12 || e.length < 12) {
      value = e;
      error = "Phone number is invalid";
      setUpdateBtnDisable(true);
    } else {
      value = e;
      setUpdateBtnDisable(false);
    }
    setUser({
      ...user,
      phone: {
        ...user.phone,
        value,
        error,
      },
    });
  };
  const onGenderChange = (e) => {
    console.log(e.target.value);
    let error = "";
    let value = "";
    if (!e.target.value) {
      error = "Gender is required";
      setUpdateBtnDisable(true);
    } else {
      value = e.target.value;
      setUpdateBtnDisable(false);
    }
    setUser({
      ...user,
      gender: {
        ...user.gender,
        value,
        error,
      },
    });
  };
  const onCityChange = (e) => {
    let error = "";
    let value = "";
    if (!e.target.value) {
      error = "City is required";
      setUpdateBtnDisable(true);
    } else {
      value = e.target.value;
      setUpdateBtnDisable(false);
    }
    setUser({
      ...user,
      city: {
        ...user.city,
        value,
        error,
      },
    });
  };

  const validatePassword = (value) => {
    if (value === passInput) {
      setmatchPassError("");
      return true;
    } else {
      setmatchPassError("Passwords doesn't match");
      return false;
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    props.updateUser({
      name: name.value,
      phone: phone.value,
      gender: gender.value,
      city: city.value,
    });
    setUpdateBtnDisable(true);
  };

  const onUpdateDp = (e) => {
    let image = e.target.files[0];

    props.updateDp({ image });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="iq-card">
            <div className="iq-card-body p-0">
              <div className="col-sm-12 "></div>
              <div className="iq-edit-list">
                <ul className="iq-edit-profile d-flex nav nav-pills">
                  <li className="col-md-4 p-0">
                    <div
                      className={`nav-link ${currentTab === 1 ? "active" : ""}`}
                      data-toggle="pill"
                      onClick={() => {
                        setCurrentTab(1);
                      }}
                    >
                      Personal Information
                    </div>
                  </li>
                  <li className="col-md-4 p-0">
                    <div
                      className={`nav-link ${currentTab === 2 ? "active" : ""}`}
                      data-toggle="pill"
                      onClick={() => {
                        setCurrentTab(2);
                      }}
                    >
                      Change Password
                    </div>
                  </li>
                  <li className="col-md-4 p-0">
                    <div
                      className={`nav-link ${currentTab === 3 ? "active" : ""}`}
                      data-toggle="pill"
                      onClick={() => {
                        setCurrentTab(3);
                      }}
                    >
                      Email Verification
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="iq-edit-list-data">
            <div className="tab-content">
              <div
                className={`tab-pane fade ${
                  currentTab === 1 ? "active show" : ""
                }`}
                id="personal-information"
                role="tabpanel"
              >
                <div className="iq-card">
                  <div className="iq-card-header d-flex justify-content-between">
                    <div className="iq-header-title">
                      <h4 className="card-title">Personal Information</h4>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 col-lg-8">
                      <div className="iq-card">
                        <div className="iq-card-body">
                          <p></p>
                          <form onSubmit={(e) => onSubmitHandler(e)}>
                            <div className="form-row">
                              <div className="col">
                                <label
                                  htmlFor="name"
                                  style={{ float: "left", fontWeight: "bold" }}
                                >
                                  Name
                                </label>
                                <input
                                  type="text"
                                  className={`form-control  ${
                                    errors.name ? "is-invalid" : ""
                                  }`}
                                  id="name"
                                  placeholder="Enter name"
                                  name="name"
                                  value={name.value}
                                  onChange={(e) => {
                                    onNameChange(e);
                                  }}
                                />
                                {name.error && (
                                  <span style={{ color: "red" }}>
                                    This field is required
                                  </span>
                                )}
                              </div>
                              <div className="col"></div>
                            </div>

                            <div className="form-row">
                              <div className="col">
                                <label htmlFor="exampleInputphone">
                                  Phone:
                                </label>
                                <PhoneInput
                                  countryCodeEditable={false}
                                  country={"pk"}
                                  id="phone"
                                  placeholder="Enter phone number"
                                  name="phone"
                                  //value={phoneInput.number}
                                  value={phone.value}
                                  onChange={(e) => {
                                    onPhoneChange(e);
                                  }}
                                />
                                {phone.error && (
                                  <span style={{ color: "red" }}>
                                    {phone.error}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="col"></div>

                            <div className="form-row">
                              <div className="col">
                                <label htmlFor="exampleInputphone">City:</label>
                                <CityInput
                                  className={`form-control mb-0 ${
                                    errors.city ? "is-invalid" : ""
                                  }`}
                                  register={register}
                                  id="city"
                                  placeholder="Select your city"
                                  name="city"
                                  value={city.value}
                                  onChangeStatus={true}
                                  onChange={(e) => {
                                    onCityChange(e);
                                  }}
                                />

                                {city.error && (
                                  <span style={{ color: "red" }}>
                                    This field is required
                                  </span>
                                )}
                              </div>
                              <div className="col"></div>
                            </div>
                            <div className="form-group col-sm-6">
                              <label className="d-block">Gender:</label>
                              <div className="custom-control custom-radio custom-control-inline">
                                <input
                                  type="radio"
                                  id="customRadio6"
                                  name="customRadio1"
                                  className="custom-control-input"
                                  value="1"
                                  checked={gender.value == 1 ? true : false}
                                  onChange={(e) => {
                                    onGenderChange(e);
                                  }}
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
                                  id="customRadio7"
                                  name="customRadio1"
                                  className="custom-control-input"
                                  checked={gender.value !== 1 ? true : false}
                                  onChange={(e) => {
                                    onGenderChange(e);
                                  }}
                                  value="2"
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

                            <button
                              type="submit"
                              className="btn btn-primary"
                              disabled={updateBtnDisable}
                            >
                              Update
                            </button>
                            <button
                              type="button"
                              className="btn iq-bg-danger"
                              onClick={() => {
                                setUserValues();
                              }}
                            >
                              cancel
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                    {/*  */}
                    <div className="col-sm-12 col-lg-4">
                      <div
                        className="iq-card"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          // justifyContent: "center",
                          alignItems: "center",
                          //backgroundColor: "green",
                        }}
                      >
                        <div className="iq-card-body ">
                          <div
                            className="row align-items-center"
                            style={{ marginBottom: 30 }}
                          >
                            <div className="col-md-12">
                              <div className="profile-img-edit ">
                                <img
                                  className="profile-pic  "
                                  src={props?.user?.imageURL}
                                  alt="profile-pic"
                                />
                                <div className="p-image">
                                  <div class="image-upload">
                                    <label htmlFor="file-input">
                                      <i
                                        className="ri-pencil-line upload-button"
                                        style={{ color: "white" }}
                                      ></i>{" "}
                                    </label>
                                    <input
                                      id="file-input"
                                      type="file"
                                      name="image"
                                      accept="/*image"
                                      onChange={(e) => {
                                        onUpdateDp(e);
                                      }}
                                      style={{ display: "none" }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`tab-pane fade ${
                  currentTab === 2 ? "active show" : ""
                }`}
                id="chang-pwd"
                role="tabpanel"
              >
                <div className="iq-card">
                  <div className="iq-card-header d-flex justify-content-between">
                    <div className="iq-header-title">
                      <h4 className="card-title">Change Password</h4>
                    </div>
                  </div>
                  <div className="iq-card-body">
                    <form onSubmit={(e) => onSubmitHandler(e)}>
                      <div className="form-group">
                        <label htmlFor="cpass">Current Password:</label>

                        <input
                          type="Password"
                          className="form-control"
                          id="cpass"
                          ref={register({
                            required: true,
                            minLength: 6,
                          })}
                          id="exampleInputPassword1"
                          placeholder="Password"
                          name="password"
                        />

                        {errors.password &&
                          errors.password.type === "required" && (
                            <span style={{ color: "red" }}>
                              This field is required
                            </span>
                          )}
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="exampleInputPassword1"
                          style={{ float: "left", fontWeight: "bold" }}
                        >
                          New Password
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
                          id="exampleInputPassword12"
                          placeholder="Password"
                          name="newpassword"
                          value={passInput}
                          onChange={(e) => {
                            setPassInput(e.target.value);
                          }}
                        />
                        {errors.newpassword &&
                          errors.newpassword.type === "required" && (
                            <span style={{ color: "red" }}>
                              This field is required
                            </span>
                          )}

                        {errors.newpassword &&
                          errors.newpassword.type === "minLength" && (
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
                            matchPassError || errors.cpassword
                              ? "is-invalid"
                              : ""
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
                      {/* <div className="form-group">
                        <label htmlFor="npass">New Password:</label>
                        <input
                          type="Password"
                          className="form-control"
                          id="npass"
                          defaultValue
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="vpass">Verify Password:</label>
                        <input
                          type="Password"
                          className="form-control"
                          id="vpass"
                          defaultValue
                        />
                      </div> */}
                      <button type="submit" className="btn btn-primary mr-2">
                        Submit
                      </button>
                      <button type="reset" className="btn iq-bg-danger">
                        Cancel
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div
                className={`tab-pane fade ${
                  currentTab === 3 ? "active show" : ""
                }`}
                id="emailandsms"
                role="tabpanel"
              >
                <div className="iq-card">
                  <div className="iq-card-header d-flex justify-content-between">
                    <div className="iq-header-title">
                      <h4 className="card-title">Email Verification</h4>
                    </div>
                  </div>
                  <div className="iq-card-body">
                    {props.user.emailVerified ? (
                      <div class="alert alert-success" role="alert">
                        You have already verified your email
                      </div>
                    ) : (
                      <form
                        className="mt-4"
                        onSubmit={handleSubmit(resetCodeClicked)}
                      >
                        <div className="form-group">
                          <label for="exampleInputEmail1">Email address</label>
                          <input
                            disabled={true}
                            type="text"
                            className={`form-control mb-0 ${
                              errors.email ? "is-invalid" : ""
                            }`}
                            id="exampleInputEmail1"
                            name="email"
                            value={props.user.email}
                            placeholder="Enter email"
                            ref={register({
                              required: true,
                              pattern: emailRegex,
                            })}
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

                        <div className="d-inline-block w-100">
                          {isLoading ? (
                            <button
                              disabled={true}
                              className="btn btn-primary float-right"
                            >
                              <div
                                className="spinner-grow spinner-grow-sm text-white"
                                role="status"
                              ></div>
                              Sending Code ...
                            </button>
                          ) : (
                            <button
                              onClick={() => resetCodeClicked()}
                              className="btn btn-primary float-right"
                            >
                              Send Code
                            </button>
                          )}
                        </div>

                        <div>
                          <div className="form-group">
                            <label for="verificationCode">
                              Verification Code
                            </label>
                            <input
                              type="text"
                              className={`form-control mb-0`}
                              id="verificationCode"
                              name="verifyCode"
                              placeholder="Enter Code"
                              onChange={(event) =>
                                setVerificationCode(event.target.value)
                              }
                              ref={register({ required: true })}
                            />
                          </div>
                          <div className="d-inline-block w-100">
                            {isVerifying ? (
                              <button
                                disabled={true}
                                className="btn btn-primary float-right"
                              >
                                <div
                                  className="spinner-grow spinner-grow-sm text-white"
                                  role="status"
                                ></div>
                                Verifying ...
                              </button>
                            ) : (
                              <button
                                onClick={(e) => VerifyClicked(e)}
                                className="btn btn-primary float-right"
                              >
                                Verify
                              </button>
                            )}
                          </div>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
              <div
                className={`tab-pane fade ${
                  currentTab === 4 ? "active show" : ""
                }`}
                id="manage-contact"
                role="tabpanel"
              >
                <div className="iq-card">
                  <div className="iq-card-header d-flex justify-content-between">
                    <div className="iq-header-title">
                      <h4 className="card-title">Manage Socials</h4>
                    </div>
                  </div>
                  <div className="iq-card-body">
                    <form>
                      <div className="form-group">
                        <label htmlFor="url">Url:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="url"
                          defaultValue="https://getbootstrap.com"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="url">Instagram:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="urlig"
                          defaultValue="https://instagram.com/username"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="url">Faceook:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="urlfb"
                          defaultValue="https://facebook.com/username"
                        />
                      </div>
                      <button type="submit" className="btn btn-primary mr-2">
                        Update
                      </button>
                      <button type="reset" className="btn iq-bg-danger">
                        Cancel
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  updateUser,
  updateDp,
  EmailVerification,
  SendEmailVerificationCode,
})(UserProfile);
