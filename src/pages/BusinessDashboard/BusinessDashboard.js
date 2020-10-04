import React from "react";
import { connect } from "react-redux";
import LawnDashboard from "../LawnDashboard";
import PhotographerDashboard from "../PhotographerDashboard/";
import ErrorPage from "../../Error/Error";

function BusinessDashboard(props) {
  return (
    <div>
      {props.user && !props.user.business ? (
        <ErrorPage
          message={"Business Not Found !"}
          subMessage={
            "You haven't Register your business or your business is not approved !"
          }
        />
      ) : null}
      {props.user && props.user.business && props.user.business.category === "1" ? (
        <LawnDashboard />
      ) : (
        <div />
      )}
      {props.user && props.user.business && props.user.business.category === "2" ? (
        <PhotographerDashboard />
      ) : (
        <div />
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(BusinessDashboard);
