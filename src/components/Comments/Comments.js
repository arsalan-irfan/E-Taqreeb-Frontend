import React from "react";
import CommentCard from "./CommentCard";

export default function Comments(props) {
  return (
    <div className="col-sm-12">
      <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
        <div className="iq-card-body">
          <div style={{ height: "50vh", overflow: "scroll" }}>
            {props.reviews.map((review,index) => {
              return <CommentCard key={review._id} data={review} index={index} updateHandler={props.updateHandler} deleteReview={props.deleteReview}/>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
