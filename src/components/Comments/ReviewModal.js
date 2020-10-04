import React, { useState, useEffect } from "react";
import Rating from "@material-ui/lab/Rating";

export default function ReviewModal(props) {
  const [reviewData, setReviewData] = useState({
    comment: "",
    rating: 1,
  });

  const onSubmitHandler = () => {
    let { comment, rating } = reviewData;
    if (props.isUpdate) {
      props.updateReview({ comment, rating });
    } else {
      props.addReview({ comment, rating });
    }

    props.onCloseHandler();
    setReviewData({
      comment: "",
      rating: "",
    });
  };
  useEffect(() => {
    if (props.isUpdate) {
      setReviewData(props.updateData);
    }
  }, [props.show]);

  return (
    <div
      className={`modal fade ${props.show ? "show" : ""}`}
      id="exampleModalCenter"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden={!props.show}
      aria-modal={props.show}
      style={{ display: props.show ? "block" : "none", paddingRight: 8 }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalCenterTitle">
              Add Your Review
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => props.onCloseHandler()}
            >
              ×
            </button>
          </div>

          <div className="modal-body">
            <form
              className="comment-text d-flex align-items-center mt-3"
              action="javascript:void(0);"
            >
              <textarea
                className="form-control rounded"
                placeholder="Write your review here...."
                onChange={(e) => {
                  setReviewData({ ...reviewData, comment: e.target.value });
                }}
                value={reviewData.comment}
              ></textarea>
            </form>
            <Rating
              value={reviewData.rating}
              onChange={(e) => {
                setReviewData({ ...reviewData, rating: e.target.value });
              }}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={() => props.onCloseHandler()}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onSubmitHandler}
              disabled={!reviewData.comment ? true : false}
            >
              {props.isUpdate?"Update":"Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
