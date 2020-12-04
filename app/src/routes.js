
import Dashboard from "views/examples/DashboardPage.js";
import Notifications from "views/examples/Notifications.js";
import TableList from "views/examples/Tables.js";
import ManageMovies from "views/examples/ManageMovies.js";
import ManageSnacks from "views/examples/ManageMovies.js";
import UserPage from "views/examples/User.js";
import CometChatApp from 'views/examples/CometChatApp';
import ManagerTransactionHistory from 'views/examples/ManagerTransactionHistory';

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/manager",
  },
  {
    path: "/managemovies",
    name: "Manage Movies",
    icon: "nc-icon nc-camera-compact",
    component: ManageMovies,
    layout: "/manager",
  },
  {
    path: "/managesnacks",
    name: "Manage Snacks",
    icon: "nc-icon nc-basket",
    component: ManageSnacks,
    layout: "/manager",
  },
  {
    path: "/groupchat",
    name: "Chat Support",
    icon: "nc-icon nc-tile-56",
    component: CometChatApp,
    layout: "/manager",
  },
  {
    path: "/transactionHistory",
    name: "Transaction History",
    icon: "nc-icon nc-tile-56",
    component: ManagerTransactionHistory,
    layout: "/manager",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/manager",
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/manager",
  },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-caps-small",
  //   component: Typography,
  //   layout: "/manager",
  // },
];
export default routes;
