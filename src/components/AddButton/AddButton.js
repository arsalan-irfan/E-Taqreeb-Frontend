import React from 'react'

const AddButton = (props) => {
    return (
      <div id="addBtn" className="addBtnWrapper">
        <button className="addbtn addBtnCircle"
        onClick={()=>{props.onClick()}}
        > 
          <img
            id="addSign"
            src="https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/2x/btw_ic_speeddial_white_24dp_2x.png"
            alt=""
          />
        </button>
      </div>
    );
  };

export default AddButton;