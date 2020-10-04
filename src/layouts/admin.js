import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "../Navbars/Navbar";
import TopBar from "../Navbars/Topbar";
import routes from "../routes/admin";

function Admin() {
  const switchRoutes = (
    <Switch>
      {routes.map((prop, key) => {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
            exact
          ></Route>
        );
      })}
      {/* <Redirect from="/user" to="/user/dashboard" /> */}
    </Switch>
  );
  //React.useEffect(() => {}, []);
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
        {switchRoutes}
      </div>
    </React.Fragment>
  );
}

export default Admin;
