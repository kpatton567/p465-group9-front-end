import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import ProductCategories from './modules/views/ProductCategories';
import ProductSmokingHero from './modules/views/ProductSmokingHero';
import AppFooter from './modules/views/AppFooter';
import ProductHero from './modules/views/ProductHero';
import ProductValues from './modules/views/ProductValues';
import ProductHowItWorks from './modules/views/ProductHowItWorks';
import ProductCTA from './modules/views/ProductCTA';
import AppAppBar from './modules/views/AppAppBar';
import { useAuth0 } from '@auth0/auth0-react';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

function Home() {

  const { isLoading } = useAuth0();
  // const useStyles = makeStyles((theme) => ({
  //   rootTest: {
  //     backgroundColor: '#222325'
  // }}))
  // const classes = useStyles();

  if (isLoading) return <div>Loading...</div>

  return (
    <React.Fragment >
      <AppAppBar />
      <ProductHero />
      <ProductValues />
      <ProductCategories />
      {/* <ProductHowItWorks /> */}
      {/* <ProductCTA /> */}
      <ProductSmokingHero />
      <AppFooter />
    </React.Fragment>
  );
}

// export default withRoot(Index);
export default withRoot(Home);