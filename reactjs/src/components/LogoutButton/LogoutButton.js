import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { withRouter } from "react-router-dom";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <button onClick={() => logout()}>
        Log Out
      </button>
    )
  )
}

export default withRouter(LogoutButton);