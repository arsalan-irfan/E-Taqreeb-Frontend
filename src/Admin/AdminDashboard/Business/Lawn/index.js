import React from "react";

import LawnList from "./LawnList";
import LawnCharts from "./LawnCharts";
import TabNavigation from "../../../../components/TabNavigation/TabNavigation";
import Future from "./Future";

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
                  <h3 className="text-white">Lawn List</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LawnList/>
    </div>
  );
};

export default index;
