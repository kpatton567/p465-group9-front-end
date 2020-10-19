import React from "react";
import { Redirect } from "react-router-dom";

import { AuthConsumer } from "../../authContext";
import Can from "../../Can";
import Logout from "../../Logout";

const ManagerView = () => (
  <AuthConsumer>
    {({ user }) => (
      <Can
        role={user.role}
        perform="manager-page:visit"
        yes={() => (
          <div>
            <h1>Dashboard</h1>
            <Logout />
            <ul>
          <li>ID: {user.id}</li>
          <li>Email: {user.email}</li>
          <li>Role: {user.role}</li>
        </ul>
            {/* <Profile />
            <PostsList /> */}
          </div>
        )}
        no={() => <Redirect to="/" />}
      />
    )}
  </AuthConsumer>
);

export default ManagerView;