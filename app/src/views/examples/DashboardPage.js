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
}));


function createData(name, timesPurchased, revenue) 
{
    return         {name, timesPurchased, revenue};
}


const orderz = [
  createData('Avengers: Endgame', 10, 59.90),
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
                <Grid item xs={12}>
                  <div className={classes.table}>
                    <Paper className={classes.paper}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Movie Name</TableCell>
                            <TableCell>Quantity Sold</TableCell>
                            <TableCell align="right">Total Revenue</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {orderz.map((order) => (
                            <TableRow key={order.name}>
                              <TableCell>{order.name}</TableCell>
                              <TableCell>{order.timesPurchased}</TableCell>
                              <TableCell align="right">{order.revenue}</TableCell>
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