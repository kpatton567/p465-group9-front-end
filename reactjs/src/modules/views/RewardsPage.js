import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useAuth0 } from '@auth0/auth0-react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '../components/Typography';
import CardActions from '@material-ui/core/CardActions';
import Link from '@material-ui/core/Link';
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";

// core components
import Header from "../components/Header.js";
import Button from "../components/CustomButton";
import GridContainer from "../components/GridContainer.js";
import GridItem from "../components/GridItem.js";
import HeaderLinks from "../components/HeaderLinks.js";
import NavPills from "../components/NavPills.js";
import Parallax from "../components/Parallax.js";
import EditableTextField from "../components/EditableTextField.js"
import profile from "../assets/usericon.jpg";
import styles from "./rewardsPageStyles.js";
import axios from 'axios';
import AppFooter from '../../modules/views/AppFooter';
import AppAppBar from "./AppAppBar";
import theme from '../theme';



const useStyles = makeStyles(styles);

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
  const cardMedia = {
    paddingTop: '70%', // height of photo
  };
  const cardContent = {
    flexGrow: 1,
  };
  const footer = {
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing(6),
  };
  const h4 = {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('lg')]: {
      marginTop: theme.spacing(5),
    },
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




export default function RewardsPage(props) 
{
  const cards = [1,2,3,4,5];
  const classes = useStyles();
  const { ...rest } = props;
  const { user, isAuthenticated, loginWithRedirect, isLoading, getIdTokenClaims } = useAuth0();
 
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  if (isAuthenticated) {
    user.app_metadata = user.app_metadata || {};
    console.log(user)
    console.log(user)
  }


  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  let ETTprops = {}
  if (user) {
    ETTprops = {
      email: user.email
    }
  }

  if (!isAuthenticated && isLoading) {
    return (<div>
      Loading
    </div>)
  }

  if (!isAuthenticated && !isLoading) {
    return (<div>
      Loading
    {loginWithRedirect()}
    </div>)
  }

  // Generate page
  if (isAuthenticated && !isLoading)
      return (
          <div> 
              <AppAppBar position="relative" />

              {/* background image */}
              <Parallax small filter image={require("../assets/popcorn.jpg")} />

              {/* Raised background page */}
              <div className={classNames(classes.main, classes.mainRaised)}>
                  <div>
                      <div className={classes.container}>
                          <GridContainer justify="center">
                              <GridItem xs={12} sm={12} md={6}>
                                  <div className={classes.profile}>
                                      <div>
                                          <img src={user.picture} alt="..." className={imageClasses} />
                                      </div>
                                      <div className={classes.name}>
                                          <h3 className={classes.title}>{user.nickname}</h3>
                                          <h6>CUSTOMER</h6>
                                          {/* <Button justIcon link className={classes.margin5}>
                                              <i className={"fab fa-twitter"} />
                                              {'Test'}
                                          </Button> */}
                                      </div>
                                  </div>

                              </GridItem>
                          </GridContainer>
                      </div>
                  </div>


                  <div>
                        <Typography className={classes.title2} align="center" variant="h3" marked="center"> 
                            {'COUPON CODES AND OFFERS'}  
                        </Typography> 
                  </div>
                  <div>
                        <Typography className={classes.subtext} align="center" variant="h5">
                            {'Check out these sweet deals made just for you!'}  
                        </Typography> 
                        <Typography className={classes.subtext} align="center" variant="h5">
                            {'Start saving now!'}  
                        </Typography> 
                  </div>


                  {/* Place cards on the raised background component */}
                  <React.Fragment>
                      <CssBaseline />
                      <main>
                          <Container style={cardGrid} maxWidth="lg">
                              <Grid container spacing={4}>
                                  {cards.map((card) => (
                                      <Grid item key={card} xs={12} sm={6} md={2} lg={3}>
                                          
                                          {/* Create each card using array from backend */}
                                          <Card>  
                                              {/* Image on card */}
                                              <CardMedia
                                                  style={cardMedia}
                                                  image="https://images-na.ssl-images-amazon.com/images/I/71niXI3lxlL._AC_SL1183_.jpg"
                                              />

                                              {/* Text on the card */}
                                              <CardContent style={cardContent}>
                                                  <Typography gutterBottom variant="h5" component="h2">
                                                      {"Test Title"}
                                                  </Typography>
                                                  <Typography>
                                                      {"Test Description... Test test test"}
                                                  </Typography>
                                              </CardContent>

                                              {/* Button on card */}
                                              <CardActions>
                                                  <Link>
                                                      <Button size="small" color="primary">
                                                          {'Redeem Coupon'}
                                                      </Button>
                                                  </Link>
                                              </CardActions>
                                          </Card>
                                      </Grid>
                                  ))}
                              </Grid>
                          </Container>
                      </main>
                  </React.Fragment>
              
              </div> 
              {/* End main raised page */}
            

              {/* Footer */}
              <AppFooter />
          </div>
      );
}