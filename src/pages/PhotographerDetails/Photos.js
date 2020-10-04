import React from "react";
const LawnPhotos = (props) => {
  return (
    <div className="iq-card">
      <div className="iq-card-body">
        <h2>Photos</h2>
        <div className="friend-list-tab mt-2">
          <div className="iq-card-body p-0">
            <div className="row">
              {props.lawn.images.map((imageObj) => {
                return (
                  <div className="col-md-6 col-lg-4 mb-3" key={imageObj._id}>
                    <div className="user-images position-relative overflow-hidden">
                      <img
                        src={imageObj.url}
                        className="img-fluid rounded"
                        alt="SAMPLE"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawnPhotos;
