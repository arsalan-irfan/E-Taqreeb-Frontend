import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import { connect } from "react-redux";
import JavascriptTimeAgo from "javascript-time-ago";
import axios from "axios";
import { errorsAlert } from "../../actions/alert";
import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";
import { acceptOrder, rejectOrder } from "../../actions/lawn";

JavascriptTimeAgo.addLocale(en);
JavascriptTimeAgo.addLocale(ru);

const OrderList = ({ orders, acceptOrder, rejectOrder }) => {
  const [modalShow, setModalShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [user, setUser] = useState({});
  const [Package, setPackage] = useState({});
  const [status, setStatus] = useState(0);
  const [click, setClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const domain = "https://e-taqreeb-api.herokuapp.com";

  const getOrderDetails = async (id) => {
    setLoading(true);
    const config = {
      headers: {
        "x-auth-token": localStorage.token,
      },
    };
    try {
      const res = await axios.get(`${domain}/lawn/getOrder/${id}`, config);
      if (res) {
        setUser(res.data.user);
        setPackage(res.data.package);
        // setDate(res.data.createdAt);
        const a = new Date(res.data.bookingDate);
        setDate(a);
        setStatus(res.data.status);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleChange = (event) => {
    // console.log('event target', event.target.value)
    setClick(true);
    setStatus(Number(event.target.value));
  };
  console.log("status is:", status);
  function ViewModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <h4>Centered Modal</h4> */}
          {loading ? (
            <div className="spinner-grow" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <form>
              <div className="row">
                <div className="col ">
                  <label> Name: </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder={user.name}
                    readOnly
                  />
                </div>
                <div class="col ">
                  <label> Email: </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder={user.email}
                    readOnly
                  />
                </div>
              </div>
              <label> Package Details: </label>

              <div className="row ">
                <div className="col">
                  <label> Title: </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder={Package.title}
                    readOnly
                  />
                </div>
                <div className="col">
                  <label> Capacity: </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder={Package.capacity}
                    readOnly
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                <label> Price: </label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder={Package.price}
                  readOnly
                />
                </div>
              </div>
              <div className="row">
              <div className="col ">
                <label> Time From: </label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder={Package.timeFrom}
                  readOnly
                />
              </div>
              <div class="col">
                <label> Time to: </label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder={Package.timeTo}
                  readOnly
                />
              </div>
              </div>
              <div className="row">
                <div className="col">
                <label> Advance Payment: </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder={Package.advance}
                  readOnly
                />
                </div>
              
              <div className="col">
                <label> Description for order: </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder={Package.description}
                  readOnly
                />
                </div>
              </div>
              <div className="row ">
                <div className="col-md-8">
                <label> Order was placed for: </label>

                <input
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder={date}
                  readOnly
                />
                </div>
              </div>
              <div className="form">
                <div class="form-group col-md-3">
                  <label for="inputState">Status</label>
                  <select
                    id="inputState"
                    class="form-control"
                    onClick={(e) => {
                      handleChange(e);
                    }}
                  >
                    <option name="option" value={status} selected>
                      {status == 0
                        ? "Pending"
                        : status == 1
                        ? "Accepted"
                        : status == 2
                        ? "Rejected"
                        : null}
                    </option>
                    <option value="1">Accept</option>
                    <option value="2">Reject</option>
                  </select>
                </div>
              </div>
            </form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => {
              if (!click) {
                setModalShow(false);
              }
              if (status == 0 && click) {
                errorsAlert([{ error: "select accepted or rejected" }]);
              } else if (status == 1 && click) {
                console.log("status is 1 accepting order....");
                acceptOrder({ orderId });
                setModalShow(false);
              } else if (status == 2 && click) {
                rejectOrder(orderId);
                setModalShow(false);
              }
            }}
            className="btn btn-primary"
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <div>
      <div className="wrapper">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="iq-card">
                <div className="iq-card-header">
                  <DashboardHeader heading="Manage Orders" />
                </div>
                <div className="iq-card-body">
                  <div className="table-responsive">
                    <table
                      id="datatable"
                      className=" table table-striped table-responsive-md table-bordered text-center"
                    >
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order, key) => {
                          return (
                            <tr
                              onClick={() => {
                                setModalShow(true);
                                getOrderDetails(order._id);
                                setOrderId(order._id);
                              }}
                              key={key}
                            >
                              <td>{order.name}</td>
                              <td>{order.email}</td>
                              <td>
                                <ReactTimeAgo date={order.createdAt} />
                              </td>
                              {order.status == 0 ? (
                                <td>Pending</td>
                              ) : order.status == 1 ? (
                                <td> Accepted</td>
                              ) : order.status == 2 ? (
                                <td> Rejected</td>
                              ) :null}
                            </tr>
                          );
                        })}
                        <ViewModal show={modalShow} />
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  orders: state.auth.business.orders,
});

export default connect(mapStateToProps, { acceptOrder, rejectOrder })(
  OrderList
);
