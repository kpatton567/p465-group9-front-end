import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router,Route } from "react-router-dom";
// import ProfilePage from "../src/modules/views/ProfilePage";
import Home from "./Home";
import  MovieBooking from "../src/modules/views/MovieBooking";
import BookingHistory from "../src/modules/views/BookingHistory";
import UserRewards from "../src/modules/views/UserRewards";
import EditProfile from "../src/EditProfile";
import CallbackPage from "../src/callback";
import Auth from "./Auth";
import HomePage from './HomePage';
import DashboardPage  from './Dashboard';

function App() {
  // const { isLoading } = useAuth0();
  // if (isLoading) return <div>Loading...</div>

  return (
    // <Auth>
      <Router>
        
        <Route path="/" exact={true}><Home/></Route> 
        <Route path="/home" exact={true}><Home/></Route> 
        <Route path="/movieBooking" exact={true}><MovieBooking/></Route>
        <Route path="/editProfile" exact={true}><EditProfile/></Route>
        <Route path="/userRewards" exact={true}><UserRewards/></Route> 
        <Route path="/bookingHistory" exact={true}><BookingHistory/></Route>
        {/* <Route path="/callback"><CallbackPage/></Route> */}
        <Route path="/callback" component={CallbackPage}/>
        <Route path="/dashboard" component={DashboardPage}/>
      
      </Router>
      //  </Auth>
  );
}

export default withRoot(App);