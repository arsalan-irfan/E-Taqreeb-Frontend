import React, { useState } from "react";
import { useForm } from "react-hook-form";
import BusinessInfo from "./BusinessInfo";
import OwnerInfo from "./OwnerInfo";
import LogoUpload from "./LogoUpload";
import Submit from "./Submit";
import { createBusiness } from "../../actions/business";
import { connect } from "react-redux";




const BusinessRegister = (props) => {
  const [businessData, setBusinessData] = useState({
    company: "",
    businessEmail: "",
    category: "",
    description: "",
    owner: "",
    address: "",
    phone: "",
    city: "",
    cnic: null,
  });
  const [isLoading,setIsLoading]=useState(false)

  const [currentTab, setCurrentTab] = useState(1);
  const activeTab = { display: "block", opacity: 1, position: "relative" };
  const hideTab = { display: "none", position: "relative" };

  const nextClicked = async (value, data) => {
    let res = false;
    if (value === 2) {
      res = form1Valid(data);
    }
    if (value === 3) {
      res = form2Valid(data);
    }
    if (value === 4) {
      res = await onSubmitHandler();
    }
    if (res) {
      setCurrentTab(value);
    }
  };
  const previousClicked = (value) => {
    setCurrentTab(value);
  };

  const onSubmitHandler = async () => {
    setIsLoading(true)
    let res = await props.createBusiness(businessData);
    setIsLoading(false)
    return res;
  };

  const form1Valid = (data) => {
    let { company, businessEmail, category, description, city } = data;
    setBusinessData({
      ...businessData,
      company: company,
      businessEmail: businessEmail,
      category: category,
      description: description,
      city: city,
    });

    return true;
  };
  const form2Valid = (data) => {
    let { address, owner, phone } = data;
    setBusinessData({
      ...businessData,
      owner: owner,
      phone: phone,
      address: address,
    });
    return true;
  };
  const form3Valid = (data) => {
    console.log(data.cnic);
    setBusinessData({
      ...businessData,
      cnic: data,
    });
  };

  return (
    <div>
      {/* Right Sidebar Panel End*/}
      {/* Page Content  */}
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-lg-12">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title">Business Registeration:</h4>
                </div>
              </div>
              <div className="iq-card-body">
                <ul id="top-tab-list" className="p-0">
                  <li
                    className={`${currentTab === 1 ? "active" : ""} ${
                      currentTab > 1 ? "active done" : ""
                    }`}
                    id="account"
                  >
                    <a href="javascript:void();">
                      <i class="las la-warehouse"></i>
                      {/* <i className="ri-lock-unlock-line" /> */}
                      <span>Business </span>
                    </a>
                  </li>
                  <li
                    id="personal"
                    className={`${currentTab === 2 ? "active" : ""} ${
                      currentTab > 2 ? "active done" : ""
                    }`}
                  >
                    <a href="javascript:void();">
                      <i className="ri-user-fill" />
                      <span>Owner</span>
                    </a>
                  </li>
                  <li
                    id="payment"
                    className={`${currentTab === 3 ? "active" : ""} ${
                      currentTab > 3 ? "active done" : ""
                    }`}
                  >
                    <a href="javascript:void();">
                      <i className="ri-camera-fill" />
                      <span>Image</span>
                    </a>
                  </li>
                  <li
                    id="confirm"
                    className={`${currentTab === 4 ? "active done" : ""}`}
                  >
                    <a href="javascript:void();">
                      <i className="ri-check-fill" />
                      <span>Finish</span>
                    </a>
                  </li>
                </ul>
                {/* fieldsets */}
                <fieldset style={currentTab === 1 ? activeTab : hideTab}>
                  <BusinessInfo nextClicked={nextClicked} />
                </fieldset>
                <fieldset style={currentTab === 2 ? activeTab : hideTab}>
                  <OwnerInfo
                    nextClicked={nextClicked}
                    previousClicked={previousClicked}
                  />
                </fieldset>
                <fieldset style={currentTab === 3 ? activeTab : hideTab}>
                  <LogoUpload
                    previousClicked={previousClicked}
                    nextClicked={nextClicked}
                    form3Valid={form3Valid}
                    isLoading={isLoading}
                  />
                </fieldset>
                <fieldset style={currentTab === 4 ? activeTab : hideTab}>
                  <Submit />
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { createBusiness })(BusinessRegister);
