import React, { useState } from "react";
import  BookingModal  from "../BookingModal/BookingModal";
import subDays from "date-fns/subDays";

const PackageCard = (props) => {
  const [modal, showModal] = useState(false);
  
  const { _id,title, price, capacity, advance, timeFrom, timeTo, lawn_id } = props.data;
  console.log("package card:", title);
  const onHide = () => {
    showModal(false);
  };
  //console.log('detailsa rearaera:',title, price, capacity, advance, timeFrom, timeTo)
  return (
    <div>
      <BookingModal show={modal} onHide={onHide} packageId={_id} lawnId={lawn_id} index={props.index} details={props.data}/>
     
      <div className="col-lg-4 col-md-6 col-sm-12">
        <div className="iq-card" style={{ minWidth: "300px" }}>
          <div className="iq-card-body border text-center rounded">
            <span className="font-size-16 text-uppercase font-weight-bolder">
              {title}
            </span>
            <h4 className="mb-4 display-5 font-weight-bolder ">
              {price}Pkr
              {/* <small className="font-size-14 text-muted">/ session</small> */}
            </h4>
            <ul className="list-unstyled line-height-4 mb-0">
              <li>Capacity:{capacity}</li>
              <li>Advance:{advance}Pkr</li>
              <li>
                duration:{timeFrom} - {timeTo}
              </li>
            </ul>

            <button
              className="btn btn-primary mt-5"
              onClick={() => {
                showModal(true);
              }}
              disabled={props.loadingDeleteBtn}
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
