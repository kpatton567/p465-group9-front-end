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
import prevueLogo from '../assets/prevueLogo.png';

const styles = (theme) => ({
  placeholder: toolbarStyles(theme).root,
  leftLinkActive: {
    color: theme.palette.common.white,
  },

  // Login buttons
  right: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(0),
  },
  // Title, left justified
  left: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
  },
  leftLink: {
    fontSize: 28,
    color: theme.palette.common.white,
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(4),
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
    marginRight: theme.spacing(3),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },

  // For the magnifying glass
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
          <Toolbar>
           {/* PreVue Logo */}
           <div className={classes.left}>
              <div className={classes.leftLink}>
                <Link href='/'>
                  <img
                    src={prevueLogo}
                    alt="prevueLogo"
                    height='40'
                  />
                </Link>
              </div>
            </div>

            {/* Search bar */}
            <div className={classes.search}>
              <div className={classes.searchIcon}><SearchIcon /></div>
              <InputBase
                placeholder="Search for viewings..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            
            {/* Profile Icon */}
            <div className={classes.right}>
              <Link
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
          <Toolbar>
           
            {/* PreVue Logo */}
            <div className={classes.left}>
              <div className={classes.leftLink}>
                <Link href='/'>
                  <img
                    src={prevueLogo}
                    alt="prevueLogo"
                    height='40'
                  />
                </Link>
              </div>
            </div>

            {/* Search bar */}
            <div className={classes.search}>
              <div className={classes.searchIcon}><SearchIcon /></div>
              <InputBase
                placeholder="Search for viewings..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>

            {/* Log In/Sign up buttons */}
            <div className={classes.right}>
              <div>
                <Button onClick={handleClickOpen} color="inherit"
                  // variant="h6"
                  underline="none"
                  // removed root in line below, might need
                  className={classes.rightLink}
                  onClick={() => loginWithRedirect()}
                  // onClick={ () => handleLogin() }
                  >Log in / Sign up</Button>
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