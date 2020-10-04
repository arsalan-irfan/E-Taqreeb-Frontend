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
        <span className="chat-time mt-1">6:53</span>
      </div>
      <div className="chat-detail">
        <div className="chat-message">
            <p>{props.message}</p>
        </div>
      </div>
    </div>
  );
}
