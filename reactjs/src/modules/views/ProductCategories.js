import React, {Component} from 'react';
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
import theme from '../theme';



// import PostsList from "../../PostsList";


  const root = {
    backgroundColor: '#363636',
    color: '#FFFFFF',
  };

  const images = {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexWrap: 'wrap',
  };

  const imageWrapper = {
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
  };

  // Button on image
  const imageButton = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  };

  // Image
  const imageSrc = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 60%',
  };

  const imageBackdrop = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create('opacity'),
  };

  // Text on each panel
  const imageTitle = {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 14px`,
  };

  // Line below text on each panel
  const imageMarked = {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  };

  const h5 = {
    marginTop: theme.spacing(2),
  };




// Movie panels
class ProductCategories extends Component 
{
  constructor(props) {
    super(props); 
    this.state = {         
      cards: [], 
    }; 
  }

  componentDidMount() {
    const fetchMovies = async () => {
      const res = await axios.get('http://localhost:8080/api/home/movies');
      this.setState({ cards: res.data })
    };
    fetchMovies();
  }

  handleSubmitClick(e) {
    console.log("Test");
  }


  render() {
    const { cards } = this.state;

    // 9 movie panels
    const images = [
      {
        url: cards[0].posterLink,
        title: cards[0].title,
        width: '33%',
        id: '1',
      },
      {
        url: cards[1].posterLink,
        title: cards[1].title,
        width: '33%',
        id: '2',
      },
      {
        url: cards[2].posterLink,
        title: cards[2].title,
        width: '33%',
        id: '3',
      },
      {
        url: cards[3].posterLink,
        title: cards[3].title,
        width: '33%',
        id: '4',
      },
      {
        url: cards[4].posterLink,
        title: cards[4].title,
        width: '33%',
        id: '5',
      },
      {
        url: cards[5].posterLink,
        title: cards[5].title,
        width: '33%',
        id: '6',
      },
      {
        url: cards[6].posterLink,
        title: cards[6].title,
        width: '33%',
        id: '7',
      },
      {
        url: cards[7].posterLink,
        title: cards[7].title,
        width: '33%',
        id: '8',
      },
      {
        url: cards[8].posterLink,
        title: cards[8].title,
        width: '33%',
        id: '9',
      },
    ];

    return (
      // Makes the background entirely black
      <Container
        style={root}
        component="section"
        maxWidth="xl"
      >
        <Container
          style={root}
          component="section"
        >

          {/* Big text above movie panels */}
          <Typography variant="h4" marked="center" align="center" component="h2" style={root}>
            {'Check out these highly rated options'}
          </Typography>


          {/* Do the following for each image panel (map) */}
          <div style={images}>
            {images.map((image) => (
              <ButtonBase
                key={image.title}
                style={{
                  imageWrapper,
                  width: image.width,
                }}
                href={`/moviebooking/${image.id}`} // send the user to the url according to the panel they clicked
              >
                {/* Import image from url */}
                <div
                  style={imageSrc}
                  style={{
                    backgroundImage: `url(${image.url})`,
                  }}
                />
                <div style={imageBackdrop} />
                <div style={imageButton}>
                  <Typography
                    component="h3"
                    variant="h6"
                    color="inherit"
                    style={imageTitle}
                  >
                    {image.title}
                    <div style={imageMarked} />
                  </Typography>
                </div>
              </ButtonBase>
            ))}
          </div>

          {/* Link to more movies below panels */}
          <Typography variant="h4" align="center" component="h2" style={h5}>
            <Link
              variant="h5"
              underline="none"
              color="inherit"
              marked="center"
              href="/movies"
              style={root}
            >
              {'Click here to view more'}
            </Link>
          </Typography>
        </Container>
      </Container>
    );
  }
}
export default ProductCategories;