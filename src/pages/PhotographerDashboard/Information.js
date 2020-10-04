import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CityInput from "../../components/CityInput/CityInput";
import PhoneInput from "react-phone-input-2";
import { connect } from "react-redux";
import { updatePhotographerAccount } from "../../actions/photographer";
import DashboardHeader from "../../components/DashboardHeader/PhotographerDashboardHeader";

function BusinessInfo(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [city, setCity] = useState("");

  const [phoneInput, setPhoneInput] = useState({
    number: "",
    error: "",
  });
  const onCityChange = (e) => {
    setCity(e.target.value);
  };

  const { register, handleSubmit, errors, setValue } = useForm();

  const setDefaultValue = () => {
    let {
      company,
      owner,
      businessEmail,
      address,
      phone,
      description,
      city,
    } = props.business;
    setValue("company", company);
    setValue("owner", owner);
    setValue("businessEmail", businessEmail);
    setValue("address", address);
    setValue("phone", phone);
    setValue("description", description);
    setPhoneInput({
      ...phoneInput,
      number: phone,
    });
    setCity(city);
  };

  useEffect(() => {
    if (props.business) {
      setDefaultValue();
    }
  }, [props.business]);
  var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const onChangePhoneInput = (e) => {
    setPhoneInput({
      ...phoneInput,
      number: e,
      error: e.length < 12 ? "Invalid phone number" : "",
    });
  };

  const onSubmitHandler = async (data) => {
    if (phoneInput.number && city) {
      data.city = city;
      data.phone = phoneInput.number;
      setIsLoading(true);
      await props.updatePhotographerAccount(data);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-lg-12">
            <div className="iq-card">
              <form onSubmit={handleSubmit(onSubmitHandler)}>
                <div className="form-card text-left">
                  <div className="iq-card-body">
                    <div className="iq-card-header">
                      <DashboardHeader heading="Update Information" />
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Business name: *</label>
                          <input
                            type="text"
                            //id="uname"
                            className={`form-control mb-0 ${
                              errors.uname ? "is-invalid" : ""
                            }`}
                            name="company"
                            placeholder="Business Name "
                            ref={register({ required: true })}
                          />
                          {errors.company && (
                            <span style={{ color: "red" }}>
                              This field is required
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>City: *</label>
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
                          {!city && showError && (
                            <span style={{ color: "red" }}>
                              This field is required
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Business Email: *</label>
                          <input
                            type="text"
                            className={`form-control mb-0 ${
                              errors.businessEmail ? "is-invalid" : ""
                            }`}
                            name="businessEmail"
                            placeholder="Email Id"
                            ref={register({
                              required: true,
                              pattern: emailRegex,
                            })}
                          />
                          {errors.businessEmail &&
                            errors.businessEmail.type === "required" && (
                              <span style={{ color: "red" }}>
                                This field is required
                              </span>
                            )}
                          {errors.businessEmail &&
                            errors.businessEmail.type === "pattern" && (
                              <span style={{ color: "red" }}>
                                Please Enter Valid Email!
                              </span>
                            )}
                        </div>
                      </div>
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
                            <span style={{ color: "red" }}>
                              This field is required
                            </span>
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
                            onChange={(e) => {
                              onChangePhoneInput(e);
                            }}
                            value={phoneInput.number}
                          />

                          {phoneInput.error && (
                            <span style={{ color: "red" }}>
                              {phoneInput.error}
                            </span>
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
                          {errors.address &&
                            errors.address.type === "required" && (
                              <span style={{ color: "red" }}>
                                Please Fill this Field
                              </span>
                            )}
                          {errors.address &&
                            errors.address.type === "minLength" && (
                              <span style={{ color: "red" }}>
                                Describe your address in detail
                              </span>
                            )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Description: *</label>

                          <textarea
                            className={`form-control mb-0 ${
                              errors.textArea ? "is-invalid" : ""
                            }`}
                            type="text"
                            id="exampleFormControlTextarea1"
                            name="description"
                            rows="3"
                            placeholder="A brief description about your business"
                            ref={register({ required: true, minLength: 30 })}
                            //   onChange={(e) => descriptionChange(e)}
                          ></textarea>
                          {errors.description &&
                            errors.description.type === "required" && (
                              <span style={{ color: "red" }}>
                                Please Fill this Field
                              </span>
                            )}
                          {errors.description &&
                            errors.description.type === "minLength" && (
                              <span style={{ color: "red" }}>
                                Please Descrbe your business in minimum 30 words
                              </span>
                            )}
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary action-button float-right"
                      onClick={() => setShowError(true)}
                      disabled={isLoading}
                    >
                      {isLoading ? "Updating ..." : "Update"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  business: state.auth.business,
});

export default connect(mapStateToProps, { updatePhotographerAccount })(BusinessInfo);
