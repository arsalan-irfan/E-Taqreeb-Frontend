import React from "react";
import Rating from "@material-ui/lab/Rating";
import { Link } from "react-router-dom";

const CardComponent = (props) => {
  const { name, desc, image } = props;
  let description
  if(desc && desc.length>30){
    description=desc.substring(0,30)+"...."
  }else{
    description=desc
  }

  return (
    <div className="iq-card" >
      {/* <div className="top-bg-image">
          <img src={image} className="img-fluid w-100" alt="group-bg" />
        </div>  
        without borders ^
        */}
      <div className="iq-card-body text-center">
        <div className="top-bg-image">
          <img src={image} className="w-100" style={{height:200}} alt="group-bg" />
        </div>
        <div className="group-info pt-3 pb-3">
          <h4>{name}</h4>
          <p>{description}</p>
        </div>
        <div className="group-details d-inline-block pb-3">
          <ul className="d-flex align-items-center justify-content-between list-inline m-0 p-0">
            {/* <li className="pl-3 pr-3">
                  <p className="mb-0">Post</p>
                  <h6>300</h6>
                </li> */}
            <li className="pl-3 pr-3">
              <Rating name="read-only" value={props.data&&props.data.currentRating?props.data.currentRating:0} readOnly />
              {/* <h6>1000</h6> */}
            </li>
            
          </ul>
        </div>
        <Link to={props.detailUrl}>
          <button type="submit" className="btn btn-primary d-block w-100">
            View
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CardComponent;
