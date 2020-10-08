import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Modal from "react-bootstrap/Modal";
import subDays from "date-fns/subDays";
import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { requestLawn } from "../../actions/lawn";

const BookingModal = (props) => {
  console.log("dates", props.dates);
  const [index, setIndex] = useState(props.index);
  const [startDate, setStartDate] = useState(new Date());
  var d = [];
  const handleChange = date => setStartDate(date);
  console.log('selected date is:', startDate)
  const requestBooking = () => {
    // console.log('request booking clicked',props.userId,props.lawnId, props.packageId, startDate)
   
    requestLawn(props.userId, props.lawnId, props.packageId, startDate);
  };
  //console.log('excluded dates:', props.dates)
  // console.log('current Date:', new Date(props.dates[0]))
  //  const addDates = ( )=> {
  props.dates.map((date, index) => {
    console.log(date);

    // setDates(Dates.concat())

    d.push(new Date(date));
    //new Date().toLocaleDateString('en-US')
  });
  console.log("final dates are:", d);
  console.log(new Date(props.dates[0]));
  // }
  console.log("details are:", props.details);
  const {
    title,
    price,
    capacity,
    advance,
    timeFrom,
    timeTo,
    description,
  } = props.details;

  return (
    <Modal
      {...props}
      size="md"
      //    aria-labelledby="contained-modal-title-vcenter"
      centered={true}
      //  scrollable={true}
    >
      <Modal.Body>
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="iq-card text-center" style={{ minWidth: "300px" }}>
            <div className="iq-card-body text-center rounded">
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
                <li>desctiption: {description}</li>
              </ul>

              <h4 className="mb-4 display-5 font-weight-bolder ">
                Pick a Lawn date 
              </h4>
{console.log('excluding dates are:',d)}
              <div className="mb-4 text-center">
                <DatePicker
                  selected={startDate}
                  value={startDate}
                  onChange={handleChange}
                  excludeDates={d}
                 // placeholderText="Select a date other than today or yesterday"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="text-center">
        <button
          className="btn btn-primary btn-lg text-center"
          onClick={() => {
            requestBooking();
          }}
        >
          Request Booking
        </button>
      </Modal.Footer>
    </Modal>
  );
};
const mapStateToProps = (state, ownProps) => ({
  userId: state.auth.user._id,
  dates: 
    state.auth.business?
    state.auth.business.packages[ownProps.index]
    ? state.auth.business.packages[ownProps.index].date
    : []:[],
});
export default connect(mapStateToProps, { requestLawn })(BookingModal);
