import React from "react";
import Rating from "@material-ui/lab/Rating";
import { connect } from "react-redux";
function CommentCard(props) {
  const { user, rating, comment } = props.data;
  return (
    <div>
      <div className="user-post-data">
        <div className="d-flex flex-wrap">
          <div className="media-support-user-img mr-3">
            <img
              className="rounded-circle img-fluid"
              src={user.imageURL}
              alt=""
            />
          </div>
          <div className="media-support-info mt-2">
            <h5 className="mb-0 d-inline-block">
              <span href="#" className>
                {user.name}
              </span>
            </h5>
            <p>
              <Rating name="read-only" value={rating} readOnly />
            </p>
          </div>
          <div className="iq-card-post-toolbar">
            <p className="mb-0 text-primary">6 hour ago</p>
            {/* Options */}
            {user._id == props.user._id ? (
              <div className="dropdown">
                <span
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  role="button"
                >
                  <i className="ri-more-fill" />
                </span>
                <div className="dropdown-menu m-0 p-0">
                  <div
                    className="dropdown-item p-3"
                    onClick={() => {
                      props.updateHandler(props.index);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="d-flex align-items-top">
                      <div className="icon font-size-20">
                        <i className="ri-save-line" />
                      </div>
                      <div className="data ml-2">
                        <p className="mb-0">Update Your Review.</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="dropdown-item p-3"
                    onClick={() => {
                      props.deleteReview();
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="d-flex align-items-top">
                      <div className="icon font-size-20">
                        <i className="ri-close-circle-line" />
                      </div>
                      <div className="data ml-2">
                        <p className="mb-0">Delete Your Review.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <span></span>
            )}
            {/* Options */}
          </div>
        </div>
      </div>
      <div className="mt-3">
        <p>{comment}</p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(CommentCard);
