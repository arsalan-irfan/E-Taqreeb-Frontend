import React, {useEffect} from "react";
import { connect } from "react-redux";
import {approvePhotographer, rejectPhotographer} from '../../../../actions/admin'
const PhotographerApprovalForm = ({selectedPhotographer, approvePhotographer, rejectPhotographer}) => {
   
  const onSubmitHandler = (e) => {
    console.log(e);
  };
  const approveClicked = (_id) => {
    console.log('approve clicked', _id)
    approvePhotographer(_id);
  }
  console.log('fetched photographer in approval form:',selectedPhotographer)
  if(selectedPhotographer!=null){
  const { address, businessEmail, city, company, description, owner, ownerCnic, phone} = selectedPhotographer;
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="iq-card">
              <div className="iq-card-body">
                <div className="iq-card-header d-flex justify-content-between">
                  <div className="iq-header-title">
                    <h4 className="card-title">Approval Form</h4>
                  </div>
                </div>
                <div className="iq-card-body">
                  <form onSubmit={(e) => onSubmitHandler(e)}>
                    <div className="form-group">
                      <label htmlFor="cpass">Company</label>

                      <input
                        type="text"
                        className="form-control"
                        id="company"
                        id="company"
                        value={company}
                        placeholder="ABC company"
                        name="company"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cpass">Business Email</label>

                      <input
                        type="text"
                        className="form-control"
                        value={businessEmail}
                        placeholder="test@test.com"
                        name="email"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cpass">Owner</label>

                      <input
                        type="owner"
                        className="form-control"
                        value={owner}
                        placeholder="owner"
                        name="owner"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cpass">Business Address</label>

                      <input
                        type="text"
                        className="form-control"
                        value={address}
                        placeholder="address"
                        name="address"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cpass">City</label>

                      <input
                        //type="city"
                        className="form-control"
                        value={city}
                        placeholder="city"
                        name="city"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cpass">Phone</label>

                      <input
                        //type="city"
                        className="form-control"
                        value={phone}
                        placeholder="phone"
                        name="phone"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cpass">Business Description</label>

                      <input
                        //type="city"
                        className="form-control"
                        value={description}
                        placeholder="desciption"
                        name="desciption"
                      />
                    </div>
                    <div className="form-group">
                        
                      <h6>Owner Cnic Image</h6>

                      <div className="profile-img-edit ">
                                <img
                                  className="cnic-image"
                                  src={ownerCnic}
                                />
                    </div>
                    </div>
                    <div className="btn btn-primary btn-lg mr-2" 
                    onClick={()=>{approveClicked(selectedPhotographer._id)}}
                    >
                      Approve
                    </div>
                    <div className="btn iq-bg-danger btn-lg" onClick={()=>{rejectPhotographer(selectedPhotographer._id)}}>
                      Reject
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );}
  else{
      return <div class="spinner-grow" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  }
};

const mapStateToProps = state => ({
    selectedPhotographer: state.admin.selectedPhotographer
})
  export default connect(mapStateToProps, {approvePhotographer, rejectPhotographer})(PhotographerApprovalForm)