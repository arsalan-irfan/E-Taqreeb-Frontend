import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = (props) => {

  let links = props.routes.map((route, index) => {
    return (
      <li className="active" key={index}>
        <Link to={route.layout+route.path} className="iq-waves-effect">
          <i className={route.icon} />
        <span>{route.name}</span>
        </Link>
      </li>
    );
  })
  return (
    <div id="sidebar-scrollbar">
      <nav className="iq-sidebar-menu">
        <ul id="iq-sidebar-toggle" className="iq-menu">
          {links}
        </ul>
      </nav>
      <div className="p-3"></div>
    </div>
  );
};

Navbar.propTypes = {};

export default Navbar;
