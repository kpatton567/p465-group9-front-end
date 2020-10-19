import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from "react-router-dom";
import { AuthConsumer } from "../../../src/authContext";
import Can from "../../Can";
import Logout from "../../Logout";
import Profile from "./Profile";
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';
import Link from '@material-ui/core/Link';
import ButtonBase from '@material-ui/core/ButtonBase';

// import PostsList from "../../PostsList";

const styles = (theme) => ({
  root: {
    backgroundColor: '#363636',
    color: '#FFFFFF',
  },
  images: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    position: 'relative',
    display: 'block',
    padding: 0,
    borderRadius: 0,
    height: '60vh', // changes height of movie poster, 60 seems to show poster near-perfectly
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      height: 100,
    },
    '&:hover': {
      zIndex: 1,
    },
    '&:hover $imageBackdrop': {
      opacity: 0.15,
    },
    '&:hover $imageMarked': {
      opacity: 0,
    },
    '&:hover $imageTitle': {
      border: '4px solid currentColor',
    },
  },

  // Button on image
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },

  // Image
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 60%',
  },

  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create('opacity'),
  },

  // Text on each panel
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 14px`,
  },

  // Line below text on each panel
  imageMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },

  h5: {
    marginTop: theme.spacing(2),
   
  },
});



// Concatenate the name of the movie to redirect the user to the proper url
function CreateUrl(image)
{
  var mov = "/movies/"
  var res = mov.concat(image);

  return res;
}

// Movie panels
function ProductCategories(props) {
  const { classes } = props;

  // 9 movie panels
  const images = [
    {
      url:
        'https://images-na.ssl-images-amazon.com/images/I/81ai6zx6eXL._AC_SL1304_.jpg',
      title: 'Avengers: End Game',
      width: '33%',
    },
    {
      url:
        'https://media-cache.cinematerial.com/p/500x/jllmn2cv/behind-you-movie-poster.jpg?v=1600320617',
      title: 'Behind You',
      width: '33%',
    },
    {
      url:
        'https://www.metaflix.com/wp-content/uploads/2020/09/The-Wolf-of-Snow-Hollow-Movie-Poster.jpg',
      title: 'The Wolf of Snow Hollow',
      width: '33%',
    },
    {
      url:
        'https://m.media-amazon.com/images/M/MV5BMDdlNDNkMzQtMjYwMi00OGFjLWE4ZGQtYjA1YWMxOWM2ZGYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UY1200_CR90,0,630,1200_AL_.jpg',
      title: 'The Owners',
      width: '33%',
    },
    {
      url:
        'https://lh3.googleusercontent.com/proxy/uUvZSXExwTBl5ZI6M0bphxHzZKyHh3ItE9jeDq7SHSHJ-RiLlG7hRe7GzK1EhM6CUm1AoUJF3t7e73H8JaXWC93VrGWe5hnApFp4E4hHOU0b',
      title: 'Guest House',
      width: '33%',
    },
    {
      url:
        'https://lh3.googleusercontent.com/proxy/3O1fOJyvqSV95jXFV9Rm_CApGSRb6UAc03A57FrE2apBDjGWGGe6T4uKJtmFyAVZqtdD32WbRh_IF2tIqTrzrsEbzB3SJlA5E9UowzX8RoZbPA',
      title: 'Irresistable',
      width: '33%',
    },
    {
      url:
        'https://m.media-amazon.com/images/M/MV5BOTdmZTk2YmItMzgzMy00MWRhLTg4MzctNTJmYzM5MzE0NmM2XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg',
      title: 'The Secrets We Keep',
      width: '33%',
    },
    {
      url:
        'https://i.redd.it/4nlz0va50cf41.png',
      title: 'Target Number One',
      width: '33%',
    },
    {
      url:
        'https://m.media-amazon.com/images/M/MV5BYjE2MjIwMmYtM2ZiMy00MzdmLTkyNTYtNmFiNjM5MDJhMGVmXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg',
      title: 'The Silencing',
      width: '33%',
    },
  ];

  return (
    // Makes the background entirely black
    <Container
      className={classes.root} 
      component="section"
      maxWidth="xl"
    >
      <Container 
        className={classes.root} 
        component="section"
      >
    
        {/* Big text above movie panels */}
        <Typography variant="h4" marked="center" align="center" component="h2" className={classes.root}>
          {'Check out these highly rated options'}
        </Typography>


        {/* Do the following for each image panel (map) */}
        <div className={classes.images}>
          {images.map((image) => (
            <ButtonBase
              key={image.title}
              className={classes.imageWrapper}
              style={{
                width: image.width,
              }}
              href={CreateUrl(image.title)} // send the user to the url according to the panel they clicked
            >
              {/* Import image from url */}
              <div
                className={classes.imageSrc}
                style={{
                  backgroundImage: `url(${image.url})`,
                }}
              />
              <div className={classes.imageBackdrop} />
              <div className={classes.imageButton}>
                <Typography
                  component="h3"
                  variant="h6"
                  color="inherit"
                  className={classes.imageTitle}
                >
                  {image.title}
                  <div className={classes.imageMarked} />
                </Typography>
              </div>
            </ButtonBase>
          ))}
        </div>

        {/* Link to more movies below panels */}
        <Typography variant="h4" align="center" component="h2" className={classes.h5}>
        <Link
            variant="h5"
            underline="none"
            color="inherit"
            marked="center"
            href="/movies"
            className={classes.root}
          >          
            {'Click here to view more'}
          </Link>
        </Typography>
      </Container>
    </Container>
  );
}

ProductCategories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductCategories);