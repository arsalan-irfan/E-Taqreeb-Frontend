import React, { useState } from "react";
import IntroSlider from "../../components/IntroSlider";
import {SendCode, CheckCode } from '../../actions/auth';
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
const ForgetPassword = ({SendCode, emailExist, CheckCode}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const { register, handleSubmit, errors } = useForm();
  const resetCodeClicked = async (data) => {
    
    setIsLoading(true);
    await SendCode(data);
    setIsLoading(false);
    
  };
  const VerifyClicked = async (event) => {
   // CheckCode()
   event.preventDefault();
   setIsVerifying(true);
   await CheckCode({verificationCode});
   setIsVerifying(false);
  }
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
                <h1 className="mb-0">Reset Password</h1>
                <p>
                  Enter your email address and we'll send you an email with
                  instructions to reset your password.
                </p>
                <form className="mt-4" onSubmit={handleSubmit(resetCodeClicked)}>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input
                      type="text"
                      className={`form-control mb-0 ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      id="exampleInputEmail1"
                      name="email"
                      placeholder="Enter email"
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
                        type="submit"
                        className="btn btn-primary float-right"
                      >
                        Send Code
                      </button>
                    )}
                  </div>
                  {emailExist ? (
                    <div>
                    <div className="form-group">
                    <label for="verificationCode">Verification Code</label>
                      <input
                      type="text"
                      className={`form-control mb-0`}
                      id="verificationCode"
                      name="verifyCode"
                      placeholder="Enter Code"
                      onChange={event => setVerificationCode(event.target.value)}
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
                      onClick={e=> VerifyClicked(e)}  
                      className="btn btn-primary float-right"
                      >
                        Verify
                      </button>
                    )}
                    </div>
                    </div>
                  ) : null}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
const mapStateToProps = state => ({
  emailExist: state.auth.emailExist
})

export default connect(mapStateToProps,{SendCode, CheckCode})(ForgetPassword)