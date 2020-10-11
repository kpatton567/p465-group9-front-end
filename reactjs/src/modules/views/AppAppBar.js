import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import AppBar from '../components/AppBar';
import Toolbar, { styles as toolbarStyles } from '../components/Toolbar';
import { useAuth0 } from '@auth0/auth0-react';
import Profile from '../views/Profile';

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
});

function AppAppBar(props) {
  const { classes } = props;
  const { loginWithRedirect} = useAuth0();
  const { logout, isAuthenticated } = useAuth0();
  return isAuthenticated ? (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <div className={classes.left} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            className={classes.title}
            href="/premium-themes/onepirate/"
          >
            {'Prevue'}
          </Link>
          <div className={classes.right}>
            {/* <Link
              color="inherit"
              variant="h6"
              underline="none"
              className={classes.rightLink}
              // href="/premium-themes/onepirate/sign-in/"
              onClick={() => loginWithRedirect()}
            >
              {'Sign In'}
            </Link> */}
            {/* <Link
              variant="h6"
              underline="none"
              className={clsx(classes.rightLink, classes.linkSecondary)}
              href="/premium-themes/onepirate/sign-up/"
            >
              {'Sign Up'}
            </Link> */}
            <Link
              
              variant="h6"
              underline="none"
              className={clsx(classes.rightLink, classes.linkSecondary)}
              style={{display: isAuthenticated ? 'block' : 'none' }}
              // href="/premium-themes/onepirate/sign-up/"
              onClick={() => logout()}
            ></Link>
            <Link>{ isAuthenticated ? <Profile/> : null }</Link> 
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  ) : 
  (<div>
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>
        <div className={classes.left} />
        <Link
          variant="h6"
          underline="none"
          color="inherit"
          className={classes.title}
          href="/premium-themes/onepirate/"
        >
          {'Prevue'}
        </Link>
        <div className={classes.right}>
          <Link
            color="inherit"
            variant="h6"
            underline="none"
            className={classes.rightLink}
            // href="/premium-themes/onepirate/sign-in/"
            onClick={() => loginWithRedirect()}
          >
            {'Sign In'}
          </Link>
          <Link
            variant="h6"
            underline="none"
            className={clsx(classes.rightLink, classes.linkSecondary)}
            href="/premium-themes/onepirate/sign-up/"
          >
            {'Sign Up'}
          </Link>
        </div>
      </Toolbar>
    </AppBar>
    <div className={classes.placeholder} />
  </div>);
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppAppBar);