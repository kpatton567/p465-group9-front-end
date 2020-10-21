import React, {Component} from 'react';
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
import theme from '../theme';
import ButtonBase from '@material-ui/core/ButtonBase';

const root = {
  backgroundColor: '#363636',
  color: '#FFFFFF',
};

const imagesStyle = {
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


class ProductCategories extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      images: []
    };
  }

  componentDidMount() {
    const fetchMovies = async () => {
      const res = await axios.get('http://localhost:8080/api/home/movies');
      this.setState({ cards: res.data })
      console.log(this.state.cards);
      this.setState({ 
        images: [
        {
          url: this.state.cards[0].posterLink,
          title: this.state.cards[0].title,
          width: '33%',
          id: '1',
        },
        {
          url: this.state.cards[1].posterLink,
          title: this.state.cards[1].title,
          width: '33%',
          id: '2',
        },
        {
          url: this.state.cards[2].posterLink,
          title: this.state.cards[2].title,
          width: '33%',
          id: '3',
        },
        {
          url: this.state.cards[3].posterLink,
          title: this.state.cards[3].title,
          width: '33%',
          id: '4',
        },
        {
          url: this.state.cards[4].posterLink,
          title: this.state.cards[4].title,
          width: '33%',
          id: '5',
        },
        {
          url: this.state.cards[5].posterLink,
          title: this.state.cards[5].title,
          width: '33%',
          id: '6',
        },
        {
          url: this.state.cards[6].posterLink,
          title: this.state.cards[6].title,
          width: '33%',
          id: '7',
        },
        {
          url: this.state.cards[7].posterLink,
          title: this.state.cards[7].title,
          width: '33%',
          id: '8',
        },
        {
          url: this.state.cards[8].posterLink,
          title: this.state.cards[8].title,
          width: '33%',
          id: '9',
        },
      ] })
    };
    fetchMovies();
  }
  
  handleSubmitClick(e) {
    console.log("Test");
  }

  render() {
    const { images } = this.state;
    console.log(images);
    return (
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
        <div style={imagesStyle}>
          {images.map((image) => (
            <ButtonBase
              key={image.title}
              style= {imageWrapper}
              style={{ width: image.width}}
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