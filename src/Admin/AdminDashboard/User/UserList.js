import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchUsers, changeBlockStatusUser } from "../../../actions/admin";
function UserList({ fetchUsers, users, changeBlockStatusUser }) {
  
  useEffect(() => {
    fetchUsers(localStorage.getItem('token'));
  }, [fetchUsers]);
  //console.log(users);
  if (users == null) {
    //console.log("user is null");
    return (
      <div class="spinner-grow" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    );
  } else {
    return (
      <div id="content-page" className="content-page">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="iq-card">
                <div className="iq-card-header d-flex justify-content-between">
                  <div className="iq-header-title">
                    <h4 className="card-title">List of Users</h4>
                  </div>
                </div>
                <div className="iq-card-body">
                  <ul className="request-list list-inline m-0 p-0">
                    {users.map((user, key) => {
                      return (
                        <li className="d-flex align-items-center">
                          <div className="user-img img-fluid">
                            <img
                              src={user.imageURL}
                              alt="story-img"
                              className="rounded-circle avatar-40"
                            />
                          </div>
                          <div className="media-support-info ml-3">
                            <h6>{user.name}</h6>
                            <p className="mb-0">
                              {user.businessUser
                                ? "business User"
                                : "casual User"}
                            </p>
                          </div>
                          <div className="d-flex align-items-center">
                            <button
                              onClick={() => {changeBlockStatusUser(user._id, user.isBlock)}}
                              className="mr-3 btn btn-danger rounded"
                            >
                              Block
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.admin.users,
});
export default connect(mapStateToProps, { fetchUsers, changeBlockStatusUser })(UserList);
