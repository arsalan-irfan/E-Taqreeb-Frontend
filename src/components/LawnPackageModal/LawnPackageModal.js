import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import ErrorBox from "../AlertBox/AlertBox";
import { addPackage, updatePackage } from "../../actions/lawn";
import { connect } from "react-redux";

function LawnPackageModal(props) {
  const [error, setError] = React.useState("");
  const [modalData, setModalData] = React.useState({
    title: "",
    capacity: "",
    price: "",
    advance: "",
    timeFrom: "",
    timeTo: "",
    description: "",
  });
  const setDefaultValues = () => {
    setModalData({
      ...modalData,
      title: "",
      capacity: "",
      price: "",
      advance: "",
      timeFrom: "",
      timeTo: "",
      description: "",
    });
  };
  useEffect(() => {
    console.log("editingOpen", props.editingOpen);
    if (props.editingOpen) {
      let { editData } = props;
      console.log("editData", editData);
      setModalData({
        ...modalData,
        title: editData.title,
        capacity: editData.capacity,
        price: editData.price,
        advance: editData.advance,
        timeFrom: editData.timeFrom,
        timeTo: editData.timeTo,
        description: editData.description,
      });
    } else {
      setDefaultValues();
    }
  }, [props.editingOpen]);
  const onChangeHandler = (e) => {
    setModalData({
      ...modalData,
      [e.target.name]: e.target.value,
    });
  };
  const onAddPackage = () => {
    let {
      title,
      capacity,
      price,
      advance,
      timeFrom,
      timeTo,
      description,
    } = modalData;
    if (
      !title ||
      !capacity ||
      !price ||
      !advance ||
      !timeFrom ||
      !timeTo ||
      !description
    ) {
      setError("Please fill all the fields");
    } else {
      setError(null);
      if (props.editingOpen) {
        let data = modalData;
        data.id = props.editData._id;
        props.updatePackage(data);
      } else {
        props.addPackage(modalData);
      }

      props.onHide();
    }
  };
  let {
    title,
    capacity,
    price,
    advance,
    timeFrom,
    timeTo,
    description,
  } = modalData;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered={true}
      scrollable={true}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add a Package
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <h4>Centered Modal</h4>  */}
        <form>
          <div className="form-row">
            <div className="form-group col-md-6 ">
              <label> Title: </label>
              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="title"
                value={title}
                onChange={(e) => {
                  onChangeHandler(e);
                }}
              />
            </div>
            <div className="form-group col-md-6 ">
              <label> Capacity: </label>
              <input
                type="number"
                className="form-control"
                name="capacity"
                placeholder="Number of people"
                value={capacity}
                onChange={(e) => {
                  onChangeHandler(e);
                }}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6 ">
              <label> Price: </label>
              <input
                type="number"
                className="form-control"
                name="price"
                placeholder="Price"
                value={price}
                onChange={(e) => {
                  onChangeHandler(e);
                }}
              />
            </div>

            <div className="form-group col-md-6 ">
              <label> Advance: </label>
              <input
                type="number"
                className="form-control"
                name="advance"
                placeholder="Advance"
                value={advance}
                onChange={(e) => {
                  onChangeHandler(e);
                }}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6 ">
              <label>Time From</label>
              <input
                type="Time"
                className="form-control"
                name="timeFrom"
                placeholder="1100"
                value={timeFrom}
                onChange={(e) => {
                  onChangeHandler(e);
                }}
              />
            </div>
            <div className="form-group col-md-6 ">
              <label> Time To: </label>
              <input
                type="Time"
                className="form-control"
                name="timeTo"
                placeholder="0900"
                value={timeTo}
                onChange={(e) => {
                  onChangeHandler(e);
                }}
              />
            </div>
          </div>
          <div>
            <textarea
              className={`form-control mb-0`}
              type="text"
              name="description"
              rows="3"
              placeholder="A brief description about your business"
              value={description}
              onChange={(e) => {
                onChangeHandler(e);
              }}
              //   onChange={(e) => descriptionChange(e)}
            ></textarea>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        {error ? <ErrorBox message={error} /> : null}
        <button
          onClick={() => {
            setDefaultValues();
            props.onHide();
          }}
          className="btn btn-primary"
        >
          Close
        </button>
        <button onClick={() => onAddPackage()} className="btn btn-primary">
          {props.editingOpen ? "Update" : "Add"}
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default connect(null, { addPackage, updatePackage })(LawnPackageModal);
