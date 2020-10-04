import React,{useState} from 'react'
import { changeBlockStatusUser } from '../../../actions/admin';
 import {connect} from 'react-redux'

const BlockedUserList = ({blockedUsers, changeBlockStatusUser}) => {
      
     if(blockedUsers!=null){
      return (
          
        <div id="content-page" className="content-page">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="iq-card">
                <div className="iq-card-header d-flex justify-content-between">
                  <div className="iq-header-title">
                    <h4 className="card-title">List of Blocked Users</h4>
                  </div>
                </div>
                <div className="iq-card-body">
                  <ul className="request-list list-inline m-0 p-0">
                    { 
  
                    
                      blockedUsers.map((user, key)=>{
                        return(
                        <li className="d-flex align-items-center">
                        <div className="user-img img-fluid"><img src={user.imageURL} alt="story-img" className="rounded-circle avatar-40" /></div>
                        <div className="media-support-info ml-3">
                          <h6>{user.name}</h6>
                      <p className="mb-0">{user.businessUser ? "business User": "casual User"}</p>
                        </div>
                        <div className="d-flex align-items-center">
                          <button onClick={()=>{changeBlockStatusUser(user._id, user.isBlock)}} className="btn btn-success"> Unblock</button>
                        </div>
                      </li>
                        )
                      })
                    }
                   
                  </ul>
                </div>
              </div>
             </div>
          </div>
        </div>
      </div>  
      
      );}
      else{
        return(
          <div class="spinner-grow" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        )
      }
}

const mapStateToProps = state => ({
  blockedUsers: state.admin.blockedUsers
})

export default connect(mapStateToProps,{changeBlockStatusUser})(BlockedUserList)
