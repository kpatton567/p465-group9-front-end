import React, { Component , useState} from "react";
import auth0 from "auth0-js";
import { AUTH_CONFIG } from "./auth0-variables";
import { AuthProvider } from "./authContext";
import { useAuth0 } from '@auth0/auth0-react';

const auth = new auth0.WebAuth({
  domain: AUTH_CONFIG.domain,
  clientID: AUTH_CONFIG.clientId,
  redirectUri: AUTH_CONFIG.callbackUrl,
  audience: `https://${AUTH_CONFIG.domain}/userinfo`,
  responseType: "token id_token"
});

function Auth(props) {
  const { user, isAuthenticated } = useAuth0();

  const [state , setState] = useState({
    authenticated: false,
    user: {
      role: 'visitor'
    },
    accessToken: ""
})
  const initiateLogin = () => {
    auth.authorize({prompt:'login'});
  };

  const logout = () => {
    this.setState({
      authenticated: false,
      user: {
        role: "visitor"
      },
      accessToken: ""
    });
  };
  const handleAuthentication = () => {
    auth.parseHash((error, authResult) => {
      if (error) {
        console.log(error);
        console.log(`Error ${error.error} Occured`);
        return;
      }

      this.setSession(authResult.idTokenPayload);
    });
  }
  const setSession = (data) => {
    const user = {
      id: data.sub,
      email: data.email,
      role: data[AUTH_CONFIG.roleUrl]
    };
    this.setState({
      authenticated: true,
      accessToken: data.accessToken,
      user
    });
  };

    const authProviderValue = {
      ...state,
      initiateLogin: initiateLogin,
      handleAuthentication:handleAuthentication,
      logout: logout
    };
    return (
      <AuthProvider value={authProviderValue}>
        {props.children}
      </AuthProvider>
    );
  
}

export default Auth;