import Homepage from "../pages/Homepage/Homepage";
import LawnHome from "../LawnHome/LawnHome";
import CatererHome from "../CatererHome/CatererHome";
import PhotoHome from "../pages/PhotographerSection/photogapherHome/PhotographerHome";
import LawnDetails from "../pages/Lawn/LawnDetails/index";
import PhotographerDetails from "../pages/PhotographerDetails/index";
import Profile from "../pages/UserProfile/UserProfile";
import BusinessRegister from "../pages/Business registeration/Index";
import Requested from "../pages/Lawn/LawnDetails/OrderRequested";
import  OrderHistory  from "../pages/OrderHistory/OrderHistory";

import BusinessDashboard from "../pages/BusinessDashboard/BusinessDashboard";
import Chat from '../Chat/Chat'
import BusinessChat from '../BusinessChat/Chat'
const dashboardRoutes = [
  {
    path: "/",
    name: "Home",
    icon: "las  la-home",
    component: Homepage,
    layout: "/user",
    sidebarItem: true,
  },

  {
    path: "/profile",
    name: "Profile",
    icon: "las la-edit",
    component: Profile,
    layout: "/user",
    sidebarItem: true,
  },

  {
    path: "/lawns",
    name: "Lawns",
    icon: "ri-bank-fill",
    component: LawnHome,
    layout: "/user",
    sidebarItem: true,
  },
  
  {
    path: "/photographers",
    name: "Photographers",
    icon: "las la-camera-retro",
    component: PhotoHome,
    layout: "/user",
    sidebarItem: true,
  },
  {
    path: "/register",
    name: "Business registeration",
    icon: "las la-comments-dollar",
    component: BusinessRegister,
    layout: "/user",
    sidebarItem: true,
  },
  {
    path: "/lawn/:id",
    component: LawnDetails,
    layout: "/user",
    sidebarItem: false,
  },
  {
    path: "/photographer/:id",
    component: PhotographerDetails,
    layout: "/user",
    sidebarItem: false,
  },
  {
    path: "/business",
    name: "Business Dashboard",
    component: BusinessDashboard,
    icon: "ri-bank-fill",
    layout: "/user",
    sidebarItem: false,
  },
  {
    path: "/orderrequested",
    name: "Order Requested",
    component: Requested,
    // icon: "ri-bank-fill",
    layout: "/user",
    sidebarItem: false,
  },
  {
    path: "/orderhistory",
    name: "Order History",
    component: OrderHistory,
    icon: "fa fa-clock-o",
   // icon: "ri-bank-fill",
    layout: "/user",
    sidebarItem: true,
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
    icon: "ri-send-plane-2-line",
    layout: "/user",
    sidebarItem: true,
  },
  {
    path: "/businessChat",
    name: "Business Chat",
    component: BusinessChat,
    icon: "ri-send-plane-2-line",
    layout: "/user",
    sidebarItem: false,
  },
  
];
export default dashboardRoutes;
