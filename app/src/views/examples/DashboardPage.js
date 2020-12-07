// import React from "react";
// // reactstrap components
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardTitle,
//   Row,
//   Col,
// } from "reactstrap";
// import clsx from 'clsx';
// import { makeStyles } from '@material-ui/core/styles';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Container from '@material-ui/core/Container';
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
// import RevenueChart from './RevenueChart';
// import SavingsChart from './SavingsChart';
// import QuantityChart from './QuantityChart';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import axios from "axios";
// import { apiVariables, ACCESS_TOKEN_NAME } from '../../APIConstants';

// const drawerWidth = 240;

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//   },
//   content: {
//     flexGrow: 1,
//     height: '145vh',
//     overflow: 'auto',
//   },
//   container: {
//     paddingTop: theme.spacing(4),
//   },
//   paper: {
//     padding: theme.spacing(2),
//     display: 'flex',
//     overflow: 'auto',
//     flexDirection: 'column',
//   },
//   fixedHeight: {
//     height: 350,
//     marginBottom: 40,
//   },
//   table: {
//     marginLeft: '40px',
//     marginRight: '40px',
//     marginBottom: '50px'
//   },
// }));


// function pairData(title, amount) {
//   return { title, amount };
// }

// const orders = [
// ];

// // Test data
// const orderz = [
//   pairData("Avengers: Endgame", 30.99),
//   pairData("Kung-Fu Chicken", 400.99),
//   pairData("Broccoli", 304.44),
// ];



// function Dashboard()
// {
//   const classes = useStyles();
//   const [open, setOpen] = React.useState(true);
//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };
//   const handleDrawerClose = () => {
//     setOpen(false);
//   };
//   const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

//   const fetchData = React.useCallback(() => 
//     {
//         var token = localStorage.getItem(ACCESS_TOKEN_NAME)
      
//         axios.get(apiVariables.apiUrl + '/api/manage/movie_revenue', 
//         {
//             headers: {
//                 'Authorization': 'Bearer ' + token
//             }
//         })
//             .then((response) => {
//                 var keys = Object.keys(response.data);

//                 for(var i = 0; i < response.data.length; i++)
//                 {
//                     orders[i] = pairData(keys[i], response.data[i]);
//                 }

//             })
//                 .catch((error) => {
//                     console.log(error)
//                 })
//     }, [])

//     React.useEffect(() => 
//     {
//         fetchData()
//     }, [fetchData])


//   return (
//     <>
//       <div className="content">
//         <Row>
//           <Col md="12">
//             <Card className="card-user">
//               <CardHeader>
//                 <CardTitle tag="h5">General Statistics</CardTitle>
//               </CardHeader>
//               <CardBody>
//                 {/* Charts on Statistics Panel */}
//                 <div className={classes.root}>
//                   <CssBaseline />
//                   <main className={classes.content}>
//                     <Container maxWidth="xl" className={classes.container}>
//                       <Grid container spacing={3}>
//                         <Grid item xs={12} md={8} lg={9}>
//                           <Paper className={fixedHeightPaper}>
//                             <RevenueChart />
//                           </Paper>
//                           <Paper className={fixedHeightPaper}>
//                             <SavingsChart />
//                           </Paper>
//                           <Paper className={fixedHeightPaper}>
//                             <QuantityChart />
//                           </Paper>
//                         </Grid>
//                       </Grid>
//                     </Container>
//                   </main>
//                 </div>
//               </CardBody>
//             </Card>

//             <Card className="card-user">
//               <CardHeader>
//                 <CardTitle tag="h5">Revenue Generated (by Movie)</CardTitle>
//               </CardHeader>
//               <CardBody>
//                 <Grid item xs={8}>
//                   <div className={classes.table}>
//                     <Paper>
//                       <Table size="medium">
//                         <TableHead>
//                           <TableRow>
//                             <TableCell><h6>Movie Name</h6></TableCell>
//                             <TableCell align="right"><h6>Total Revenue</h6></TableCell>
//                           </TableRow>
//                         </TableHead>
//                         <TableBody>
//                           {orders.map((order) => (
//                             <TableRow key={order.title}>
//                               <TableCell>{order.title}</TableCell>
//                               <TableCell align="right">{order.amount}</TableCell>
//                             </TableRow>
//                           ))}
//                         </TableBody>
//                       </Table>
//                     </Paper>
//                   </div>
//                 </Grid>
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//       </div>
//     </>
//   );
// }

