import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import IntroSlider from "../../components/IntroSlider";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { connect } from "react-redux";

import { login } from "../../actions/auth";

function Login(props) {
  const { register, handleSubmit, errors } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (data) => {
    setIsLoading(true);
    await props.login(data, props.history);
    setIsLoading(false);
  };
  //email regex
  var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
            <div className="col-md-6 bg-white pt-5">
              <div className="sign-in-form">
                <h1 className="mb-0">Sign in</h1>
                <form className="mt-4" onSubmit={handleSubmit(onSubmitHandler)}>
                  <div className="form-group">
                    <label
                      htmlFor="exampleInputEmail1"
                      style={{ float: "left" }}
                    >
                      Email address
                    </label>
                    <input
                      type="text"
                      className={`form-control mb-0 ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      id="exampleInputEmail1"
                      placeholder="Enter email"
                      name="email"
                      ref={register({ required: true, pattern: emailRegex })}
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
                      style={{ float: "left" }}
                    >
                      Password
                    </label>
                    <a
                      className="float-right"
                      href="/forgetpassword"
                      target="_self"
                    >
                      Forgot password?
                    </a>
                    <input
                      type="password"
                      className={`form-control mb-0 ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      ref={register({ required: true })}
                      id="exampleInputPassword1"
                      placeholder="Password"
                      name="password"
                      // value={password}
                      // onChange={e => onChange(e)}
                    />
                    {errors.password && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="d-inline-block w-100">
                    <div className="custom-control custom-checkbox d-inline-block mt-2 pt-1">
                      <input
                        type="checkbox"
                        style={{ float: "left" }}
                        className="custom-control-input"
                        id="customCheck1"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheck1"
                      >
                        Remember Me
                      </label>
                    </div>
                    {isLoading ? (
                      <button
                        disabled={true}
                        className="btn btn-primary float-right"
                      >
                        <div
                          className="spinner-grow spinner-grow-sm text-white"
                          role="status"
                        ></div>
                        Signing in ...
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-primary float-right"
                      >
                        Sign in
                      </button>
                    )}
                  </div>

                  <div className="or-seperator">
                    <i>or</i>
                  </div>
                  <p className="text-center">
                    Login with your social media account
                  </p>
                  <div className="text-center social-btn">
                    <a
                      href={`http://localhost:5000/login/facebook`}
                      className="btn btn-primary"
                      target="_self"
                    >
                      <i className="fa fa-facebook" />
                      &nbsp; Facebook
                    </a>

                    <a
                      href={`http://localhost:5000/login/google`}
                      className="btn btn-danger"
                      target="_self"
                    >
                      <i className="fa fa-google" />
                      &nbsp; Google
                    </a>
                  </div>

                  <div className="sign-info">
                    <span className="dark-color d-inline-block line-height-2">
                      Don't have an account? <Link to="/register">Sign up</Link>
                    </span>
                    {/* <ul className="iq-social-media">
                      <li>
                        <i className="ri-facebook-box-line" />
                      </li>
                      <li>
                        <i className="ri-google-line" />
                      </li>
                    
                    </ul> */}
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
export default connect(null, { login })(withRouter(Login));
