import React from "react";
import clsx from 'clsx';
import { Row, Col } from 'reactstrap';
import axios from 'axios';
import {ACCESS_TOKEN_NAME, apiVariables} from '../../APIConstants';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useAuth0 } from '@auth0/auth0-react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// core components
import Typography from '../components/Typography';
import GridContainer from "../components/GridContainer.js";
import GridItem from "../components/GridItem.js";
import Parallax from "../components/Parallax.js";
import styles from "./BookingHistPageStyles.js";
import AppFooter from '../../modules/views/AppFooter';
import AppAppBar from "./AppAppBar";


const useStyles = makeStyles(styles);

// Generate Order Data
function createData(paymentId, date, movieName, theaterName, snacks, total) 
{
    return         {paymentId, date, movieName, theaterName, snacks, total};
}


function preventDefault(event) {
    event.preventDefault();
}



// Sample data for testing
const snackz1 = ['Pizza, ', 'Coca-Cola, ', 'Chocolate'];
const orderz = [
    createData('1', '16 Sept, 2019', 'Avengers: Endgame', 'AMC', snackz1, 30.44),
];


var token = localStorage.getItem(ACCESS_TOKEN_NAME);


export default function BookingHistoryPage(props) 
{
  // Bring in data from backend
  const [orders, setOrders] = React.useState([]);
  const fetchData = React.useCallback(() => 
  {
      axios.get(apiVariables.apiUrl + '/api/customer/payment_history', {
        headers: {
        "Authorization": 'Bearer ' + token
        }
      })
      .then((response) =>
        {
          var i = 0;
          var j = 0;

          for(i = 0; i < response.data.length; i++)
          {
            // Create an array with all of the snacks from each order (to be passed to createData)
            const snackz = [];
            for (j = 0; j < response.data[i].snacks.length; j++)
            {
              snackz[j] = response.data[i].snacks[j] + ' '; 
            }

            orders[i] = createData(response.data[i].paymentId, response.data[i].date, response.data[i].movieName,
                                   response.data[i].theaterName, snackz, response.data[i].total);
          }
        },
        (error) => {
          var status = error.response.status;
          console.log(status);
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

          {/* Raised background page, profile image, customer tag */}
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


            {/* Text below profile image */}
            <div>
              <Typography className={classes.title2} align="center" variant="h3" marked="center">
                {'TRANSACTION HISTORY'}
              </Typography>
            </div>
            <div>
              <Typography className={classes.subtext} align="center" variant="h5">
                {''}
              </Typography>
            </div>


            {/* Order History Table */}
            <Grid item xs={12}>
                <div className={classes.table}>
                <Paper className={classes.paper}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Order Number</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Movie Name</TableCell>
                                <TableCell>Theatre Name</TableCell>
                                <TableCell>Snacks</TableCell>
                                <TableCell align="right">Total Bill</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.paymentId}>
                                    <TableCell>{order.paymentId}</TableCell>
                                    <TableCell>{order.date}</TableCell>
                                    <TableCell>{order.movieName}</TableCell>
                                    <TableCell>{order.theaterName}</TableCell>
                                    <TableCell>{order.snacks}</TableCell>
                                    <TableCell align="right">{order.total}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                </div>
            </Grid>
            <div>
              <Typography className={classes.subtext2} align="center" variant="h5">
                {''}
              </Typography>
            </div>
 
          </div>
          {/* End main raised page */}


          {/* Footer */}
          <AppFooter />
        </div>
      );
  }
}