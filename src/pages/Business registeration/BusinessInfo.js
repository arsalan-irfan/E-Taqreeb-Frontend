import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CityInput from "../../components/CityInput/CityInput";
export default function BusinessInfo(props) {
  const [dropdown, showdropdown] = useState(false);
  const [category, setCategory] = useState({value:"",type:""});
  const [showError,setShowError]=useState(false)
  const [city, setCity] = useState("");
  const onCityChange = (e) => {
    setCity(e.target.value);
  };

  const { register, handleSubmit, watch, errors } = useForm();

  var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const onChangeCategory = (e) => {
    let type=""
    let val=""
    switch(e.target.value){
      case "1":
        type="Lawns & banquet"
        val=e.target.value
        break;
      case "2":
        type="Photography"
        val=e.target.value
        break;
      case "3":
        type="Caterers"
        val=e.target.value
        break;
      default:
        type=""
        val=e.target.value
        break;
    }
    setCategory({
      ...category,
      type:type,
      value:val
    })
  };

  const categoryClicked = () => {
    showdropdown(!dropdown);
  };

  const onSubmitHandler = (data) => {
    if (category && city) {
      console.log("category is:",category.value)
      data.category = category.value;
      data.city = city;
      props.nextClicked(2, data);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="form-card text-left">
          <div className="row">
            <div className="col-7">
              <h3 className="mb-4">Business Information:</h3>
            </div>
            <div className="col-5">
              <h2 className="steps">Step 1 - 4</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
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
                  <span style={{ color: "red" }}>This field is required</span>
                )}
              </div>
            </div>
            <div className="col-md-6">
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
                {errors.businessEmail && errors.businessEmail.type === "required" && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
                {errors.businessEmail && errors.businessEmail.type === "pattern" && (
                  <span style={{ color: "red" }}>
                    Please Enter Valid Email!
                  </span>
                )}
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label>Category: *</label>

                <div
                  className={`${dropdown ? "dropdown show" : "dropdown"}`}
                  //className="dropdown"
                >
                  <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded={`${dropdown ? "true" : "false"}`}
                    //aria-expanded="false"
                    onClick={(e) => {
                      e.preventDefault();
                      categoryClicked();
                    }}
                  >
                    {category.value ? category.type : "Select Category"}
                  </button>
                  <div
                    //class="dropdown-menu"
                    className={`${
                      dropdown ? "dropdown-menu show" : "dropdown-menu"
                    }`}
                    aria-labelledby="dropdownMenuButton"
                    style={{
                      position: "absolute",
                      transform: "translate3d(0px, 35px, 0px)",
                      top: "0px",
                      left: "0px",
                      willChange: "transform",
                    }}
                  >
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        onChangeCategory(e);
                        categoryClicked();
                      }}
                      value="1"
                      class="dropdown-item"
                    >
                      Lawn & banquet
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        onChangeCategory(e);
                        categoryClicked();
                      }}
                      value="2"
                      class="dropdown-item"
                    >
                      photographer
                    </button>
                   
                  </div>
                </div>
              </div>
              {!category.value && showError && (
                <span style={{ color: "red" }}>Select business category!</span>
              )}
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label> City</label>

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
                {!city && showError &&(
                  <span style={{ color: "red" }}>This field is required</span>
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
                    <span style={{ color: "red" }}>Please Fill this Field</span>
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
        </div>

        <button
          type="submit"
          className="btn btn-primary action-button float-right"
          onClick={()=>setShowError(true)}
        >
          Next
        </button>
      </form>
    </div>
  );
}
