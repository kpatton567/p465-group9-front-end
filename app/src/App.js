import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from "react-router-dom";


// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/paper-kit.scss?v=1.2.0";
import "assets/demo/demo.css?v=1.2.0";
// pages
import Index from "views/Index.js";
import NucleoIcons from "views/NucleoIcons.js";
import LandingPage from "views/examples/LandingPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import RewardsPage from "views/examples/RewardsPage.js";
import Manager from "./layouts/Manager";
import MovieBookingPage from "views/examples/MovieBookingPage";
import CometChatApp from "views/examples/CometChatApp";
import ChooseRole from "views/examples/ChooseRole";

// others
import Client from 'views/examples/Client';
import ContactPage from 'views/examples/ContactPage';
import KitchenSinkApp from './CometChat/defaultPages/KitchenSinkApp';
import HomePage from './CometChat/defaultPages/HomePage';
import {
  CometChatConversationList,
  CometChatUserList,
  CometChatUnified,
  CometChatGroupList,
  CometChatUserListScreen,
  CometChatConversationListScreen,
  CometChatGroupListScreen
} from './CometChat';

function App() {
  return (

    <Router>
      {/* Public View Options */}
      <Route path="/" exact={true}><LandingPage /></Route>
      <Route path="/index"><Index/></Route>
      {/* Customer View Options */}
      <Route path='/profile-page'><ProfilePage /></Route>
      <Route path='/rewards-page'><RewardsPage /></Route>
      <Route path='/nucleo-icons'><NucleoIcons /></Route>
      {/* <Route path='/bookingHistory'><BookingHistoryPage/></Route> */}

      {/* Manager View Options */}
      {/* <Route path= '/registerTheater'><RegisterTheater/></Route>  */}
      <Route
        path="/manager"
        render={(props) => <Manager {...props} />}
      />
      {/* Other Options*/}
      <Route path= '/role'><ChooseRole/></Route>
      <Route path="/movieBooking/:movie" component={MovieBookingPage} />

      {/* chat */}
      <Route path="/client" component={Client} ></Route>
      <Route path="/contact" component={ContactPage } ></Route>
      <Route path="/groupchat/embedded-app" component={CometChatUnified} />
      <Route path="/contact-list" component={CometChatUserList} />
      <Route path="/group-list" component={CometChatGroupList} />
      <Route path="/conversations-list" component={CometChatConversationList} />
      <Route path="/contact-screen" component={CometChatUserListScreen} />
      <Route path="/conversation-screen" component={CometChatConversationListScreen} />
      <Route path="/group-screen" component={CometChatGroupListScreen} />
      <Route exact path="/manager/groupchat" component={HomePage} />
      <Route path="/login" component={KitchenSinkApp} />

    </Router>
  );
}
export default (App);