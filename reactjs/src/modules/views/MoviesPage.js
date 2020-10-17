import React from 'react';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import AppAppBar from './AppAppBar';
import { withTheme } from '@material-ui/styles';
import Typography from '../components/Typography';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing(8, 0, 1),
    color: '#FFFFFF'
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(6),
    backgroundColor: theme.palette.primary.light,
    maxWidth: '100%',
  },
  card: {
    height: '100%', // height of white box
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '140%', // height of photo
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing(6),
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(5),
    },
  },


  // For footer button
  root: {
    color: theme.palette.common.black,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      height: '80vh',
      minHeight: 10,
      maxHeight: 40,
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#363636',
    maxWidth: '100%',
  },
  button: {
    minWidth: 250,
    marginBottom: theme.spacing(4),
  },

}));


// Build URL with movie name
function CreateUrl(image)
{
  var mov = "/movies/"
  var res = mov.concat(image);

  return res;
}

var cards = [];

// Array for storing various movies, need to get from backend...
axios.get('http://localhost:8080/api/home/movies')
.then(response => 
  {
    cards = response.data;
  }
);



// insert into movies values(2, 
//                           'Action, action, and more action. Thats what its all about.', 
//                           'https://media-cache.cinematerial.com/p/500x/jllmn2cv/behind-you-movie-poster.jpg?v=1600320617', 
//                           'Behind You');
export default function Album() {
  const classes = useStyles();

  console.log(cards[0]);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppAppBar position="relative">
        <Toolbar>
          <CameraIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Album layout
          </Typography>
        </Toolbar>
      </AppAppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography color="inherit" align="center" variant="h2" marked="center" gutterBottom>
              {'All Movies'}
            </Typography>
            <Typography variant="h5" align="center" paragraph className={classes.h5}>
              {'Browse our numerous movie options below and find one that is best for you!'}
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="lg">
          {/* End hero unit */}


          {/* Generate cards based on number of elements in 'cards' array */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={2} lg={3}>
               
                {/* Create each card using array from backend */}
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.posterLink}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.title}
                    </Typography>
                    <Typography>
                      {card.description}
                    </Typography>
                  </CardContent>

                  {/* More Info Button */}
                  <CardActions>
                    <Button size="small" color="primary">
                      {'More Info'}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>

      
      {/* Button at bottom of page to bring user back to top of page */}
      <section className={classes.root}>
        <Container className={classes.container}>
          <Button
          color="secondary"
          variant="contained"
          size="large"
          className={classes.button}
          href="/movies"
          >
            {'Back to Top'}
          </Button>
          
        </Container>
      </section>
    </React.Fragment>
  );
}