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

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import * as serviceWorker from './serviceWorker';
import { CometChat } from "@cometchat-pro/chat"
import { COMETCHAT_CONSTANTS } from './consts';

import reducer from './store/reducer';


const domain = "dev-dxbzrhs3.us.auth0.com";
const clientId = "5sKjWXaUsg0itiHJiV0YDJ4xjQE7rDP5";

const store = createStore(reducer, compose(
  applyMiddleware(thunk)
));

var appID = COMETCHAT_CONSTANTS.APP_ID;
var region = COMETCHAT_CONSTANTS.REGION;

var appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
CometChat.init(appID, appSetting).then(() => {

    if(CometChat.setSource) {
      CometChat.setSource("ui-kit", "web", "reactjs");
    }
    console.log("Initialization completed successfully");
    ReactDOM.render(
      <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri="http://localhost:3000/role">
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </Provider>
      </Auth0Provider>
    , document.getElementById('root'));
  },
  error => {
    console.log("Initialization failed with error:", error);
    // Check the reason for error and take appropriate action.
  }
);

serviceWorker.unregister();