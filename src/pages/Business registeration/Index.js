import React, { useEffect,useState } from "react";
import {connect} from "react-redux";
import Pending from "./Pending";
import AlreadyRegistered from "./AlreadyRegistered";
import BusinessRegister from "./BusinessRegister";

function Index(props) {
    const [content,setContent] = useState(<BusinessRegister />)
    useEffect(() => {
    if (props.user && props.user.businessPending) {
      setContent(<Pending />)
    }
    if (props.user && props.user.businessUser) {
      console.log("AlreadyRegistered")
        setContent(<AlreadyRegistered />)
    }
  }, [props.user]);
  return <div>
      {content}
  </div>;
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Index);
