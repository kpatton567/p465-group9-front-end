import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from "react-router-dom";

import Client from './Client';
import Agent from './Agent';

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
// others


function App() 
{
  return (

    <Router>
      {/* Public View Options */}
      <Route path="/" exact={true}><LandingPage /></Route>
      <Route path='/movies'><MoviesPage/></Route>

      {/* Customer View Options */}
      <Route path='/profile'><ProfilePage /></Route>
      <Route path='/rewards'><RewardsPage/></Route>
      {/* <Route path='/bookingHistory'><BookingHistoryPage/></Route> */}

      {/* Manager View Options */}
      {/* <Route path= '/registerTheater'><RegisterTheater/></Route>  */}
      <Route
        path="/manager"
        render={(props) => <Manager {...props} />}
      />
      {/* Other Options*/}
      {/* <Route path= '/isLoading'><IsLoading/></Route> */}
      <Route path="/movieBooking/:movie" component={MovieBookingPage} />
    </Router>
  );
}
export default (App);