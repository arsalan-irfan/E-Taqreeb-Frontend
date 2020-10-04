import React, { useState, useEffect } from "react";
import { fetchLawns, changeBlockStatusLawn } from "../../../../actions/admin";
import { connect } from "react-redux";
import history from "../../../../history";
const LawnList = ({ lawns, fetchLawns, changeBlockStatusLawn }) => {
  useEffect(() => {
    fetchLawns(localStorage.getItem('token'));
  }, [fetchLawns]);
 

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
                      {lawns.map((lawn, key) => {
                        return (
                          <tr
                           
                          >
                            <td>{lawn.company}</td>
                            <td>{lawn.phone}</td>
                            <td>{lawn.businessEmail}</td>
                            <td>{lawn.isBlock ? "true" : "false"}</td>
                            {lawn.isBlock ? (
                              <td>
                                <button
                                  onClick={() => {
                                    changeBlockStatusLawn(
                                      lawn._id,
                                      lawn.isBlock
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
                                    changeBlockStatusLawn(
                                      lawn._id,
                                      lawn.isBlock
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
LawnList.propTypes = {};
const mapStateToProps = (state) => ({
  lawns: state.admin.lawns,
});

export default connect(mapStateToProps, { fetchLawns, changeBlockStatusLawn })(
  LawnList
);
