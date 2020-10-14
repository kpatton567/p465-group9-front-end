import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router,Route } from "react-router-dom";
import EditProfile from "./EditProfile";
import Home from "./Home";
import Error from "./modules/components/Error";

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
        <Route path='/support'>
          {'Implementing support page/chat in later sprint'}
        </Route>
        <Route path='/movies'>
          {'In progress... dummy page'}
        </Route>
 
        {/* Prevent navigation to non-existing portion of site, needs work, currently prints on all pages */}
        {/* <Route component={Error}/>  */} 
      </Router>
  );
}

export default withRoot(App);