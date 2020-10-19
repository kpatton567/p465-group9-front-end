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

function ReviewPage() {

  return (
    <React.Fragment >
      <AppAppBar />
      <AppFooter />
    </React.Fragment>
  );
}

// export default withRoot(Index);
export default withRoot(ReviewPage);