import React, { Component } from 'react';
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
import MovieBooking from '../views/MovieBooking';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const icon = {
  marginRight: theme.spacing(2),
};
const heroContent = {
  backgroundColor: theme.palette.primary.light,
  padding: theme.spacing(8, 0, 1),
  color: '#FFFFFF'
};
const heroButtons = {
  marginTop: theme.spacing(4),
};
const cardGrid = {
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(6),
  backgroundColor: theme.palette.primary.light,
  maxWidth: '100%',
};
const card = {
  height: '100%', // height of white box
  display: 'flex',
  flexDirection: 'column',
};
const cardMedia = {
  paddingTop: '140%', // height of photo
};
const cardContent = {
  flexGrow: 1,
};
const footer = {
  backgroundColor: theme.palette.primary.light,
  padding: theme.spacing(6),
};
const h5 = {
  marginBottom: theme.spacing(4),
  marginTop: theme.spacing(4),
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(5),
  },
};
// For footer button
const root = {
  color: theme.palette.common.black,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    height: '80vh',
    minHeight: 10,
    maxHeight: 40,
  },
};
const container = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#363636',
  maxWidth: '100%',
};
const button = {
  minWidth: 250,
  marginBottom: theme.spacing(4),
};
// Build URL with movie name
function CreateUrl(image) {
  var mov = "/movies/"
  var res = mov.concat(image);
  return res;
}

class MoviesPage extends Component {

  constructor(props) {
    super(props); 
    this.state = {         
      cards: [],
    // movie: null 
     }; }

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
        // const classes = useStyles();
        const { cards } = this.state;
        return (
          <React.Fragment>
            <CssBaseline />
            <AppAppBar position="relative">
              <Toolbar>
                <CameraIcon style={icon} />
                <Typography variant="h6" color="inherit" noWrap>
                  Album layout
            </Typography>
              </Toolbar>
            </AppAppBar>
            <main>
              {/* Hero unit */}
              <div style={heroContent}>
                <Container maxWidth="sm">
                  <Typography color="inherit" align="center" variant="h2" marked="center" gutterBottom>
                    {'All Movies'}
                  </Typography>
                  <Typography variant="h5" align="center" paragraph style={h5}>
                    {'Browse our numerous movie options below and find one that is best for you!'}
                  </Typography>
                </Container>
              </div>
              <Container style={cardGrid} maxWidth="lg">
                {/* End hero unit */}
                {/* Generate cards based on number of elements in 'cards' array */}
                <Grid container spacing={4}>
                  {cards.map((card) => (
                    <Grid item key={card} xs={12} sm={6} md={2} lg={3}>
                      {/* Create each card using array from backend */}
                      <Card style={card}>
                        <CardMedia
                          style={cardMedia}
                          image={card.posterLink}
                        />
                        <CardContent style={cardContent}>
                          <Typography gutterBottom variant="h5" component="h2">
                            {card.title}
                          </Typography>
                          <Typography>
                            {card.description}
                          </Typography>
                        </CardContent>
                        {/* More Info Button */}
                        <CardActions>
                          <Link>
                            <Button size="small" color="primary" href={`/moviebooking/${card.id}`}>
                            {/* <Button size="small" color="primary"
                              onClick={() => this.setState({
                                movie: card
                              })}> */}
                              {'Book Tickets'}
                            </Button>
                          </Link>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </main>
            {/* Button at bottom of page to bring user back to top of page */}
            <section style={root}>
              <Container style={container}>
                <Button
                  color="secondary"
                  variant="contained"
                  size="large"
                  style={button}
                  href="/movies"
                >
                  {'Back to Top'}
                </Button>
              </Container>
            </section>

            {/* {!!this.state.movie && (<MovieBooking movie={this.state.movie} />)} */}
          </React.Fragment>
        );
      }
    }
    export default MoviesPage;