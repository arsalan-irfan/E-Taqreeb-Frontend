import React, { useState } from "react";
import { connect } from "react-redux";
import { toggleNavbar } from "../actions/app";
import { Link, withRouter } from "react-router-dom";
import { logout } from "../actions/auth";
import Spinner from "../components/Spinner/Spinner";

const Topbar = (props) => {
  const [dropdown1, setDropdown1] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);
  const [dropdown3, setDropdown3] = useState(false);
  const [dropdown4, setDropdown4] = useState(false);
  const [mobileMode, setMobileMode] = useState(false);
  return (
    <nav className="navbar navbar-expand-lg navbar-light p-0">
      <div className="iq-navbar-logo d-flex justify-content-between">
        <Link to="/">
          <img
            src="https://www.photoimg.com/wp-content/uploads/2016/06/blue-white-letter-e-logo-design-png.png"
            className="img-fluid"
            alt=""
          />
          <span> E-Taqreeb</span>
        </Link>
        <div className="iq-menu-bt align-self-center">
          <div
            className={`wrapper-menu ${props.navbarOpen ? "open" : ""}`}
            onClick={() => {
              props.toggleNavbar();
            }}
          >
            <div className="main-circle">
              <i className="ri-menu-line" />
            </div>
          </div>
        </div>
      </div>

      <button
        className={`${
          mobileMode ? `navbar-toggler` : `navbar-toggler collapsed`
        } `}
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-label="Toggle navigation"
        aria-expanded={`${mobileMode ? `true` : `false`}`}
        onClick={() => {
          setMobileMode(!mobileMode);
        }}
      >
        <i className="ri-menu-3-line" />
      </button>
      <div
        className={`collapse navbar-collapse ${mobileMode ? `show` : ``}`}
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav ml-auto navbar-list">
          <li>
            <Link
              to="/user/profile"
              //target="_self"
              className="iq-waves-effect d-flex align-items-center"
            >
              {localStorage.getItem("type") == "admin" ? (
                <img
                  src={
                    "https://w7.pngwing.com/pngs/306/70/png-transparent-computer-icons-management-admin-silhouette-black-and-white-neck.png"
                  }
                  className="img-fluid rounded-circle mr-3"
                  alt="user"
                />
              ) : (
                <img
                  src={props.user ? props.user.imageURL : ""}
                  className="img-fluid rounded-circle mr-3"
                  alt="user"
                />
              )}

              <div className="caption">
                <h6 className="mb-0 line-height">
                  {props.user ? props.user.name : ""}
                </h6>
              </div>
            </Link>
          </li>
          <li>
            <Link
              to="/user"
              className="iq-waves-effect d-flex align-items-center"
            >
              <i className="ri-home-line" />
            </Link>
          </li>
          {
            props.user && props.user.businessUser?(
              <li
            className={`nav-item ${dropdown2 ? "iq-show" : ""}`}
            onClick={() => {
              setDropdown1(false);
              setDropdown2(!dropdown2);
              setDropdown3(false);
              setDropdown4(false);
            }}
          >
            <span
              className={`search-toggle iq-waves-effect ${
                dropdown2 ? "active" : ""
              }`}
            >
              <i className="ri-briefcase-line" />
            </span>
            <div className="iq-sub-dropdown">
              <div className="iq-card shadow-none m-0">
                <div className="iq-card-body p-0 ">
                  <div className="bg-primary p-3">
                    <h5 className="mb-0 text-white">
                      Manage Business
                      
                    </h5>
                  </div>
                  <Link
                    to="/user/Business"
                    // target="_self"
                    className="iq-sub-card"
                  >
                    <div className="media align-items-center">
                      <div className="media-body ml-3">
                        <h6 className="mb-0 ">Business Dashboard</h6>

                        <p className="mb-0">Dashboard is provided to manage your business</p>
                      </div>
                    </div>
                  </Link>
                  {props.user ? (
                    props.user.businessUser ? (
                      <Link to="/user/businessChat" className="iq-sub-card">
                        <div className="media align-items-center">
                          <div className="media-body ml-3">
                            <h6 className="mb-0 ">Business Chat</h6>

                            <p className="mb-0">Messaging Platform provided to interact with clients</p>
                          </div>
                        </div>
                      </Link>
                    ) : null
                  ) : null}
                </div>
              </div>
            </div>
          </li>

            ):(null)
          }
          
          </ul>
        <ul
          className={`navbar-list`}
          onClick={() => {
            setDropdown1(false);
            setDropdown2(false);
            setDropdown3(false);
            setDropdown4(!dropdown4);
          }}
        >
          <li className={`${dropdown4 ? "iq-show" : ""}`}>
            <span
              className={`search-toggle iq-waves-effect d-flex align-items-center  ${
                dropdown4 ? "active" : ""
              }`}
            >
              <i className="ri-arrow-down-s-fill" />
            </span>
            <div className="iq-sub-dropdown iq-user-dropdown">
              <div className="iq-card shadow-none m-0">
                <div className="iq-card-body p-0 ">
                  <div className="bg-primary p-3 line-height">
                    <h5 className="mb-0 text-white line-height">
                      {props.user ? props.user.name : ""}
                    </h5>
                    <span className="text-white font-size-12">Available</span>
                  </div>
                  <Link
                    to="/user/profile"
                    //target="_self"
                    className="iq-sub-card iq-bg-primary-hover"
                  >
                    <div className="media align-items-center">
                      <div className="rounded iq-card-icon iq-bg-primary">
                        <i className="ri-file-user-line" />
                      </div>
                      <div className="media-body ml-3">
                        <h6 className="mb-0 ">My Profile</h6>
                        <p className="mb-0 font-size-12">
                          View personal profile details.
                        </p>
                      </div>
                    </div>
                  </Link>
                  <Link
                    to="/user/profile"
                    //target="_self"
                    className="iq-sub-card iq-bg-warning-hover"
                  >
                    <div className="media align-items-center">
                      <div className="rounded iq-card-icon iq-bg-warning">
                        <i className="ri-profile-line" />
                      </div>
                      <div className="media-body ml-3">
                        <h6 className="mb-0 ">Edit Profile</h6>
                        <p className="mb-0 font-size-12">
                          Modify your personal details.
                        </p>
                      </div>
                    </div>
                  </Link>
                  <Link
                    to="/user/profile"
                    //target="_self"
                    className="iq-sub-card iq-bg-info-hover"
                  >
                    <div className="media align-items-center">
                      <div className="rounded iq-card-icon iq-bg-info">
                        <i className="ri-account-box-line" />
                      </div>
                      <div className="media-body ml-3">
                        <h6 className="mb-0 ">Account settings</h6>
                        <p className="mb-0 font-size-12">
                          Manage your account parameters.
                        </p>
                      </div>
                    </div>
                  </Link>

                  <div className="d-inline-block w-100 text-center p-3">
                    <button
                      className="bg-primary iq-sign-btn"
                      href="sign-in.html"
                      role="button"
                      onClick={() => {
                        props.logout(props.history);
                      }}
                    >
                      Sign out
                      <i className="ri-login-box-line ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  navbarOpen: state.app.navbarOpen,
  user: state.auth.user,
});

export default connect(mapStateToProps, { toggleNavbar, logout })(
  withRouter(Topbar)
);
