import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
import MoviesPage from "views/examples/MoviesPage.js";
import Manager from "./layouts/Manager";
import MovieBookingPage from "views/examples/MovieBookingPage";
import ChooseRole from "views/examples/ChooseRole";
import BookingHistoryPage from "views/examples/BookingHistoryPage";
import AddReview from 'views/examples/AddReview.js';
import Client from 'views/examples/Client';
import ContactPage from 'views/examples/ContactPage';
import KitchenSinkApp from './CometChat/defaultPages/KitchenSinkApp';
import HomePage from './CometChat/defaultPages/HomePage';
import RegisterPage from 'views/examples/RegisterPage'
import AddShowtime from 'views/examples/AddShowtime'
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
       <Route path='/movies'><MoviesPage/></Route> 

      {/* Customer View Options */}
      <Route path='/profile'><ProfilePage /></Route>
      <Route path='/rewards'><RewardsPage /></Route>
      <Route path='/nucleo-icons'><NucleoIcons /></Route>
      <Route path='/your-orders'><BookingHistoryPage/></Route>
      <Route path='/addReview/:userId/:movieId/:movie' render={(props) => <AddReview {...props} />} />

      {/* Manager View Options */}
      <Route path= '/registerTheater'><RegisterPage/></Route> 
      <Route
        path="/manager"
        render={(props) => <Manager {...props} />}
      />
      
      {/* Other Options*/}
      <Route path= '/role'><ChooseRole/></Route>
      <Route path="/movieBooking/:movie" component={MovieBookingPage} />
      <Route path="/addShowtime/:movie" component={AddShowtime} />
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
      <Route path="/login" component={KitchenSinkApp} />

    </Router> 
  );
}
export default (App);