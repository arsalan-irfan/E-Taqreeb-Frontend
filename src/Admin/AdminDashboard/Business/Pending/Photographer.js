import React, { useState, useEffect } from "react";
import {connect} from 'react-redux'
import {fetchPendingPhotographers,  fetchSelectedPhotographer} from '../../../../actions/admin'

import { Link, Redirect } from "react-router-dom";
const Photographer = ({fetchPendingPhotographers, photographers, fetchSelectedPhotographer, selectedPhotographer}) => {
  useEffect(() => {
    fetchPendingPhotographers();
    
  }, [fetchPendingPhotographers])
  
 
  // const openFormClicked = (id) => {
  //   console.log('open form clicked')
    
  
  // }
  if(selectedPhotographer!=null){
    console.log('re rendered')
  return <Redirect  to="/admin/approvalForm"/>}

  console.log(photographers)
  if(photographers.length>0){
  return (
    <div className="iq-card">
      <div className="iq-card-body">
        <ul className="request-list list-inline m-0 p-0">
          {" "}
          {
          photographers.map((photographer, key) => {
            return (
              <li className="d-flex align-items-center">
            


                <div className="media-support-info ml-3">
                  <h6> {photographer.company} </h6> <p className="mb-0"> {photographer.createdAt} </p>{" "}
                </div>{" "}
                <Link to="/admin/pendingPhotographer" className="d-flex align-items-center" 
                onClick={()=>{fetchSelectedPhotographer(photographer._id)}}
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
  photographers: state.admin.photographers,
  selectedphotographer: state.admin.selectedPhotographer
})

export default connect(mapStateToProps,{fetchPendingPhotographers, fetchSelectedPhotographer})(Photographer);
