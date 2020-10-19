import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router,Route } from "react-router-dom";
import EditProfile from "./EditProfile";
import Home from "./Home";
import MovieBooking from "../src/modules/views/MovieBooking";
import ManagerView from "../src/modules/views/ManagerView";
import ManageMovies from "../src/modules/views/ManageMovies";
import ManageSnacks from "../src/modules/views/ManageSnacks";
import CustomerChat from "../src/modules/views/CustomerChat";
import TransactionPage from "../src/modules/views/TransactionPage";
import ReviewPage from "../src/modules/views/ReviewPage";
function App() {
  const { isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>

  return (
      <Router>
        <Route path='/editProfile' component={EditProfile} />
        <Route path='/manageMovies' component={ManageMovies} />
        <Route path='/manageSnacks' component={ManageSnacks} />
        <Route path='/customerChat' component={CustomerChat} />
        <Route path='/transactionPage' component={TransactionPage} />
        <Route path='/reviewPage' component={ReviewPage} />
        <Route path="/" exact={true}>
          <Home/>
        </Route> 
        <Route path="/home" exact={true}>
          <Home/>
        </Route> 
        <Route path="/movieBooking" exact={true}>
          <MovieBooking/>
        </Route>
        <Route path='/support'>
          {'Implementing support page/chat in later sprint'}
        </Route>
        <Route path='/movies'>
          {'In progress... dummy page'}
        </Route>
        <Route path='/managerView'>
          <ManagerView/>
        </Route>
        
        {/* Prevent navigation to non-existing portion of site, needs work, currently prints on all pages */}
        {/* <Route component={Error}/>  */}  
      </Router>
  );
}

export default withRoot(App);