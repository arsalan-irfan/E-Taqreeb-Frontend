import React, { useState } from "react";
import IntroSlider from "../../components/IntroSlider";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import {resetPassword} from '../../actions/auth';
import { toast } from "react-toastify";
const NewPassword = ({resetPassword}) => {
  const { register, handleSubmit, errors } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const confirmClicked = async (data) => {
    const { password, confirm_password} = data;
    setIsLoading(true);
        
    if(password!=confirm_password){
        setIsLoading(false);
        toast.error("passwords do not match");
    }
    else{
        setIsLoading(false);
        const email = localStorage.getItem('email')
        resetPassword({email, password, confirm_password})
    }
  }
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
               
                <form className="mt-4" onSubmit={handleSubmit(confirmClicked)}>
                  <div className="form-group">
                  <label for="exampleInputPassword1">New password</label>
                  
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
                      // value={password}
                      // onChange={e => onChange(e)}
                    />
                    {errors.password && errors.password.type === "required"&& (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                      <label for="exampleInputPassword1">Confirm password</label>
                  
                  <input
                      type="password"
                      className={`form-control mb-0 ${
                        errors.confirm_password ? "is-invalid" : ""
                      }`}
                      ref={register({ required: true })}
                      id="exampleConfirmPassword1"
                      placeholder="Confirm Password"
                      name="confirm_password"
                      // value={password}
                      // onChange={e => onChange(e)}
                    />
                    {errors.confirm_password && (
                      <span style={{ color: "red" }}>
                        This field is required
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
                       Confirming ...
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-primary float-right"
                      >
                        Change 
                      </button>
                    )}
                  </div>
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

export default connect(mapStateToProps,{resetPassword})(NewPassword)