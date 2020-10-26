// --- Post bootstrap -----
import withRoot from './../withRoot';
import React,{useState} from 'react';
import AppFooter from './../views/AppFooter';
import AppAppBar from './../views/AppAppBar';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import { mainListItems } from './listItems';
import Button from '@material-ui/core/Button';
import axios from 'axios';
const drawerWidth = 240;

// const makePostRequest(path, queryObj) { 


const testMethod = () => {
  console.log("Test");
};


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    color: '#363636'
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
    color: theme.palette.grey[800],
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
    color: theme.palette.grey[800],
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {

  },
}));
function ManageMovies() {
  const [state, setState] = useState({
    movieTitle: "",
    movieDesc: "",
    movieURL: "",
    movieGenre: ""
  })
  const handleChange = (e) => {
    const { id, value } = e.target
    setState(prevState => ({
      ...prevState,
      [id]: value
    }))
  }
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const makePostRequest = (path, queryObj) => {
    queryObj = {
      movieTitle: document.getElementById("movieTitle"),
      movieDesc: document.getElementById("movieDesc"),
      movieURL: document.getElementById("moviePosterURL"),
      movieGenre: document.getElementById("movieGenre")
    };
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
          // if(error.response.data.message === "Email already registered")
          // {
          //     props.showError("Email already registered");
          // }
          // if(error.response.data.message === "Incorrect Password")
          // {
          //     props.showError("Incorrect password entered. Please re check.");
          // }
          console.log(error);
        });
    }
  return (
    <React.Fragment >
      <CssBaseline />
      <AppAppBar />
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
                  value={state.movieTitle}
                  onChange={handleChange}
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
                  value={state.movieDesc}
                  onChange={handleChange}
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
                  value={state.movieGenre}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="movieURL"
                  name="movieURL"
                  label="Movie Poster URL"
                  value={state.movieURL}
                  onChange={handleChange}
                  fullWidth
                  required
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
                onClick={handleSubmitClick}
                className={classes.button}
              >
                Add Movie
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