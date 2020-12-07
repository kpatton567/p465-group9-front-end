import Dashboard from "views/examples/DashboardPage.js";
import ManageMovies from "views/examples/ManageMovies.js";
import ManageSnacks from "views/examples/ManageSnacks.js";
import CometChatApp from 'views/examples/CometChatApp';
import ManagerTransactionHistory from 'views/examples/ManagerTransactionHistory';
import Showtimes from "views/examples/Showtimes.js";

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
    path: "/addshowtimes",
    name: "Manage Showtimes",
    icon: "nc-icon nc-calendar-60",
    component: Showtimes,
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
    icon: "nc-icon nc-chat-33",
    component: CometChatApp,
    layout: "/manager",
  },
  {
    path: "/transactionHistory",
    name: "Transaction History",
    icon: "nc-icon nc-tile-56",
    component: ManagerTransactionHistory,
    layout: "/manager",
  }
];
export default routes;