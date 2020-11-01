import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import { BrowserRouter as Router,Route } from "react-router-dom";
import Home from "./Home";
import  MovieBooking from "../src/modules/views/MovieBooking";
import BookingHistory from "../src/modules/views/BookingHistory";
import DashboardPage  from './Dashboard';
import MoviesPage from "../src/modules/views/MoviesPage";
import ManagerView from './modules/views/ManagerView';
import ProfilePage from './modules/views/ProfilePage';
import ManageMovies from './modules/views/ManageMovies';
import { useAuth0 } from '@auth0/auth0-react';
import IsLoading from './modules/views/isLoading';
// import RewardsPage from './modules/views/RewardsPage';
// import BookingHistoryPage from './modules/views/CustomerBookingHistoryPage';
import RegisterTheater from './modules/views/RegisterTheater';
function App() {
  return (
      <Router>
        {/* Public View Options */}
        <Route path="/" exact={true}><Home/></Route> 
        <Route path="/home" exact={true}><Home/></Route>
        <Route path='/movies' exact={true}><MoviesPage/></Route>
        {/* Customer View Options */}
       
        <Route path='/profilePage'><ProfilePage/></Route>
        {/* <Route path='/rewards'><RewardsPage/></Route> */}
        {/* <Route path='/bookingHistory'><BookingHistoryPage/></Route> */}
        {/* Manager View Options */}
        <Route path= '/managerView' exact={true}><ManagerView/></Route>
         <Route path= '/registerTheater'><RegisterTheater/></Route> 
         <Route path= '/manageMovies' exact={true}><ManageMovies/></Route> 
        {/* Other Options*/}
        <Route path= '/isLoading'><IsLoading/></Route>
        <Route path="/movieBooking/:movie" component={MovieBooking}/>
      </Router>
  );
}
export default withRoot(App);
