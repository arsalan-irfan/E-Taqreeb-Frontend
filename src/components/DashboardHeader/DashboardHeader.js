import React from "react";
import { connect } from "react-redux";
import { publishLawn } from "../../actions/lawn";
function DashboardHeader(props) {
  const onChangeHandler = () => {
    props.publishLawn();
  };
  return (
    <div>
      <div className="row">
       
        <div className="col-8">
          <h3>{props.heading}</h3>
        </div>
        <div className="col-4">
          <div className="float-right">
            <span>
              <b>Publish:</b>
            </span>
            <label className="switch">
              <input
                type="checkbox"
                onChange={onChangeHandler}
                checked={props.business.publish}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  business: state.auth.business,
});
export default connect(mapStateToProps, { publishLawn })(DashboardHeader);
