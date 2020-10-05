import React, { useState, useEffect } from "react";
import LawnAbout from "./LawnAbout";
import LawnPackage from "./LawnPackage";
import LawnPhotos from "./LawnPhotos";
import LawnDesc from "./LawnDescription";
import TabNavigation from "../../../components/TabNavigation/TabNavigation";
import axios from "axios";
import NotFoundPage from "../../../Error/Error";
import "react-chat-widget/lib/styles.css";
import { successAlert, errorsAlert } from "../../../actions/alert";
import { fetchAllLawns } from "../../../actions/lawn";
import { connect } from "react-redux";

const Index = (props) => {
  const { id } = props.match.params;
  const [loading, setLoading] = useState(true);
  const [lawn, setLawn] = useState({});
  const domain = "https://e-taqreeb-api.herokuapp.com";

  const config = {
    headers: {
      "x-auth-token": localStorage.token,
    },
  };

  const getLawnDetail = async (id) => {
    try {
      let res = await axios.get(`${domain}/lawn/${id}`, config);
      if (res.data.lawn) {
        setLawn(res.data.lawn);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      errorsAlert([{ error: "Error while Fetching review." }]);
    }
  };
  const addReview = async ({ comment, rating }) => {
    try {
      let res = await axios.post(
        `${domain}/lawn/review/${id}`,
        { comment, rating },
        config
      );
      if (res.data.lawn) {
        setLawn(res.data.lawn);
        props.fetchAllLawns();
        successAlert("Review Added Successfully");
      }
    } catch (error) {
      console.log(error);
      errorsAlert([{ error: "Error while submitting review." }]);
    }
  };
  const updateReview = async ({ comment, rating }) => {
    try {
      let res = await axios.put(
        `${domain}/lawn/review/${id}`,
        { comment, rating },
        config
      );
      if (res.data.lawn) {
        setLawn(res.data.lawn);
        props.fetchAllLawns();
        successAlert("Review Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      errorsAlert([{ error: "Error while updating review." }]);
    }
  };
  const deleteReview = async () => {
    try {
      let res = await axios.delete(`${domain}/lawn/review/${id}`, config);
      if (res.data.lawn) {
        setLawn(res.data.lawn);
        props.fetchAllLawns();
        successAlert("Review Deleted Successfully");
      }
    } catch (error) {
      console.log(error);
      errorsAlert([{ error: "Error Deleting submitting review." }]);
    }
  };

  useEffect(() => {
    getLawnDetail(id);
    if (lawn && lawn._id) {
    }
  }, []);

  return (
    <div className="container">
      {!loading && lawn._id ? (
        <React.Fragment>
          <div className="row">
            <div className="col-sm-12">
              <div className="iq-card ">
                <div className="iq-card-body profile-page p-0 ">
                  <div className="profile-header">
                    <div className="cover-container">
                    <div className="media-support-user-img mr-6 d-flex  justify-content-center ">
                      <img
                        className="rounded-circle img-fluid"
                        src={lawn.logo}
                        alt=""
                      />
                      </div>
                    </div>
                    <div className=" text-center ">
                      <div className="profile-detail">
                        <h3 className>{lawn.company} </h3>
                      </div>
                    </div>
                    <div className="profile-info p-4 d-flex align-items-center justify-content-between position-relative">
                      <div className="social-links">
                        <ul className="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0">
                          <li>
                            <button
                              type="button"
                              className="btn btn-primary rounded-pill"
                              onClick={() => {
                                props.history.push(
                                  `/user/chat?businessType=lawn&bid=${lawn._id}`
                                );
                              }}
                            >
                              <i className="ri-send-plane-line"></i>Chat
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <TabNavigation
            hidebanner={true}
            name1="Description"
            component1={
              <LawnDesc
                lawn={lawn}
                addReview={addReview}
                updateReview={updateReview}
                deleteReview={deleteReview}
                userId={props.user._id}
              />
            }
            name2="Packages"
            component2={<LawnPackage lawn={lawn} />}
            name3="Photos"
            component3={<LawnPhotos lawn={lawn} />}
            name4="About"
            component4={<LawnAbout lawn={lawn} />}
          />
        </React.Fragment>
      ) : (
        <div />
      )}
      {!lawn._id && !loading ? (
        <NotFoundPage
          message={"Oops! The Lawn was not found !"}
          subMessage={"Invalid id was typed in the url ."}
        />
      ) : (
        <div />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { fetchAllLawns })(Index);
