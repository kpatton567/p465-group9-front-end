import React from "react";
import ReactDOM from "react-dom";

// // styles
import "assets/css/bootstrap.min.css";
import "assets/scss/paper-kit.scss?v=1.2.0";
import "assets/demo/demo.css?v=1.2.0";
// others
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { CometChat } from '@cometchat-pro/chat';
import config from './config';

const domain = "dev-dxbzrhs3.us.auth0.com";
const clientId = "5sKjWXaUsg0itiHJiV0YDJ4xjQE7rDP5";
CometChat.init(config.appID)

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}>
  <App/>
   </Auth0Provider>,
  document.getElementById("root")
);