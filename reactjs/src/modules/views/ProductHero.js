import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';
<<<<<<< .merge_file_Gtjziz
=======
import { useAuth0 } from '@auth0/auth0-react';
import rawTheme from '../theme'

>>>>>>> .merge_file_496xgC

const backgroundImage =
    //'https://cdn.hipwallpaper.com/i/30/27/p5PtNh.jpg'; // option 1 (color: #C40808)
    'https://images.all-free-download.com/images/graphiclarge/film_film_vector_289584.jpg'; // option 2
const styles = (theme) => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#7fc7d9', // Average color of the background image. 
    backgroundPosition: 'center',
  },
  button: {
    minWidth: 200,
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10),
    },
  },
  more: {
    marginTop: theme.spacing(2),
  },
});

function ProductHero(props) {
  const { classes } = props;

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      
      {/* Increase the network loading priority of the background image. */}
<<<<<<< .merge_file_Gtjziz
      <img style={{ display: 'none' }} src={backgroundImage} alt="increase priority" />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Upgrade your Sundays
=======
      <img 
        style={{ display: 'none' }} 
        src={backgroundImage} 
        alt="increase priority" 
      />
      
      {/* Big center text */}
      <Typography color="inherit" align="center" variant="h2" marked="center">
        {'Find your theater now!'}
>>>>>>> .merge_file_496xgC
      </Typography>
      <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
<<<<<<< .merge_file_Gtjziz
        Enjoy secret offers up to -70% off the best luxury hotels every Sunday.
      </Typography>
=======
        {'Sign up and start saving on your movie watching experience today!'}
      </Typography>

      {/* Big sign up button */}
>>>>>>> .merge_file_496xgC
      <Button
        color="secondary"
        variant="contained"
        size="large"
        className={classes.button}
        component="a"
        href="/premium-themes/onepirate/sign-up/"
      >
<<<<<<< .merge_file_Gtjziz
        Register
      </Button>
      <Typography variant="body2" color="inherit" className={classes.more}>
        Discover the experience
=======
        {'SIGN UP'}
      </Button>
      <Typography variant="body2" color="inherit" className={classes.more}>
        {'Welcome to the future of movie viewing'}
>>>>>>> .merge_file_496xgC
      </Typography>
    </ProductHeroLayout>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);