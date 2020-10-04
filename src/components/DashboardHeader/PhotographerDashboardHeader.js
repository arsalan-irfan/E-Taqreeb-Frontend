import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { publishPhotographer } from "../../actions/photographer";
function DashboardHeader(props) {
  const [publish, setPublish] = useState(false);

  useEffect(() => {
    if (props.business && props.business.publish)
      setPublish(props.business.publish);
  }, [props.business]);

  const onChangeHandler = async (e) => {
    await props.publishPhotographer();
    if (props.business.publish != publish) {
      setPublish(!publish);
    }
  };
  console.log("PhotographerPublish",publish)
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
                checked={props.business.publish?props.business.publish:false}
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
export default connect(mapStateToProps, { publishPhotographer })(
  DashboardHeader
);
