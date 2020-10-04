import React from "react";

const LawnAbout = (props) => {
  let { owner, businessEmail, phone, address, city } = props.lawn;
  return (
    <div className="iq-card">
      <div className="iq-card-body">
        <div className="col-md-9 pl-4">
          <div className="tab-content">
            <div
              className="tab-pane fade active show"
              id="basicinfo"
              role="tabpanel"
            >
              <h4>Contact Information</h4>
              <hr />
              <div className="row">
                <div className="col-3">
                  <h6>Owner</h6>
                </div>
                <div className="col-9">
                  <p className="mb-0">{owner}</p>
                </div>
                <div className="col-3">
                  <h6>Email</h6>
                </div>
                <div className="col-9">
                  <p className="mb-0">{businessEmail}</p>
                </div>
                <div className="col-3">
                  <h6>Mobile</h6>
                </div>
                <div className="col-9">
                  <p className="mb-0">{phone}</p>
                </div>
                <div className="col-3">
                  <h6>Address</h6>
                </div>
                <div className="col-9">
                  <p className="mb-0">{address}</p>
                </div>
              </div>
             
              <h4 className="mt-3">Basic Information</h4>
              <hr />
              <div className="row">
                <div className="col-3">
                  <h6>City:</h6>
                </div>
                <div className="col-9">
                  <p className="mb-0">{city}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawnAbout;
