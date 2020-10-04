import React, { useEffect} from "react";
import "./App.css";
import { Router, Switch } from "react-router-dom";
import UserLayout from "./layouts/user";
import AdminLayout from "./layouts/admin";
import Login from "./pages/LoginPage/Login";
import Signup from "./pages/SignupPage/Signup";
import { connect } from "react-redux";
import UserRoute from "./AuthGuard/UserRoute";
import AdminRoute from "./AuthGuard/AdminRoute";
import NoInternetRoute from "./AuthGuard/NoInternetRoute";
import Offline from "./Error/Offline";
import PublicRoute from "./AuthGuard/PublicRoute";
import { Toastify } from "./components/Toastify/Toastify";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import NewPassword from "./pages/ForgetPassword/newPassword";
import { loadUser } from "./actions/auth";
import history from "./history";
import SocialMiddleware from "./pages/SocialMiddleware/SocialMiddleware";
import SocialLoginModal from "./pages/SocialLoginModal/SocialLoginModal";
import { newLawnPublished, lawnUnPublished } from './actions/lawn'
import { newPhotographerPublished, photographerUnPublished } from './actions/photographer'
import { notifyToast } from './actions/alert'
import openSocket from 'socket.io-client';
var socket = openSocket("https://e-taqreeb-api.herokuapp.com");


function App(props) {

  const [user, setUser] = React.useState(null)
  
  // const x = process.env.REACT_APP_API_URL
  console.log("https://e-taqreeb-api.herokuapp.com")

  useEffect(() => {
    console.log("offline", props.offline);

    if (localStorage.token) {
      props.loadUser();
    }
    if (props.offline) {
      history.push("/no-internet");
    }
  }, [props.offline]);
  
  useEffect(() => {
    socket.on("lawnPublish", function (data) {
      if (data.publish) {
        props.newLawnPublished(data, `Now you can book lawns from ${data.company}`);
      } else {
        props.lawnUnPublished(data);
      }

    });
    socket.on("photographerPublish", function (data) {
      if (data.publish) {
        props.newPhotographerPublished(data, `Now you can book photographers from ${data.company}`);
      } else {
        props.photographerUnPublished(data);

      }
    });
  }, [])


  useEffect(() => {
    if (user) {
      socket.on('businessStatus', function (data) {
        console.log(data);
        let { msg, id } = data;
        if (id === user._id) {
          props.loadUser();
          notifyToast(msg);
        }
      })

      socket.on('lawnOrderAccepted', function (data) {
        console.log("lawnOrderAccepted", user + " " + data.userId)
        if (user._id === data.userId) {
          props.loadUser()
          notifyToast(data.msg)
        }
      })
      socket.on('lawnOrderRejected', function (data) {

        console.log("lawnOrderRejected", user + " " +  data);
        if (user._id === data.userId) {
          props.loadUser();
          notifyToast(data.msg)
        }
      })
      socket.on('photographerOrderAccepted', function (data) {
        console.log("photographerOrderAccepted", user + " " + data.userId)
        if (user._id === data.userId) {
          props.loadUser()
          notifyToast(data.msg)
        }
      })
      socket.on('photographerOrderRejected', function (data) {

        console.log("photographerOrderRejected", user + " " +  data);
        if (user._id === data.userId) {
          props.loadUser();
          notifyToast(data.msg)
        }
      })
    }
    return () => {
      socket.off("lawnOrderRejected");
      socket.off("lawnOrderAccepted");
      socket.off("businessStatus");
      socket.off("photographerOrderRejected");
      socket.off("photographerOrderAccepted");
    }
  }, [props.user]); // componentDidMOumn
  useEffect(() => {
    if (props.user) {
      setUser(props.user)
    }
  }, [props.user])
  console.log("User::", user);
  return (
    <React.Fragment>
      <Router history={history}>
        <div
          className={`sidebar-main-active right-column-fixed ${props.navbarOpen ? "sidebar-main" : ""
            }`}
          id="body"
        >

          <Toastify />
          <div className="wrapper">
            <Switch>
              <PublicRoute exact path="/" component={Login} restricted={true} />
              <PublicRoute
                exact
                path="/login/social"
                component={SocialMiddleware}
                restricted={true}
              />
              <PublicRoute
                exact
                path="/register"
                component={Signup}
                restricted={true}
              />
              <PublicRoute
                exact
                path="/forgetpassword"
                component={ForgetPassword}
                restricted={true}
              />

              <PublicRoute
                exact
                path="/newpassword"
                component={NewPassword}
                restricted={true}
              />
              <PublicRoute
                exact
                path="/test-modal"
                component={SocialLoginModal}
                restricted={true}
              />
              <NoInternetRoute
                exact
                path="/no-internet"
                component={Offline}
                restricted={true}
              />

              <UserRoute path="/user" component={UserLayout} />
              <AdminRoute path="/admin" component={AdminLayout} />
            </Switch>
          </div>
        </div>
      </Router>
    </React.Fragment>

  );
}

const mapStateToProps = (state) => ({
  navbarOpen: state.app.navbarOpen,
  user: state.auth.user,
  offline: state.app.offline,
});

export default connect(mapStateToProps, { loadUser, newLawnPublished, lawnUnPublished, photographerUnPublished, newPhotographerPublished })(App);
