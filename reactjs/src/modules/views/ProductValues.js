import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';
import ticket from '../assets/ticket.png';
import easy from '../assets/easy123.png';
import save from '../assets/savemoney.png';

const styles = (theme) => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    // backgroundColor: theme.palette.secondary.light,
    backgroundColor: '#222325'
    
  },
  container: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(30),
    display: 'flex',
    position: 'relative',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
    
  },
  image: {
    height: 100,
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
  },
});

function ProductValues(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container} >
        <Grid container spacing={5}>

          {/* Photo, header, textbox 1 */}
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src={ticket}  
                alt="ticket"
              />
              <Typography variant="h6" className={classes.title}>
                The best movie options
              </Typography>
              <Typography variant="h5">
                {'From the latest action thrillers to the classic love stories that keep you coming back for more, '}
                {'we think we have just the movie for you.'}
              </Typography>
            </div>
          </Grid>

          {/* Photo, header, textbox 2 */}
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src={easy}
                alt="easy123"
              />
              <Typography variant="h6" className={classes.title}>
                The easiest process
              </Typography>
              <Typography variant="h5">
                {'Sign up, find theaters and viewings near you, select your snacks, and go!'}
              </Typography>
            </div>
          </Grid>

          {/* Photo, header, textbox 3 */}
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src={save}
                alt="savemoney"
              />
              <Typography variant="h6" className={classes.title}>
                The best deals
              </Typography>
              <Typography variant="h5">
                {'By signing up, you will gain access to deals '}
                {'that you will find nowhere else.'}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

ProductValues.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductValues);