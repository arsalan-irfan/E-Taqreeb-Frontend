import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "../Navbars/Navbar";
import TopBar from "../Navbars/Topbar";
import routes from "../routes/user";
import { connect } from "react-redux";
import { loadUser } from "../actions/auth";
import { fetchAllLawns } from "../actions/lawn";
import { fetchAllPhotographers } from "../actions/photographer";

const User = (props) => {
  React.useEffect(() => {
    props.loadUser();
    props.fetchAllLawns();
    props.fetchAllPhotographers();
  }, []);
  const switchRoutes = (
    <Switch>
      {routes.map((prop, key) => {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
            exact
          />
        );
      })}
      <Redirect from="/user" to="/user/dashboard" />
    </Switch>
  );
  const sidebarRoutes = routes.filter((route) => {
    return route.sidebarItem === true;
  });
  return (
    <React.Fragment>
      <div className="iq-sidebar">
        <Navbar routes={sidebarRoutes} />
      </div>
      {/* TOP Nav Bar */}
      <div className="iq-top-navbar">
        <div className="iq-navbar-custom">
          <TopBar />
        </div>
      </div>
      <div id="content-page" className="content-page">
        {/* <SocialLoginModal /> */}
        {switchRoutes}
      </div>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  loadUser,
  fetchAllLawns,
  fetchAllPhotographers,
})(User);
