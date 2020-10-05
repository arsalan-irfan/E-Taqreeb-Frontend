import React, { useState, useEffect } from "react";
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

const OrderHistory = ({ userId, acceptOrder, rejectOrder }) => {
  const domain = "https://e-taqreeb-api.herokuapp.com";
  const [orders, setOrders]=useState([]);
  const config = {
    headers: {
      "x-auth-token": localStorage.token,
    },
  };
  const getOrderHistory = async (id)=>{

    try {
      const ord = await axios.get(`${domain}/users/getOrderHistory/${userId}`, config);
      if(ord){
        setOrders(ord.data.order)
      }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    if(orders.length==0){
      getOrderHistory()
    }
  }, [getOrderHistory])
  //getOrderHistory();
  console.log(orders)
  const [modalShow, setModalShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [user, setUser] = useState({});
  const [Package, setPackage] = useState({});
  const [status, setStatus] = useState(0);
  const [click, setClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
 // const domain = "https://e-taqreeb-api.herokuapp.com";

  const getLawnOrderDetails = async (id) => {
    setLoading(true);
    
    try {
      const res = await axios.get(`${domain}/lawn/getOrder/${id}`, config);
      if (res) {
        setUser(res.data.user);
        setPackage(res.data.package);
        // setDate(res.data.createdAt);
        const a = new Date(res.data.createdAt);
        setDate(a);
        setStatus(res.data.status);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getPhotographerOrderDetails = async (id) => {
    setLoading(true);
    
    try {
      const res = await axios.get(`${domain}/photographer/getOrder/${id}`, config);
      if (res) {
        setUser(res.data.user);
        setPackage(res.data.package);
        // setDate(res.data.createdAt);
        const a = new Date(res.data.createdAt);
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
                <label> Order was placed on: </label>

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
                  
                     {status == 0
                        ?    <input
                        type="text"
                        class="form-control"
                        id="title"
                        placeholder="Pending" 
                        readOnly
                      />
                        : status == 1
                        ?    <input
                        type="text"
                        class="form-control"
                        id="title"
                        placeholder="Accepted" 
                        readOnly
                      />
                        : status == 2
                        ?   <input
                        type="text"
                        class="form-control"
                        id="title"
                        placeholder="Rejected" 
                        readOnly
                      />
                        : null} 
                  
               
                </div>
              </div>
            </form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-primary"
            onClick={()=>{
              setModalShow(false)
            }}
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
                 <h1>Order History</h1>
                </div>
                <div className="iq-card-body">
                  <div className="table-responsive">
                    <table
                      id="datatable"
                      className=" table table-striped table-responsive-md table-bordered text-center"
                    >
                      <thead>
                        <tr>
                          <th>Business Name</th>
                          <th>Business Email</th>
                          <th>Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order, key) => {
                          console.log('order is:', order)
                          return (
                            
                              order.lawnId?
                             
                            <tr
                              onClick={() => {
                                setModalShow(true);
                                getLawnOrderDetails(order._id);
                                setOrderId(order._id);
                              }}
                              key={key}
                            >
                              <td>{order.lawnId.company}</td>
                              <td>{order.lawnId.businessEmail}</td>
                              <td>
                                <ReactTimeAgo date={order.createdAt} />
                              </td>
                              {console.log(order.status)}
                              {order.status == 0 ? (
                                <td>Pending</td>
                              ) : order.status == 1 ? (
                                <td> Accepted</td>
                              ) :order.status == 2 ?
                            <td>Rejected</td>: null
                            }
                            </tr>
                           : 
                            
                              <tr
                              onClick={() => {
                                setModalShow(true);
                                getPhotographerOrderDetails(order._id);
                                setOrderId(order._id);
                              }}
                              key={key}
                            >
                              <td>{order.photographerId.company}</td>
                              <td>{order.photographerId.businessEmail}</td>
                              <td>
                                <ReactTimeAgo date={order.createdAt} />
                              </td>
                              {order.status == 0 ? (
                                <td>Pending</td>
                              ) : order.status == 1 ? (
                                <td> Accepted</td>
                              ) : <td>Rejected</td>}
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
  orders: state.auth.business? state.auth.business.orders: [] ,
  userId: state.auth.user._id
});

export default connect(mapStateToProps, { acceptOrder, rejectOrder })(
  OrderHistory
);
