import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router,Route } from "react-router-dom";
import EditProfile from "./EditProfile";
import Home from "./Home";


function App() {
  const { isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>

  return (
      <Router>
        <Route path='/editProfile' component={EditProfile} />
        <Route path="/" exact={true}>
          <Home/>
        </Route> 
        <Route path="/home" exact={true}>
          <Home/>
        </Route> 
      </Router>
  );
}

export default withRoot(App);