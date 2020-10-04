import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../utils/setAuthToken";
import { connect } from "react-redux";

const PrivateRoute = ({
  component: Component,
  path: Path,
  offline,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        offline ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};
const mapStateToProps = (state) => ({
  offline: state.app.offline,
});
export default connect(mapStateToProps)(PrivateRoute);
