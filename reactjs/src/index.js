// import React from "react";
// import ReactDOM from "react-dom";
// import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

// import HomePage from './HomePage';
// // import DashboardPage from "./dashboard";
// import CallbackPage from "./callback";
// import EditProfile from "../src/EditProfile";
// import DashboardPage  from './Dashboard';

// function App() {
//   return (
//     <div className="App container">
//       <Auth>
//         <div className="jumbotron">
//           <Router>
//             <Switch>
//               <Route exact path="/" component={HomePage}/>
//               <Route path="/editProfile" component={EditProfile}/>
//               <Route path="/callback" component={CallbackPage}/>
//               <Route path="/dashboard" component={DashboardPage}/>
//             </Switch>
//           </Router>
//         </div>
//       </Auth>
//     </div>
//   );
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App/>, rootElement);

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}>
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister(); 