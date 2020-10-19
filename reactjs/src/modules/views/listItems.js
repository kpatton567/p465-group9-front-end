import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import EditProfile from "../../EditProfile";
import { Link } from "react-router-dom";

export const mainListItems = (
  <div>

<ListItem button component={Link} to="/managerView">
   
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="ManagerView" />
    </ListItem>
    
    <ListItem button component={Link} to="/manageMovies">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Add/Delete Movies" />
    </ListItem>
    <ListItem button component={Link} to="/manageSnacks">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Add/Delete Snacks" />
    </ListItem>
    <ListItem button component={Link} to="/customerChat">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Customer Chat Requests" />
    </ListItem>
    <ListItem button component={Link} to="/transactionPage">
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Transaction History" />
    </ListItem>
    <ListItem button component={Link} to="/reviewPage">
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Reviews" />
    </ListItem>
  </div>
);

