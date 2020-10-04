import React, { useState } from "react";
import PackageCard from "../../components/Card/PhotograherPackageCard";
import AddButton from "../../components/AddButton/AddButton";
import LawnPackageModal from "../../components/PhotographerPackageModal/PhotographerPackageModal";
import { deletePackage } from "../../actions/photographer";
import { connect } from "react-redux";
import DashboardHeader from "../../components/DashboardHeader/PhotographerDashboardHeader";

const LawnPackages = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [editingOpen, setEditingOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [loadingDeleteBtn, setLoadingDeleteBtn] = useState(false);

  const onDeletePackage = async (pid) => {
    setLoadingDeleteBtn(true);
    await props.deletePackage(pid);
    setLoadingDeleteBtn(false);
  };

  const onEdit = (index) => {
    setEditingOpen(true);
    let data = props.business.packages[index];
    setEditData(data);
    setModalShow(true);
  };

  const onHide = () => {
    setModalShow(false);
    setEditData({});
    setEditingOpen(false);
  };

  return (
    <div className="container">
      <LawnPackageModal
        show={modalShow}
        onHide={onHide}
        editingOpen={editingOpen}
        editData={editData}
      />
      <div className="row">
        <div className="col-sm-12 col-lg-12">
          <div className="iq-card">
            <div className="iq-card-header">
              <DashboardHeader heading="Package Settings" />
            </div>
            <div className="iq-card">
              <div className="iq-card-body">
                <div className="iq-card-body border text-center rounded">
                  {props.business && props.business.packages ? (
                    <div className="card-container">
                      {props.business.packages.map((data, index) => {
                        return (
                          <PackageCard
                            key={index}
                            data={data}
                            onEdit={onEdit}
                            index={index}
                            loadingDeleteBtn={loadingDeleteBtn}
                            onDeletePackage={onDeletePackage}
                          />
                        );
                      })}
                    </div>
                  ) : (
                    <div class="alert alert-danger" role="alert">
                      Please Add Lawn Packages to complete profile!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <AddButton onClick={() => setModalShow(true)} />
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};
const mapStateToProps = (state) => ({
  business: state.auth.business,
});

export default connect(mapStateToProps, { deletePackage })(LawnPackages);
