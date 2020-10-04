import React, { useState } from "react";
import Comment from "../../components/Comments/Comments";
import ReviewModal from "../../components/Comments/ReviewModal";

const LawnDescription = (props) => {
  const [showModal, setShowModal] = useState(false);
  const onCloseHandler = () => {
    setShowModal(false);
    setIsUpdate(false);
    setUpdateData({});
  };
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const updateHandler = (index) => {
    setIsUpdate(true);
    setUpdateData(props.lawn.reviews[index]);
    setShowModal(true);
  };
  const checkIsReviewed = () => {
    let index = props.lawn.reviews.findIndex((obj) => {
      return obj.user._id == props.userId;
    });
    return index
  };

  return (
    <div className="iq-card">
      <div className="iq-card-body">
        <h2>Description:</h2>
        <div>
          <p>{props.lawn.description}</p>
        </div>
      </div>
      <div className="iq-card-body">
        <h2>Ratings and comments</h2>
        {checkIsReviewed()===-1 ? (
          <button
            type="button"
            class="btn btn-primary rounded-pill mb-3"
            onClick={() => setShowModal(true)}
          >
            Add Review
          </button>
        ) : (
          <span></span>
        )}
        <Comment
          updateHandler={updateHandler}
          reviews={props.lawn.reviews}
          deleteReview={props.deleteReview}
        />
        <ReviewModal
          show={showModal}
          onCloseHandler={onCloseHandler}
          addReview={props.addReview}
          updateData={updateData}
          isUpdate={isUpdate}
          updateReview={props.updateReview}
        />
      </div>
    </div>
  );
};

export default LawnDescription;
