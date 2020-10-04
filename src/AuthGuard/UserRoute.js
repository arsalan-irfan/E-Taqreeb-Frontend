import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../utils/setAuthToken";
import { connect } from "react-redux";

const PrivateRoute = ({
  component: Component,
  path: Path,
  type,
  offline,
  ...rest
}) => {
  console.log("Type in route:", type);
  return (
    <Route
      {...rest}
      render={(props) =>
        !offline && isLogin() && type==="user" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};
const mapStateToProps = (state) => ({
  type: state.auth.type,
  offline: state.app.offline,
});
export default connect(mapStateToProps)(PrivateRoute);
