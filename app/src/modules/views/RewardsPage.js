import React from "react";
import {ACCESS_TOKEN_NAME, apiVariables} from '../../APIConstants';
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
// core components
import Button from "../components/CustomButton";
import GridContainer from "../components/GridContainer.js";
import GridItem from "../components/GridItem.js";
import Parallax from "../components/Parallax.js";
import styles from "./rewardsPageStyles.js";
import AppFooter from '../../modules/views/AppFooter';
import AppAppBar from "./AppAppBar";
import theme from '../theme';
import axios from 'axios';
const useStyles = makeStyles(styles);
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
// Sample data
const couponz = [1,2,3,4];
var token = localStorage.getItem(ACCESS_TOKEN_NAME);
export default function RewardsPage(props) 
{
  // Bring in data from backend
  const [coupons, setCoupons] = React.useState([]);
  const fetchData = React.useCallback(() => 
  {
    // need to include proper endpoint here, should be working though.
    axios.get(apiVariables.apiUrl + '/api/customer/payment_history', {
      headers: {
        "Authorization": 'Bearer ' + token
      }
    })
    .then((response) => 
      {
        var i = 0;
        for (i = 0; i < response.data.length; i++) {
          coupons[i] =
          {
            url: response.data[i].url,
            title: response.data[i].title,
            description: response.data[i].description,
            couponCode: response.data[i].couponCode,
          }
        }
      },
      (error) => {
        console.log(error)
      }
    );
  }, []);
  React.useEffect(() => {
    fetchData()
  }, [fetchData])
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
  { 
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
                    {couponz.map((coupon) => (
                      <Grid item key={coupon} xs={12} sm={6} md={2} lg={3}>
                        {/* Create each card using array from backend */}
                        <Card>
                          {/* Image on card */}
                          <CardMedia
                            style={cardMedia}
                            image="https://images-na.ssl-images-amazon.com/images/I/71niXI3lxlL._AC_SL1183_.jpg"
                            // image={coupon.url}
                          />
                          {/* Text on the card */}
                          <CardContent style={cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                              {"Test Title"}
                              {/* {coupon.title} */}
                            </Typography>
                            <Typography>
                              {"Test Description... The image on this tile will be an image associated with the coupon code"}
                              {/* {coupon.description} */}
                            </Typography>
                          </CardContent>
                          {/* Button on card */}
                          <CardActions>
                            <Link>
                              <Button size="small" color="primary">
                                {'CODE: '}{coupon.couponCode}
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
}