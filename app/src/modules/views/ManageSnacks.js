import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import Container from '@material-ui/core/Container';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems } from './listItems';
import AppAppBar from './../views/AppAppBar';
import FormFeedback from '.././form/FormFeedback';
import RFTextField from '.././form/RFTextField';
import { Field, Form, FormSpy } from 'react-final-form';
import GridContainer from "../components/GridContainer.js";
import Grid from '@material-ui/core/Grid';
import FormButton from '.././form/FormButton';
import axios from 'axios';
import  { ACCESS_TOKEN_NAME,apiVariables } from '../../APIConstants';
const drawerWidth = 250;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    // whiteSpace: 'nowrap',
    backgroundColor: '#0c0c0c',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  dividerColor: {
    backgroundColor: '#800000',
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));
export default function ManageMovies() {
  var token = localStorage.getItem(ACCESS_TOKEN_NAME);
  const [snackName, setsnackName] = React.useState('');
  const [snackPrice, setsnackPrice] = React.useState('');
  const handleSubmit = () => {
    setSaved(true);
  };
  const [sent, setSaved] = React.useState(false);
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleSubmitClick = (e) => {
    e.preventDefault();
    const payload = {
      "snackName": snackName,
      "snackPrice": snackPrice,
    }
    axios.post((apiVariables.apiUrl + '/api/manage/add_snack'), payload,{
      headers: {
        "Authorization": 'Bearer ' + token
      }
    })
      .then(function (response) {

      })
      .catch(function (error) {
        console.log(error);
      });
      setsnackName("")
      setsnackPrice("")
  }
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <AppAppBar />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider classes={{root: classes.dividerColor}}/>
        <List>{mainListItems}</List>
        <Divider classes={{root: classes.dividerColor}}/>
      </Drawer>
      <main className={classes.content}
        style={{ background: '#0c0c0c' }}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="sm" className={classes.container}>
          <Form onSubmit={handleSubmit} subscription={{ submitting: true }} >
            {({ handleSubmit2, submitting }) => (
              <form onSubmit={handleSubmit2} className={classes.form} noValidate >
                <GridContainer spacing={3} fixed>
                  <Grid container spacing={3} alignItems="flex-start" direction = "collumn" justify = "left">
                    <Grid item xs={10} justify = "left">
                      <h6 style={{ color: '#800000' }}>Snack Name*</h6>
                      <Field
                        autoFocus
                        component={RFTextField}
                        color = "secondary"
                        id="snackName"
                        name="snackName"
                        variant="outlined"
                        defaultValue={snackName}
                        onChange={event => setsnackName(event.target.value)}
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={10}>
                      <h6 style={{ color: '#800000' }}>Snack Price*</h6>
                      <Field
                      
                        component={RFTextField}
                        color = "secondary"
                        variant="outlined"
                        id="snackPrice"
                        name="snackPrice"
                        defaultValue={snackPrice}
                        onChange={event => setsnackPrice(event.target.value)}
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={10}justify="center">
                      <FormButton
                        color = "secondary"
                        className={classes.button}
                        disabled={submitting || sent}
                        onClick={handleSubmitClick}
                        fullWidth
                        className={classes.button}
                      >
                        Add Snack
                    </FormButton>
                  </Grid>
                  </Grid>
                  <FormSpy subscription={{ submitError: true }}>
                    {({ submitError }) =>
                      submitError ? (
                        <FormFeedback className={classes.feedback} error>
                          {submitError}
                        </FormFeedback>
                      ) : null
                    }
                  </FormSpy>

                </GridContainer>
              </form>
            )}
          </Form>
        </Container>
      </main>
    </div>
  );
}