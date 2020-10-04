import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../utils/setAuthToken";
import { connect } from "react-redux";
const PublicRoute = ({ component: Component, restricted, type,offline, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !offline?(isLogin() && restricted && (type === "user" || type === "admin") ? (
          type !== "admin" ? (
            <Redirect to="/user" />
          ) : (
            <Redirect to="/admin" />
          )
        ) : Component === null ? null : (
          <Component {...props} />
        )):<Redirect to="/no-internet" />
      }
    />
  );
};

const mapStateToProps = state =>({
  type: state.auth.type,
  offline: state.app.offline,
});

export default connect(mapStateToProps)(PublicRoute);
