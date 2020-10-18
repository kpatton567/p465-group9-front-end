import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import { BrowserRouter as Router,Route } from "react-router-dom";
import Home from "./Home";
import  MovieBooking from "../src/modules/views/MovieBooking";
import BookingHistory from "../src/modules/views/BookingHistory";
import UserRewards from "../src/modules/views/UserRewards";
import EditProfile from "../src/EditProfile";
import CallbackPage from "../src/callback";
import DashboardPage  from './Dashboard';
import MoviesPage from "../src/modules/views/MoviesPage";

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
        <Route path='/movies' exact={true}><MoviesPage/></Route>
 
      
      </Router>
      //  </Auth>
  );
}

export default withRoot(App);