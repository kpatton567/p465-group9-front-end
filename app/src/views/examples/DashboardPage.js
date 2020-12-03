import React from "react";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import RevenueChart from './RevenueChart';
import SavingsChart from './SavingsChart';
import QuantityChart from './QuantityChart';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from "axios";
import { apiVariables, ACCESS_TOKEN_NAME } from '../../APIConstants';



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    height: '145vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 350,
    marginBottom: 40,
  },
  table: {
    marginLeft: '40px',
    marginRight: '40px',
    marginBottom: '50px'
  },
}));


function pairData(title, amount) {
  return { title, amount };
}

const orders = [
];

// Test data
const orderz = [
  pairData("Avengers: Endgame", 30.99),
  pairData("Kung-Fu Chicken", 400.99),
  pairData("Broccoli", 304.44),
];



function Dashboard()
{
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const fetchData = React.useCallback(() => 
    {
        var token = localStorage.getItem(ACCESS_TOKEN_NAME)
      
        axios.get(apiVariables.apiUrl + '/api/manage/movie_revenue', 
        {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then((response) => {
                var keys = Object.keys(response.data);

                for(var i = 0; i < response.data.length; i++)
                {
                    orders[i] = pairData(keys[i], response.data[i]);
                }

            })
                .catch((error) => {
                    console.log(error)
                })
    }, [])

    React.useEffect(() => 
    {
        fetchData()
    }, [fetchData])


  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">General Statistics</CardTitle>
              </CardHeader>
              <CardBody>
                {/* Charts on Statistics Panel */}
                <div className={classes.root}>
                  <CssBaseline />
                  <main className={classes.content}>
                    <Container maxWidth="xl" className={classes.container}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={8} lg={9}>
                          <Paper className={fixedHeightPaper}>
                            <RevenueChart />
                          </Paper>
                          <Paper className={fixedHeightPaper}>
                            <SavingsChart />
                          </Paper>
                          <Paper className={fixedHeightPaper}>
                            <QuantityChart />
                          </Paper>
                        </Grid>
                      </Grid>
                    </Container>
                  </main>
                </div>
              </CardBody>
            </Card>

            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Revenue Generated (by Movie)</CardTitle>
              </CardHeader>
              <CardBody>
                <Grid item xs={8}>
                  <div className={classes.table}>
                    <Paper>
                      <Table size="medium">
                        <TableHead>
                          <TableRow>
                            <TableCell><h6>Movie Name</h6></TableCell>
                            <TableCell align="right"><h6>Total Revenue</h6></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {orders.map((order) => (
                            <TableRow key={order.title}>
                              <TableCell>{order.title}</TableCell>
                              <TableCell align="right">{order.amount}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Paper>
                  </div>
                </Grid>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;