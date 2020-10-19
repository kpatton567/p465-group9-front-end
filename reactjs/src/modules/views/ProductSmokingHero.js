import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import Typography from '../components/Typography';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#363636',
    maxWidth: '100%',
    color: '#FFFFFF',
  },
  button: {
    border: '4px solid currentColor',
    borderRadius: 0,
    height: 'auto',
    padding: theme.spacing(2, 5),
    color:'#FFFFFF'
  },
  link: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    color: '#FFFFFF',
  },
  buoy: {
    width: 60,
  },
});

function ProductSmokingHero(props) {
  const { classes } = props;

  return (
    <Container className={classes.root} component="section">
      <Button 
        className={classes.button}
        href="/support"
      >
        <Typography variant="h4" component="span" className={classes.root}>
          {'Questions? Need help?'}
        </Typography>
      </Button>
      <Typography variant="subtitle1" className={classes.link}>
        {'We are here to help. Contact us!'}
      </Typography>
    </Container>
  );
}

ProductSmokingHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductSmokingHero);