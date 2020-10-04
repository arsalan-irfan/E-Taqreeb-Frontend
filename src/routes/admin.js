
import Lawn from '../Admin/AdminDashboard/Business/Lawn/index';

import Photographer from '../Admin/AdminDashboard/Business/Photographer/index';
import LawnDetails from "../pages/Lawn/LawnDetails/index";
import User from '../Admin/AdminDashboard/User/index';
import PendingList from '../Admin/AdminDashboard/Business/Pending/PendingList'
import Homepage from '../Admin/AdminDashboard/Homepage/home';
import  LawnApprovalForm  from '../Admin/AdminDashboard/Business/ApprovalForm/LawnApprovalForm';
import PhotographerApprovalForm from '../Admin/AdminDashboard/Business/ApprovalForm/PhotographerApprovalForm';
const dashboardRoutes=[
    {
        path:'/',
        name: "Home",
        icon: "las  la-home",
        component: Homepage,
        layout: "/admin",
        sidebarItem:true
      },
      {
        path:'/lawn',
        name: "Lawns",
        icon: "ri-bank-fill",
        component: Lawn,
        layout: "/admin",
        sidebarItem:true
      },
      {
        path: "/lawn/:id",
        component: LawnDetails,
        layout: "/user",
        sidebarItem: false
      },
      {
        path:'/photographer',
        name: "Photographer",
        icon: "	fa fa-camera",
        component: Photographer,
        layout: "/admin",
        sidebarItem:true
      },

      {
        path:'/pending',
        name: "Pending List",
        icon: "fa fa-clock-o",
        component: PendingList,
        layout: "/admin",
        sidebarItem:true
      },
      {
        path:'/user',
        name: "User",
        icon: "las la-user",
        component: User,
        layout: "/admin",
        sidebarItem:true
      },{
        path:'/pendingLawn',
        name: "Lawn Approval Form",
        icon: "las la-user",
        component: LawnApprovalForm,
        layout: "/admin",
        sidebarItem:false
        
      },{
        path:'/pendingPhotographer',
        name: "PhotographerApproval Form",
        icon: "las la-user",
        component: PhotographerApprovalForm,
        layout: "/admin",
        sidebarItem:false
        
      }
      
]
export default dashboardRoutes;