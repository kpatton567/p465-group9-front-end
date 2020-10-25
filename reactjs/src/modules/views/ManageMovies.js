import withRoot from './../withRoot';
// --- Post bootstrap -----
import React from 'react';
import ProductCategories from './../views/ProductCategories';
import ProductSmokingHero from './../views/ProductSmokingHero';
import AppFooter from './../views/AppFooter';
import ProductHero from './../views/ProductHero';
import ProductValues from './../views/ProductValues';
import ProductHowItWorks from './../views/ProductHowItWorks';
import ProductCTA from './../views/ProductCTA';
import AppAppBar from './../views/AppAppBar';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems} from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { addSeconds } from 'date-fns';
const drawerWidth = 240;
queryObj = { movieTitle: document.getElementById("movieTitle"),
movieDesc: document.getElementById("movieDesc"),
movieURL: document.getElementById("moviePosterURL"),
movieGenre: document.getElementById("movieGenre") }; 
function makePostRequest(path, queryObj) { 
  axios.post(path, queryObj).then( 
      (response) => { 
          var result = response.data; 
          console.log(result); 
      }, 
      (error) => { 
          console.log(error); 
      } 
  ); 
} 



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: '#363636'
  },
  toolbar: {
    backgroundColor: '#363636',
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    backgroundColor: '#363636',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    backgroundColor: '#363636',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: 240,
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
    width: 250,
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
    // overflow: 'auto',
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
    
  },
}));
function ManageMovies() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <React.Fragment >
      <CssBaseline />
      <AppAppBar/>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={0}>
          <Typography variant="h6" gutterBottom>
            Movie Information
          </Typography>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="movieTitle"
                  name="movieTitle"
                  label="Movie title"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="movieDesc"
                  name="movieDesc"
                  label="Movie Description"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="movieGenre"
                  name="movieGenre"
                  label="Movie Genre"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="moviePosterURL"
                  name="moviePosterURL"
                  label="Movie Poster URL"
                  fullWidth
                />
              </Grid>
              <Typography variant="h6" gutterBottom>
                Movie Pricing
              </Typography>
              <Grid item sm={12}>
                <TextField
                  required
                  id="adultPrice"
                  name="adultPrice"
                  label="Adult Ticket Price"
                  fullWidth

                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  id="childPrice" 
                  name="childPrice" 
                  label="Child Ticket Price" 
                  fullWidth />
              </Grid>
              <Button
                variant="contained"
                color="primary"
                onClick={state.makePostRequest('http://localhost:8080/api/manage/add_movie', queryObj)}
                className={classes.button}
              >
              </Button>
            </Grid>
          </Grid>
          <Box pt={4}>

          </Box>
        </Container>
      </main>
      <AppFooter />
    </React.Fragment>
    
  );

}

// export default withRoot(Index);
export default withRoot(ManageMovies);