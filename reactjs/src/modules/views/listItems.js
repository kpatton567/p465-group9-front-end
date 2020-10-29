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
import FastfoodIcon from '@material-ui/icons/Fastfood';
import HistoryIcon from '@material-ui/icons/History';
import RateReviewIcon from '@material-ui/icons/RateReview';
import { Link } from "react-router-dom";

export const mainListItems = (
  <div>

<ListItem button component={Link} to="/managerView">
   
      <ListItemIcon>
        <DashboardIcon style = {{color : '800000'}}/>
      </ListItemIcon>
      <ListItemText 
      primary="ManagerView" 
      style={{ color: '#FFFFFF' }}/>
    </ListItem>
    
    <ListItem button component={Link} to="/manageMovies">
      <ListItemIcon>
        <ShoppingCartIcon style = {{color : '800000'}}/>
      </ListItemIcon>
      <ListItemText 
      primary="Add/Delete Movies" 
      style={{ color: '#FFFFFF' }}/>
    </ListItem>
    <ListItem button component={Link} to="/manageSnacks">
      <ListItemIcon>
        <FastfoodIcon style = {{color : '800000'}}/>
      </ListItemIcon>
      <ListItemText 
      primary="Add/Delete Snacks" 
      style={{ color: '#FFFFFF' }}/>
    </ListItem>
    <ListItem button component={Link} to="/customerChat">
      <ListItemIcon>
        <PeopleIcon style = {{color : '800000'}}/>
      </ListItemIcon>
      <ListItemText 
      primary="Customer Chat Requests" 
      style={{ color: '#FFFFFF' }}/>
    </ListItem>
    <ListItem button component={Link} to="/transactionPage">
      <ListItemIcon>
        <HistoryIcon style = {{color : '800000'}}/>
      </ListItemIcon>
      <ListItemText 
      primary="Transaction History" 
      style={{ color: '#FFFFFF' }}/>
    </ListItem>
    <ListItem button component={Link} to="/reviewPage">
      <ListItemIcon>
        <RateReviewIcon style = {{color : '800000'}}/>
      </ListItemIcon>
      <ListItemText 
      primary="Reviews" 
      style={{ color: '#FFFFFF' }}/>
    </ListItem>
    <ListItem button component={Link} to="/customerRequests">
      <ListItemIcon>
        <PeopleIcon style = {{color : '800000'}}/>
      </ListItemIcon>
      <ListItemText 
      primary="Customer Cancelation Requests" 
      style={{ color: '#FFFFFF' }}/>
    </ListItem>
  </div>
);

