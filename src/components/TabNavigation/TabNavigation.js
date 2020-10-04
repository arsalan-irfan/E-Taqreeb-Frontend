import React, { useState } from "react";

const TabNavigation = (props) => {
  const [list, setList] = useState(0);

  const openList = (event, type) => {
    setList(type);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <div className="iq-card">
            {/* <div className="iq-card-header d-flex justify-content-between">
              <div className="iq-header-title">
                <h4 className="card-title">{props.title}</h4>
              </div>
            </div> */}
            {props.hidebanner ? null : (
              <div
                className="iq-card position-relative inner-page-bg bg-primary"
                style={{ height: "150px" }}
              >
                <div className="inner-page-title">
                  <h3 className="text-white">{props.title}</h3>
                </div>
              </div>
            )}

            <div className="iq-card-body">
              <ul className="nav nav-pills mb-3 nav-fill">
                <li className="nav-item">
                  <div
                    onClick={(e) => openList(e, 0)}
                    className={`nav-link ${list === 0 ? "active" : ""}`}
                  >
                    {props.name1}
                  </div>
                </li>
                <li className="nav-item">
                  <div
                    onClick={(e) => openList(e, 1)}
                    className={`nav-link ${list === 0 ? "active" : ""}`}
                  >
                    {props.name2}
                  </div>
                </li>
                {props.name3 ? (
                  <li className="nav-item">
                    <div
                      onClick={(e) => openList(e, 2)}
                      className={`nav-link ${list == 0 ? "active" : ""}`}
                    >
                      {props.name3}
                    </div>
                  </li>
                ) : null}
                {props.name4 ? (
                  <li className="nav-item">
                    <div
                      onClick={(e) => openList(e, 3)}
                      className={`nav-link ${list == 0 ? "active" : ""}`}
                    >
                      {props.name4}
                    </div>
                  </li>
                ) : null}
              </ul>
            </div>
            <div className="iq-card">
              <div className="tab-content" id="pills-tabContent-1">
                <div
                  className="tab-pane fade show active"
                  style={{ display: list === 0 ? "block" : "none" }}
                >
                  <React.Fragment>{props.component1}</React.Fragment>
                </div>
                <div
                  className="tab-pane fade show active"
                  style={{ display: list === 1 ? "block" : "none" }}
                >
                  <React.Fragment>{props.component2}</React.Fragment>
                </div>
                {props.component3 ? (
                  <div
                    className="tab-pane fade show active"
                    style={{ display: list == 2 ? "block" : "none" }}
                  >
                    <React.Fragment>{props.component3}</React.Fragment>
                  </div>
                ) : null}
                {props.component4 ? (
                  <div
                    className="tab-pane fade show active"
                    style={{ display: list == 3 ? "block" : "none" }}
                  >
                    <React.Fragment>{props.component4}</React.Fragment>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;
