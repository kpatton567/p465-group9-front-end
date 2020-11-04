import React from "react";
import clsx from 'clsx';
import { Row, Col } from 'reactstrap';
import axios from 'axios';
import { ACCESS_TOKEN_NAME, apiVariables } from '../../APIConstants';
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth0 } from '@auth0/auth0-react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AppFooter from '../../modules/views/AppFooter';
import AppAppBar from "./AppAppBar";
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems } from './listItems';
import GridContainer from "../components/GridContainer.js";
import Container from '@material-ui/core/Container';
const drawerWidth = 250;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    backgroundColor: '#363636',
    // whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(1),
    backgroundColor: '#363636',
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));
function createData(paymentId, date, total) {
  return { paymentId, date, total };
}
const orderz = [
  createData('1', '16 Sept, 2019', 30.44),
];
function preventDefault(event) {
  event.preventDefault();
}
var token = localStorage.getItem(ACCESS_TOKEN_NAME);
export default function BookingHistoryPage(props) {
  const [sent, setSaved] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const [orders, setOrders] = React.useState([]);
  const fetchData = React.useCallback(() => {
    axios.get(apiVariables.apiUrl + '/api/manage/transaction_history', {
      headers: {
        "Authorization": 'Bearer ' + token
      }
    })
      .then((response) => {
        var i = 0;
        setOrders(orderz);
        // for (i = 0; i < response.data.length; i++) {
        //   orders[i] = createData(response.data[i].paymentId, response.data[i].date, response.data[i].total);
        // }
        // setOrders(orderz)
      },
        (error) => {
          // var status = error.response.status;
          // console.log(status);
        }
      );
  }, []);
  React.useEffect(() => {
    fetchData()
  }, [fetchData])
  const handleChange = (e) => {
    // const { id, value } = e.target
    console.log(e.target.value)
    // setmovieTitle(e.target.value)
  }
  const handleSubmit = () => {
    setSaved(true);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
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
  if (isAuthenticated && !isLoading) {
    return (
      <div className={classes.root}
        style={{ background: '#808080' }}>
        <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <AppAppBar />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
      </Drawer>
        <main className={classes.content}
          style={{ background: '#808080' }}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Paper className={classes.paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Order Number</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderz.map((order) => (
                    <TableRow key={order.paymentId}>
                      <TableCell>{order.paymentId}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell align="right">{order.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Container>
        </main>
      </div>
    );
  }
}