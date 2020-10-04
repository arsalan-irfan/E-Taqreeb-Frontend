import React from "react";

export default function AlertBox(props) {
  return (
    <div className="alert text-white bg-danger" role="alert">
      <div className="iq-alert-icon">
        <i className="ri-information-line"></i>
      </div>
      <div className="iq-alert-text">{props.message}!</div>
    </div>
  );
}
