import React from "react";
import Package from "../../components/Card/PhotographerDetailPackageCard";
const LawnPackage = (props) => {
  console.log('lawn packages are:', props.lawn.packages)
  return (
    <div className="iq-card">
      <div className="iq-card-body">
        <h2>Packages</h2>
        <div>
          <div className="container">
            <div className="card-container">
              {props.lawn.packages.map((obj, index) => {
                return <Package data={obj} key={obj._id} index={index}/>;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawnPackage;
