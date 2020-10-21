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

function ManageMovies() {

  return (
    <React.Fragment >
      <AppAppBar />
      <Typography variant="h6" gutterBottom>
        Movie Information
      </Typography>
      <Grid container spacing={3}>
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
            id="moviePosterURL"
            name="moviePosterURL"
            label="Movie Poster URL"
            fullWidth
          />
        </Grid>
        <Typography variant="h6" gutterBottom>
          Movie Pricing
        </Typography>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="price"
            name="price"
            label="Snack Price"
            fullWidth

          />
        </Grid>
      </Grid>
      <AppFooter />
    </React.Fragment>
  );
}

// export default withRoot(Index);
export default withRoot(ManageMovies);