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

  const WhiteTextTypography = withStyles({
    root: {
      color: "#FFFFFF"
    }
  })(Typography);  
const testMethod = () => {
  console.log("Test");
};
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    background: '#363636'
  },
  drawerPaper: {
    background: '#363636',
    position: 'relative',
    width: 250

  }
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
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
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
    <React.Fragment >
      <CssBaseline />
      <AppAppBar />
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper),
        }}
        anchor="left"
      >
        <Divider />
          <List>{mainListItems}</List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div />
        <Container maxWidth="sm" className={classes.container}
                   style = {{backgroundColor : '363636'}}>
          
          <Grid container spacing={0}>
            <WhiteTextTypography variant="h6" gutterBottom>
              Movie Information
            </WhiteTextTypography>
            <Grid container spacing={0}>
              <Grid item xs={12}>
              <style>{'body { background-color: #363636; }'}</style>
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