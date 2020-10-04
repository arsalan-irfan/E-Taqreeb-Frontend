import React from "react";

export default function RoomCard(props) {
  return (
    <div>
      <div className="m-3" style={{ cursor: "pointer" }}>
        <div className="d-flex align-items-center">
          <div className="avatar mr-2">
            <img
              src={props.data.imageURL}
              alt="chatuserimage"
              className="avatar-50 "
            />
            <span className="avatar-status">
              <i className="ri-checkbox-blank-circle-fill text-success" />
            </span>
          </div>
          <div className="chat-sidebar-name">
            <h6 className="mb-0">{props.data.name}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}
