import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles, fade } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import AppBar from '../components/AppBar';
import Toolbar, { styles as toolbarStyles } from '../components/Toolbar';
import { useAuth0 } from '@auth0/auth0-react';
import Profile from '../views/Profile';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import FaceIcon from '@material-ui/icons/Face';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import theme from "../theme";

import { AuthConsumer } from "../../authContext";

import Login from "../../Login"


const styles = (theme) => ({
  title: {
    fontSize: 24,
  },

  placeholder: toolbarStyles(theme).root,

  toolbar: {
    justifyContent: 'space-between',
  },

  left: {
    flex: 1,
  },

  leftLinkActive: {
    color: theme.palette.common.white,
  },

  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },

  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },

  linkSecondary: {
    color: theme.palette.secondary.main,
  },
  largeIcon: {
    fontSize: "7em"
  },
  successIcon: {
    color: 'green',
  },

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(-32),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },

  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputRoot: {
    color: 'inherit',
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },

});


function AppAppBar(props) {
  const { classes } = props;
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // Change header according to whether user is logged in
  return isAuthenticated ?
    // User is logged in
    (
      
      <div>
        <AppBar position="fixed">
          <Toolbar className={classes.toolbar}>

            {/* Search bar */}
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search for viewings..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>


            {/* PreVue title/link */}
            <div className={classes.left} />
            <Link
              // variant="h6"
              underline="none"
              color="inherit"
              className={classes.title}
              href="/"
            >
              {'PREVUE'}
            </Link>

            {/* Logout button */}
            <div className={classes.right}>
              <Link
                // variant="h6"
                underline="none"
                className={clsx(classes.rightLink, classes.linkSecondary)}
                style={{ display: isAuthenticated ? 'block' : 'none' }}
              ></Link>
              <Link>{isAuthenticated ? <Profile /> : null}</Link>
            </div>
          </Toolbar>
        </AppBar>
       
        <div className={classes.placeholder} />
      </div>
    ) :

    // Not logged in
    (
    <div>
    
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>


          {/* Search bar */}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search for viewings..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>

          {/* PreVue title/link */}
          <div className={classes.left} />
          <Link
            // variant="h6"
            underline="none"
            color="inherit"
            className={classes.title}
            href="/"
          >
            {'PREVUE'}
          </Link>


          {/* Log In/Sign up buttons */}
          <div className={classes.right}>
            <div>
            <Button onClick={handleClickOpen} color="inherit"
                // variant="h6"
                underline="none"
                // removed root in line below, might need
                className={classes.rightLink}>Log in / Sign up</Button>
              <Button onClick={handleClickOpen} color="inherit"
                // variant="h6"
                underline="none"
                // removed root in line below, might need
                className={classes.rightLink}>Log in / Sign up</Button>
              <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Choose your profile</DialogTitle>
                <DialogContent>
                {/* <Button style={{ marginRight: theme.spacing(6) }}onClick={() => login({ appState: { returnTo: { pathname, query } } })}></Button> */}
                  <Button style={{ marginRight: theme.spacing(6) }} onClick = {() => loginWithRedirect()}>
                  
                  {/* <AuthConsumer>
                  {({ initiateLogin }) => (
                    <button className="btn btn-sm btn-primary" >
                     
                     <Button style={{ marginRight: theme.spacing(6) }}  onClick={initiateLogin}>
                      <FaceIcon fontSize="large" className={classes.largeIcon}></FaceIcon>
                      </Button>
                      Login
                    </button>
                  )}
                </AuthConsumer> */}
                    <FaceIcon fontSize="large" className={classes.largeIcon}></FaceIcon>
                    Customer
                  </Button>
                  <Button style={{ marginRight: theme.spacing(6) }}>
                    <SupervisorAccountIcon fontSize="large" className={classes.largeIcon} onClick = {() => loginWithRedirect()}></SupervisorAccountIcon>
                    Manager
                  </Button>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
          </Button>
                  <Button onClick={handleClose} color="primary">
                    Ok
          </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
    );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppAppBar);

// import React from "react";
// import { Redirect } from "react-router-dom";

// import { AuthConsumer } from "../../authContext";
// import Login from "../../Login";

// const AppAppBar = () => (
//   <AuthConsumer>
//     {({ authenticated }) =>
//       authenticated ? (
//         <Redirect to="/dashboard" />
//       ) : (
//         <div>
//           {/* <h2>Welcome to React RBAC Tutorial.</h2> */}
//           <Login />
//         </div>
//       )
//     }
//   </AuthConsumer>
// );

// export default AppAppBar;