import React from "react";
import clsx from 'clsx';
import { Row, Col } from 'reactstrap';
import axios from 'axios';
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
import CardActions from '@material-ui/core/CardActions';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// core components
import './BookingHistory';
import Typography from '../components/Typography';
import Button from "../components/CustomButton";
import GridContainer from "../components/GridContainer.js";
import GridItem from "../components/GridItem.js";
import Parallax from "../components/Parallax.js";
import styles from "./BookingHistPageStyles.js";
import AppFooter from '../../modules/views/AppFooter';
import AppAppBar from "./AppAppBar";
import theme from '../theme';
import SalesSummary from './SalesSummary';
import Feeds from './Feeds';


const useStyles = makeStyles(styles);

// Generate Order Data
function createData(id, orderid, date, name, shipTo, paymentMethod, amount) {
    return         {id, orderid, date, name, shipTo, paymentMethod, amount};
}


function preventDefault(event) {
    event.preventDefault();
}


// Sample data for testing
const orderz = [
    createData(0, '425', '16 Sept, 2019', 'Avengers: Endgame', 'AMC', 'Package 1', 30.44),
    createData(1, '234', '16 July, 2019', 'The Wolf of Snow Hollow', 'Carmike', '-', 18.99),
    createData(2, '345', '16 May, 2019', 'Target Number One', 'AMC', '-', 15.99),
    createData(3, '456', '16 Apr, 2019', 'The Silencing', 'AMC', 'Package 3', 30.39),
    createData(4, '678', '15 Mar, 2019', 'Behind You', 'Carmike', '-', 18.99),
];


// Create page
export default function BookingHistoryPage(props) 
{
  // Bring in data from backend
  const [orders, setOrders] = React.useState([]);
  const fetchData = React.useCallback(() => 
  {
      axios({
        "method": "GET",
        "url": 'http://localhost:8080/api/home/movies'     // need to include proper endpoint here, should be working though.
      })
      .then((response) => {
        
        const i = 0;
        for(i = 0; i < response.data.length; i++)
        {
          orders[i] = createData(response.data[i].id, response.data[i].orderid, response.data[i].date, response.data[i].name,
                                 response.data[i].shipTo, response.data[i].paymentMethod, response.data[i].amount);
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
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
                                <TableCell>Theatre</TableCell>
                                <TableCell>Snacks</TableCell>
                                <TableCell align="right">Total Bill</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell>{order.orderid}</TableCell>
                                    <TableCell>{order.date}</TableCell>
                                    <TableCell>{order.name}</TableCell>
                                    <TableCell>{order.shipTo}</TableCell>
                                    <TableCell>{order.paymentMethod}</TableCell>
                                    <TableCell align="right">{order.amount}</TableCell>
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




