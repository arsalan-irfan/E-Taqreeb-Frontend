import React, { useState, useEffect } from "react";
import About from "./About";
import Package from "./Packages";
import Photos from "./Photos";
import Desc from "./Description";
import TabNavigation from "../../components/TabNavigation/TabNavigation";
import axios from "axios";
import NotFoundPage from "../../Error/Error";
import "react-chat-widget/lib/styles.css";
import { successAlert, errorsAlert } from "../../actions/alert";
import { fetchAllPhotographers } from "../../actions/photographer";
import { connect } from "react-redux";

const Index = (props) => {
  const { id } = props.match.params;
  const [loading, setLoading] = useState(true);
  const [photographer, setPhotographer] = useState({});
  const domain = "https://e-taqreeb-api.herokuapp.com";



  const config = {
    headers: {
      "x-auth-token": localStorage.token,
    },
  };

  const getLawnDetail = async (id) => {
    try {
      let res = await axios.get(`${domain}/photographer/${id}`, config);
      if (res.data.photographer) {
        setPhotographer(res.data.photographer);        
      
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
        `${domain}/photographer/review/${id}`,
        { comment, rating },
        config
      );
      if (res.data.photographer) {
        setPhotographer(res.data.photographer);
        props.fetchAllPhotographers()
        successAlert("Review Added Successfully");
      }
    } catch (error) {
      console.log(error.response);
      errorsAlert([{ error: "Error while submitting review." }]);
    }
  };
  const updateReview = async ({ comment, rating }) => {
    try {
      let res = await axios.put(
        `${domain}/photographer/review/${id}`,
        { comment, rating },
        config
      );
      if (res.data.photographer) {
        setPhotographer(res.data.photographer);
        props.fetchAllPhotographers()
        successAlert("Review Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      errorsAlert([{ error: "Error while updating review." }]);
    }
  };
  const deleteReview = async () => {
    try {
      let res = await axios.delete(`${domain}/photographer/review/${id}`, config);
      if (res.data.photographer) {
        setPhotographer(res.data.photographer);
        props.fetchAllPhotographers()
        successAlert("Review Deleted Successfully");
      }
    } catch (error) {
      console.log(error);
      errorsAlert([{ error: "Error Deleting submitting review." }]);
    }
  };

  useEffect(() => {
    getLawnDetail(id);
    if (photographer && photographer._id) {
      
    }
  }, []);

  return (
    <div className="container">
      {!loading && photographer._id ? (
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
                        src={photographer.logo}
                        alt=""
                      />
                      </div>
                    </div>
                    <div className=" text-center ">
                      <div className="profile-detail">
                        <h3 className>{photographer.company} </h3>
                      </div>
                    </div>
                    <div className="profile-info p-4 d-flex align-items-center justify-content-between position-relative">
                      <div className="social-links">
                        <ul className="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0">
                         
                          <li>
                          <button type="button"                              
                          onClick={()=>{props.history.push(`/user/chat?businessType=photographer&bid=${photographer._id}`)}}
                          className="btn btn-primary rounded-pill"><i className="ri-send-plane-line"></i>Chat</button>
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
              <Desc
                lawn={photographer}
                addReview={addReview}
                updateReview={updateReview}
                deleteReview={deleteReview}
                userId={props.user._id}
              />
            }
            name2="Packages"
            component2={<Package lawn={photographer} />}
            name3="Photos"
            component3={<Photos lawn={photographer} />}
            name4="About"
            component4={<About lawn={photographer} />}
          />
        </React.Fragment>
      ) : (
        <div />
      )}
      {!photographer._id && !loading ? (
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

export default connect(mapStateToProps,{fetchAllPhotographers})(Index);
