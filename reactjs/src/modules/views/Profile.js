import React from 'react';
import classNames from "classnames";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { BrowserRouter as Router } from 'react-router-dom';
import { styles as toolbarStyles } from '../components/Toolbar';
import { useAuth0 } from '@auth0/auth0-react';
import Person from "@material-ui/icons/Person";
import Button from "../components/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from '../components/Paper';
import Grow from "@material-ui/core/Grow";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
import HistoryIcon from '@material-ui/icons/History';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SettingsIcon from '@material-ui/icons/Settings';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import { Redirect } from "react-router-dom";
import Can from "../../Can";
import { AuthConsumer } from "../../authContext";

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

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
  buttonLink: {
    marginRight: theme.spacing(4)
  }
});

function Profile(props) {
  const { classes } = props;
  const [openProfile, setOpenProfile] = React.useState(null);

  const { logout, user } = useAuth0();

  const handleClickProfile = event => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };

  return (
    <Router>
      <div>
        <div className={classes.manager}>
          <Button
            justIcon={window.innerWidth > 959}
            simple={(!(window.innerWidth > 959)).toString()}
            aria-owns={openProfile ? "profile-menu-list-grow" : null}
            aria-haspopup="true"
            onClick={handleClickProfile}
            className={classes.buttonLink}
          >
            <Person color='secondary' className={classes.icons} />
            <Hidden mdUp implementation="css">
              <p className={classes.linkText}>Profile</p>
            </Hidden>
          </Button>
          <Poppers
            open={Boolean(openProfile)}
            anchorEl={openProfile}
            transition
            disablePortal
            className={
              classNames({ [classes.popperClose]: !openProfile }) +
              " " +
              classes.popperNav
            }
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="profile-menu-list-grow"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom"
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleCloseProfile}>
                    <MenuList role="menu">

                      <Link href="/editProfile">
                        <StyledMenuItem href="/editProfile" >

                          <ListItemIcon>
                            <PersonIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Edit Profile" />

                        </StyledMenuItem>
                      </Link>

                      <Link href="/bookingHistory">
                        <StyledMenuItem>
                          <ListItemIcon>
                            <HistoryIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Booking History" />
                        </StyledMenuItem>
                      </Link>
                      <Link href="/editProfile">
                        <StyledMenuItem>
                          <ListItemIcon>
                            <AttachMoneyIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Rewards" />
                        </StyledMenuItem>
                      </Link>
                      <Link href="/editProfile">
                        <StyledMenuItem>
                          <ListItemIcon>
                            <ContactSupportIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Help and Support" />
                        </StyledMenuItem>
                      </Link>
                      <Link href="/editProfile">
                        <StyledMenuItem>
                          <ListItemIcon>
                            <SettingsIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Settings" />
                        </StyledMenuItem>
                      </Link>

                      {/* <AuthConsumer>
                      <Can
                        role={user.role}
                        perform="manager-page:visit"
                        yes={() => (
                          <Link href="/managerView">
                          <StyledMenuItem>
                            <ListItemIcon>
                              <SettingsIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Manager View" />
                          </StyledMenuItem>
                          </Link>

                        )}
                        no={() => <Redirect to="/" />}
                      />
                      </AuthConsumer> */}
                      <Divider light />

                      <StyledMenuItem onClick={logout}>
                        <ListItemIcon>
                          <ExitToAppIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Sign out" />
                      </StyledMenuItem>

                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Poppers>
        </div>
      </div>
    </Router>
  );
}


Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);