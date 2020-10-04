import React from "react";
import { connect } from "react-redux";
import { deleteImage } from "../../actions/lawn";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
function ImageGallery(props) {
  const deleteImage = (id) => {
    props.deleteImage(id);
  };
  return (
    <div className="iq-card">
      <div className="iq-card-header">
        <DashboardHeader heading="Image Settings" />
      </div>
      <div className="iq-card-body">
        <div className="row">
          {props.business.images && props.business.images.length > 0 ? (
            props.business.images.map((image, index) => {
              return (
                <div
                  className="col-sm-6 col-md-4 col-lg-4 "
                  style={{ padding: 10 }}
                  key={index}
                >
                  <div className="user-images position-relative overflow-hidden">
                    <img
                      src={image.url}
                      className="img-fluid rounded"
                      alt="Responsive image"
                      style={{ height: "100%", width: "100%" }}
                    />

                    <button
                      onClick={(e) => {
                        deleteImage(image._id);
                      }}
                      className="image-edit-btn"
                      data-toggle="tooltip"
                      data-placement="top"
                      title=""
                      data-original-title="Remove"
                    >
                      <b>X</b>
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <h3>Please Add Images Of Your Lawn/Banquet</h3>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  business: state.auth.business,
});

export default connect(mapStateToProps, { deleteImage })(ImageGallery);
