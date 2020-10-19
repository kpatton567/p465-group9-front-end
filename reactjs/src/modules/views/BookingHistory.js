import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AppAppBar from './AppAppBar';
import './BookingHistory';
import { Row, Col } from 'reactstrap';
import SalesSummary from './SalesSummary';
import Feeds from './Feeds';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: '100vh',
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
        whiteSpace: 'nowrap',
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
        background: 'url(../assets/ways-save-movie-theater-tickets-2136x1427.jpeg) fixed no-repeat',
        // backgroundColor: 'pink'
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));
// Generate Order Data
function createData(id, orderid, date, name, shipTo, paymentMethod, amount) {
    return { id, orderid, date, name, shipTo, paymentMethod, amount };
}

const rows = [
    createData(0, '123', '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
    createData(1, '234', '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
    createData(2, '345', '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
    createData(3, '456', '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
    createData(4, '678', '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
];

function preventDefault(event) {
    event.preventDefault();
}


export default function BookingHistory(props) {
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
        <React.Fragment >
            <CssBaseline />
            <Container maxWidth="lg" className={classes.container}>

                <div className={classes.root}>
                    {/* <div style = {{backgroundImage: `url()`, height: '100%'}}> */}
                    <AppAppBar />

                    <main className={classes.content}>
                        <div style = {{paddingTop: 'theme.spacing(6)' }}>
                            <Row>
                                <Col sm={6} lg={8} pt={5}>
                                    <SalesSummary />
                                </Col>
                                <Col sm={6} lg={4} pt={5}>
                                    <Feeds />
                                </Col>
                            </Row>
                        </div>
                        <div className={classes.appBarSpacer} />
                        <Grid >
                            {/* Recent Orders */}
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                        Transaction History
    </Typography>
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
                                            {rows.map((row) => (
                                                <TableRow key={row.id}>
                                                    <TableCell>{row.orderid}</TableCell>
                                                    <TableCell>{row.date}</TableCell>
                                                    <TableCell>{row.name}</TableCell>
                                                    <TableCell>{row.shipTo}</TableCell>
                                                    <TableCell>{row.paymentMethod}</TableCell>
                                                    <TableCell align="right">{row.amount}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    <div className={classes.seeMore}>
                                        <Link color="primary" href="#" onClick={preventDefault}>
                                            See more orders
        </Link>
                                    </div>
                                </Paper>
                            </Grid>
                        </Grid>
                        {/* </div> */}
                        {/* <Box pt={4}>
                        <AppFooter/>
                    </Box> */}


                    </main>
                </div>
            </Container>
        </React.Fragment>
    );
}