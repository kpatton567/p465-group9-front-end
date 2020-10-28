import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import { BrowserRouter as Router,Route } from "react-router-dom";
import Home from "./Home";
import  MovieBooking from "../src/modules/views/MovieBooking";
import BookingHistory from "../src/modules/views/BookingHistory";
import UserRewards from "../src/modules/views/UserRewards";
import DashboardPage  from './Dashboard';
import MoviesPage from "../src/modules/views/MoviesPage";
import ManagerView from './modules/views/ManagerView';
import ProfilePage from './modules/views/ProfilePage';
import ManageMovies from './modules/views/ManageMovies';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const { isLoading } = useAuth0();
  if (isLoading) return <div>Loading...</div>

  return (
   
      <Router>
        <Route path="/" exact={true}><Home/></Route> 
        <Route path="/home" exact={true}><Home/></Route>
        <Route path="/movieBooking/:movie" component={MovieBooking}/>
        <Route path="/userRewards" exact={true}><UserRewards/></Route> 
        <Route path="/bookingHistory" exact={true}><BookingHistory/></Route>
        <Route path="/dashboard" component={DashboardPage}/>
        <Route path='/movies' exact={true}>
          <MoviesPage/>
        </Route>
        <Route path= '/managerView' exact={true}><ManagerView/></Route>
        <Route path= '/manageMovies' exact={true}><ManageMovies/></Route>
        <Route path= '/profilepage'><ProfilePage/></Route>
      </Router>
  );
}

export default withRoot(App);