import React from "react";

export default function ChatMessage(props) {
  return (
    <div className={props.isSender?"chat":"chat chat-left"}>
      <div className="chat-user">
        <a className="avatar m-0">
          <img
            src={props.image}
            alt="avatar"
            className="avatar-35 "
          />
        </a>
      </div>
      <div className="chat-detail">
        <div className="chat-message">
            <p>{props.message}</p>
        </div>
      </div>
    </div>
  );
}
