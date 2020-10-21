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

function ManageSnacks() {

  return (
    <React.Fragment >
      <AppAppBar />
      <Typography variant="h6" gutterBottom>
        Snack Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="snackName"
            name="snackName"
            label="Snack Name"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="snackCost"
            name="snackCost"
            label="Snack Price"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="snackImageURL"
            name="snackImage"
            label="Snack Image URL"
            fullWidth
          />
        </Grid>
        <Typography variant="h6" gutterBottom>
          Movie Pricing
        </Typography>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="adultPrice"
            name="adultPrice"
            label="Adult Ticket Price"
            fullWidth

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            id="childPrice" 
            name="childPrice" 
            label="Child Ticket Price" 
            fullWidth />
        </Grid>
      </Grid>
      <AppFooter />
    </React.Fragment>
  );
}

// export default withRoot(Index);
export default withRoot(ManageSnacks);