import React, {useState} from 'react';
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
import FormButton from '.././form/FormButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import FormFeedback from '.././form/FormFeedback';
import RFTextField from '.././form/RFTextField';
import { Field, Form, FormSpy } from 'react-final-form';
import GridContainer from "../components/GridContainer.js";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems } from '../views/listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AppAppBar from './../views/AppAppBar';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

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
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
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
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [state, setState] = useState({
    movieTitle: "",
    movieDesc: "",
    movieURL: "",
    movieGenre: ""
  })
  const [sent, setSaved] = React.useState(false);
  const handleChange = (e) => {
    const { id, value } = e.target
    setState(prevState => ({
      ...prevState,
      [id]: value
    }))
  }
  const handleSubmit = () => {
    setSaved(true);
  };
  const handleSubmitClick = (e) => {
    e.preventDefault();
    const payload = {
      "movieTitle": state.movieTitle,
      "movieDesc": state.movieDesc,
      "movieURL" :state.movieURL,
      "movieGenre" : state.movieGenre
    }
      axios.post('http://localhost:8080/api/manage/add_movie', payload)
        .then(function (response) {
          if (response.status === 200) {
            setState(prevState => ({
              ...prevState,
              'successMessage': 'Login successful. Redirecting to home page..'
            }))
            console.log(response.data)
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppAppBar/>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        {/* <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div> */}
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                        {/* <Container maxWidth="sm" className={classes.container}
                   style = {{backgroundColor : '363636'}}> */}
          <Container>
          <Form onSubmit={handleSubmit} subscription={{ submitting: true }} >
                  {({ handleSubmit2, submitting }) => (
                    <form onSubmit={handleSubmit2} className={classes.form} noValidate >
                      <GridContainer justify="center" spacing={2}maxWidth = "sm">
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Field
                            autoFocus
                            component={RFTextField}
                            id="movieTitle"
                            name="movieTitle"
                            label="Movie Title"
                            value={state.movieTitle}
                            onChange={handleChange}
                            fullWidth
                            required
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Field
                            component={RFTextField}
                            id="movieDesc"
                            name="movieDesc"
                            label="Movie Description"
                            value={state.movieDesc}
                            onChange={handleChange}
                            fullWidth
                            required
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Field
                            component={RFTextField}
                            id="movieGenre"
                            name="movieGEnre"
                            label="Movie Genre"
                            value={state.movieGenre}
                            onChange={handleChange}
                            fullWidth
                            required
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Field
                            component={RFTextField}
                            id="URL"
                            name="movieURL"
                            label="Movie URL"
                            value={state.movieURL}
                            onChange={handleChange}
                            fullWidth
                            required
                          />
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
                      <FormButton
                        // className={classes.button}
                        disabled={submitting || sent}
                        onClick={handleSubmitClick}
                        fullWidth
                      
                        className={classes.button}
                      >
                        Add Movie
                      </FormButton>
                      </GridContainer>
                    </form>
                  )}
                </Form>
        </Container>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}