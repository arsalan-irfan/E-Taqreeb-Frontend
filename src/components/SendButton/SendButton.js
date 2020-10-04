import React from 'react'

const SendButton = (props) => {
    return (
      <div id="sendBtn" className="sendBtnWrapper">
        <button className="sendbtn sendBtnCircle"
        onClick={()=>{props.onClick()}}
        > 
          <h6 style={{color:'white'}}><i className="ri-send-plane-fill" />Message</h6>
        </button>
      </div>
    );
  };

export default SendButton;