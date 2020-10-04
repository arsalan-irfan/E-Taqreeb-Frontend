import React, { useState, useEffect } from "react";
import {connect} from 'react-redux'
import {fetchPendingLawns,  fetchSelectedLawn} from '../../../../actions/admin'

import { Link, Redirect } from "react-router-dom";
const Lawn = ({fetchPendingLawns, lawns, fetchSelectedLawn, selectedLawn}) => {
  useEffect(() => {
    fetchPendingLawns();
    
  }, [fetchPendingLawns])
  
 
  // const openFormClicked = (id) => {
  //   console.log('open form clicked')
    
  
  // }
  if(selectedLawn!=null){
    console.log('re rendered')
  return <Redirect  to="/admin/approvalForm"/>}

  console.log(lawns)
  if(lawns.length>0){
  return (
    <div className="iq-card">
      <div className="iq-card-body">
        <ul className="request-list list-inline m-0 p-0">
          {" "}
          {
          lawns.map((lawn, key) => {
            return (
              <li className="d-flex align-items-center">
            


                <div className="media-support-info ml-3">
                  <h6> {lawn.company} </h6> <p className="mb-0"> {lawn.createdAt} </p>{" "}
                </div>{" "}
                <Link to="/admin/pendingLawn" className="d-flex align-items-center" 
                onClick={()=>{fetchSelectedLawn(lawn._id)}}
                >
                  <div
                    href="javascript:void();"
                    className="mr-3 btn btn-primary rounded"
                  >
                    {" "}
                    Open{" "}
                  </div>{" "}
                </Link>
               
              </li>
            );
          })}
        </ul>{" "}
      </div>{" "}
    </div>
  );
        }
        else{
          return(
            <div className="iq-card">
            <div className="iq-card-body">
              <h4>No Pending Requests...</h4>
              </div>
              </div>
          )
        }
};
const mapStateToProps = state => ({
  lawns: state.admin.lawns,
  selectedLawn: state.admin.selectedLawn
})

export default connect(mapStateToProps,{fetchPendingLawns, fetchSelectedLawn})(Lawn);
