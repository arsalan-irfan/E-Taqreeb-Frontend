import React, { useState, useEffect } from "react";
import { fetchPhotographers, changeBlockStatusPhotographer } from "../../../../actions/admin";
import { connect } from "react-redux";
import history from "../../../../history";
const PhotographerList = ({ photographers, fetchPhotographers, changeBlockStatusPhotographer}) => {
  useEffect(() => {
    fetchPhotographers(localStorage.getItem('token'));
  }, [fetchPhotographers]);
  console.log("re rendered!");
  

  return (
    <div id="content-page" className="content-page">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="iq-card">
              <div className="iq-card-body">
                <div className="table-responsive">
                  <table
                    id="datatable"
                    className="table table-striped table-bordered"
                  >
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Business Email</th>
                        <th>Block Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {photographers.map((photographer, key) => {
                        return (
                          <tr
                           
                          >
                            <td>{photographer.company}</td>
                            <td>{photographer.phone}</td>
                            <td>{photographer.businessEmail}</td>
                            <td>{photographer.isBlock ? "true" : "false"}</td>
                            {photographer.isBlock ? (
                              <td>
                                <button
                                  onClick={() => {
                                    changeBlockStatusPhotographer(
                                      photographer._id,
                                      photographer.isBlock
                                    );
                                  }}
                                  className="btn btn-success"
                                >
                                  UnBlock
                                </button>
                              </td>
                            ) : (
                              <td>
                                <button
                                  onClick={() => {
                                    changeBlockStatusPhotographer(
                                      photographer._id,
                                      photographer.isBlock
                                    );
                                  }}
                                  className="btn btn-danger"
                                >
                                  Block
                                </button>
                              </td>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
PhotographerList.propTypes = {};
const mapStateToProps = (state) => ({
  photographers: state.admin.photographers,
});

export default connect(mapStateToProps, { fetchPhotographers, changeBlockStatusPhotographer })(
  PhotographerList
);
