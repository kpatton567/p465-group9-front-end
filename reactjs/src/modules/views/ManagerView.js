import React from "react";
import { Redirect } from "react-router-dom";

import { AuthConsumer } from "./authContext";
import Can from "./Can";
import Logout from "./Logout";
// import Profile from "../components/Profile";
// import PostsList from "../components/PostsList";


const DashboardPage = () => (
  <AuthConsumer>
    {({ user }) => (
      <Can
        role={user.role}
        perform="manager-view:access"
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

export default DashboardPage;