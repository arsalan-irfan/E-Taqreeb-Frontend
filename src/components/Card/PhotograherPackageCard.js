import React from "react";

const PackageCard = (props) => {
  // const { desc } = props;
  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <div className="iq-card" style={{ minWidth: "300px" }}>
        <div className="iq-card-body border text-center rounded">
          <span className="font-size-16 text-uppercase font-weight-bolder">
            {props.data.title}
          </span>
          <h4 className="mb-4 display-5 font-weight-bolder ">
            {props.data.price}Pkr
            {/* <small className="font-size-14 text-muted">/ session</small> */}
          </h4>
          <ul className="list-unstyled line-height-4 mb-0">
            <li>Advance:{props.data.advance}Pkr</li>
            <li>No of Images:{props.data.noOfImages}</li>
            {props.data.videoLength?<li>Video Length:{props.data.videoLength}</li>:<li></li>}
          </ul>

          <button
            className="btn btn-primary mt-5"
            onClick={() => props.onEdit(props.index)}
            disabled={props.loadingDeleteBtn}
          >
            Update
          </button>
          <button
            className="btn btn-danger mt-5"
            onClick={() => {
              props.onDeletePackage(props.data._id);
            }}
            disabled={props.loadingDeleteBtn}
          >
            {props.loadingDeleteBtn ? "Deleting" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