// export default Dashboard;
import React from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
// core components
import {
  dashboardEmailStatisticsChart,
} from "variables/charts.js";
import axios from "axios";
import { apiVariables, ACCESS_TOKEN_NAME } from '../../APIConstants';

function Dashboard () {
  const [theaterRevenue, setTheaterRevenue] = React.useState([]);
  const [couponSavings, setCouponSavings] = React.useState([]);
  const [moviesSeen, setMoviesSeen] = React.useState([]);

  const fetchData = React.useCallback(() => 
    {
        var token = localStorage.getItem(ACCESS_TOKEN_NAME)
      
        axios.get(apiVariables.apiUrl + '/api/manage/theater_revenue', 
        {
        headers: {
            'Authorization': 'Bearer ' + token
        }
        })
        .then((response) => {
            console.log(response)
            setTheaterRevenue(response.data)
        })
        .catch((error) => {
            console.log(error)
        })

        axios.get(apiVariables.apiUrl + '/api/manage/coupon_savings', 
        {
        headers: {
            'Authorization': 'Bearer ' + token
        }
        })
        .then((response) => {
            setCouponSavings(response.data)
        })
        .catch((error) => {
            console.log(error)
        })

        axios.get(apiVariables.apiUrl + '/api/manage/movies_seen', 
        {
        headers: {
            'Authorization': 'Bearer ' + token
        }
        })
        .then((response) => {
          setMoviesSeen(response.data)
        })
        .catch((error) => {
            console.log(error)
        })

    }, [])
    React.useEffect(() => 
    {
        fetchData()
    }, [fetchData])

  const dashboard24HoursPerformanceChart = {
    data: (canvas) => {
      return {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
        ],
        datasets: [
          {
            borderColor: "#6bd098",
            backgroundColor: "#6bd098",
            pointRadius: 0,
            pointHoverRadius: 0,
            borderWidth: 3,
            // data : theaterRevenue
            data: [300, 330, 330, 322, 320, 320, 323, 330, 338, 354, 360],
          },
        ],
      };
    },
    options: {
      legend: {
        display: false,
      },
  
      tooltips: {
        enabled: false,
      },
  
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: "#9f9f9f",
              beginAtZero: false,
              maxTicksLimit: 5,
              //padding: 20
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "#ccc",
              color: "rgba(255,255,255,0.05)",
            },
          },
        ],
  
        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(255,255,255,0.1)",
              zeroLineColor: "transparent",
              display: false,
            },
            ticks: {
              padding: 20,
              fontColor: "#9f9f9f",
            },
          },
        ],
      },
    },
  };
  const dashboardNASDAQChart = {
    data: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          // data : couponSavings
          data: [0, 19, 15, 20, 30, 40, 40, 50, 25, 30, 50, 70],
          fill: false,
          borderColor: "#fbc658",
          backgroundColor: "transparent",
          pointBorderColor: "#fbc658",
          pointRadius: 4,
          pointHoverRadius: 4,
          pointBorderWidth: 8,
        },
        {
          // data : moviesSeen
          data: [0, 5, 10, 12, 20, 27, 30, 34, 42, 45, 55, 63],
          fill: false,
          borderColor: "#51CACF",
          backgroundColor: "transparent",
          pointBorderColor: "#51CACF",
          pointRadius: 4,
          pointHoverRadius: 4,
          pointBorderWidth: 8,
        },
      ],
    },
    options: {
      legend: {
        display: false,
        position: "top",
      },
    },
  };
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Total Revenue from theaters per month</CardTitle>
                </CardHeader>
                <CardBody>
                  <Line
                    data={dashboard24HoursPerformanceChart.data}
                    options={dashboard24HoursPerformanceChart.options}
                    width={400}
                    height={100}
                  />
                </CardBody>
                <CardFooter>
                  <hr />
                </CardFooter>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="8">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h5">Total Tickets Sold Vs Total Coupon Savings</CardTitle>
                </CardHeader>
                <CardBody>
                  <Line
                    data={dashboardNASDAQChart.data}
                    options={dashboardNASDAQChart.options}
                    width={400}
                    height={100}
                  />
                </CardBody>
                <CardFooter>
                  <div className="chart-legend">
                    <i className="fa fa-circle text-info" /> Total Tickets Sold at a theater per month{" "}
                    <i className="fa fa-circle text-warning" /> Total Coupon Savings at a theater per month
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-money-coins text-success" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Revenue</p>
                        <CardTitle tag="p">$ 1,215</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          
        </div>
      </>
    );
}

export default Dashboard;