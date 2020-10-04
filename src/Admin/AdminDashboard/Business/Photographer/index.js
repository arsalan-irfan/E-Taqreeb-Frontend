import React from "react";
import PropTypes from "prop-types";

import TabNavigation from "../../../../components/TabNavigation/TabNavigation";
import Future from "./Future";
import PhotographerList from "./PhotographerList";
import PhotographerCharts from "./PhotographerCharts";
const index = (props) => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="iq-card">
              <div
                className="iq-card position-relative inner-page-bg bg-primary"
                style={{ height: "150px" }}
              >
                <div className="inner-page-title">
                  <h3 className="text-white">Photographer List</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PhotographerList/>
    </div>
  );
};

export default index;
