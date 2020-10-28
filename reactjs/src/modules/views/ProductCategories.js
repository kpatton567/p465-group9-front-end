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
import axios from 'axios';
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
  var mov = "/movieBooking/"
  var res = mov.concat(image);
  return res;
}


// Movie panels
function ProductCategories(props) 
{
  const { classes } = props;
  const [images, setImages] = React.useState([]);
  const fetchData = React.useCallback(() => {
    axios({
      "method": "GET",
      "url": 'http://localhost:8080/api/home/movies'
    })
      .then((response) => {
        // setImages(response.data)
        setImages([...images,
          {
            url: response.data[0].posterLink,
            title: response.data[0].title,
            width: '33%',
            id: '1',
          },
          {
            url: response.data[1].posterLink,
            title: response.data[1].title,
            width: '33%',
            id: '2',
          },
          {
            url: response.data[2].posterLink,
            title: response.data[2].title,
            width: '33%',
            id: '3',
          },
          {
            url: response.data[3].posterLink,
            title: response.data[3].title,
            width: '33%',
            id: '4',
          },
          {
            url: response.data[4].posterLink,
            title: response.data[4].title,
            width: '33%',
            id: '5',
          },
          {
            url: response.data[5].posterLink,
            title: response.data[5].title,
            width: '33%',
            id: '6',
          },
          {
            url: response.data[6].posterLink,
            title: response.data[6].title,
            width: '33%',
            id: '7',
          },
          {
            url: response.data[7].posterLink,
            title: response.data[7].title,
            width: '33%',
            id: '8',
          },
          {
            url: response.data[8].posterLink,
            title: response.data[8].title,
            width: '33%',
            id: '9',
          }
      ,]);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  React.useEffect(() => {
    fetchData()
  }, [fetchData])
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
              href={CreateUrl(image.id)} // send the user to the url according to the panel they clicked
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