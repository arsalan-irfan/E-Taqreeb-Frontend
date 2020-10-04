import React, { useState, useEffect } from "react";

import Info from "./Information";
import AddPackage from "./AddPackage";
import AddImage from "./AddImage";
import OrderList from "./OrderList";
import ImageGallery from "./ImageGallery";
import {connect} from 'react-redux'
function Index(props) {
  const [currentTab, setCurrentTab] = useState(1);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="iq-card">
            <div className="iq-card-body p-0">
              <div className="col-sm-12 "></div>
              {
                props.business.isBlock ?
                <div class="alert alert-danger" role="alert">
                Your business is currently blocked by Admin
              </div>:null
              }
           
              <div className="iq-edit-list">
                <ul className="iq-edit-profile d-flex nav nav-pills">
                  <li className="col-md-2 p-0">
                    <div
                      className={`nav-link ${currentTab === 1 ? "active" : ""}`}
                      data-toggle="pill"
                      onClick={() => {
                        setCurrentTab(1);
                      }}
                    >
                      Orders
                    </div>
                  </li>
                  <li className="col-md-2 p-0">
                    <div
                      className={`nav-link ${currentTab === 2 ? "active" : ""}`}
                      data-toggle="pill"
                      onClick={() => {
                        setCurrentTab(2);
                      }}
                    >
                    Packages
                    </div>
                  </li>
                  <li className="col-md-2 p-0">
                    <div
                      className={`nav-link ${currentTab === 3 ? "active" : ""}`}
                      data-toggle="pill"
                      onClick={() => {
                        setCurrentTab(3);
                      }}
                    >
                      Images
                    </div>
                  </li>
                  <li className="col-md-3 p-0">
                    <div
                      className={`nav-link ${currentTab === 4 ? "active" : ""}`}
                      data-toggle="pill"
                      onClick={() => {
                        setCurrentTab(4);
                      }}
                    >
                      Basic Info
                    </div>
                  </li>
                  <li className="col-md-3 p-0">
                    <div
                      className={`nav-link ${currentTab === 5 ? "active" : ""}`}
                      data-toggle="pill"
                      onClick={() => {
                        setCurrentTab(5);
                      }}
                    >
                      Image Gallery
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
                <OrderList />
              </div>
              <div
                className={`tab-pane fade ${
                  currentTab === 2 ? "active show" : ""
                }`}
                id="chang-pwd"
                role="tabpanel"
              >
                <AddPackage />
              </div>
              <div
                className={`tab-pane fade ${
                  currentTab === 3 ? "active show" : ""
                }`}
                id="emailandsms"
                role="tabpanel"
              >
                <AddImage />
              </div>
              <div
                className={`tab-pane fade ${
                  currentTab === 4 ? "active show" : ""
                }`}
                id="manage-contact"
                role="tabpanel"
              >
                <Info />
              </div>
              <div
                className={`tab-pane fade ${
                  currentTab === 5 ? "active show" : ""
                }`}
                id="image-gallery"
                role="tabpanel"
              >
                <ImageGallery />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  business : state.auth.business
})

export default connect(mapStateToProps,{})(Index);
