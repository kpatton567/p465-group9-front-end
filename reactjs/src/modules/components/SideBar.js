import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import SeatPicker from "react-seat-picker";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import GridContainer from "../components/GridContainer.js";
import GridItem from "../components/GridItem.js";
import { Chip, Box } from '@material-ui/core'
import {ChipSet} from '@material/react-chips';

import theme from "../theme";
import CancelIcon from '@material-ui/icons/Cancel';
import NavPills from "../components/NavPills.js";

// @material-ui/icons
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import ForumIcon from '@material-ui/icons/Forum';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const useStyles = makeStyles((theme) => ({
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
    margin: theme.spacing(6),
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
  sidebarStyle: {
    marginLeft: 'auto'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      // marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  boxStyle:{
    border:"1px solid",
    borderColor: theme.palette.secondary.light,
    margin:theme.spacing(1)
  }
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const { description, movieId } = props;
  const [open, setOpen] = React.useState(false);
  const [response, setResponse] = React.useState([]);
  const [selectedTheatre, setSelectedTheatre] = React.useState('');
  const [value, setValue] = useState("Showtime");
  const [selectedShowtime, setSelectedShowtime] = React.useState('');
  const [selectSeats, setSelectSeats] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = ['Theatre and Showtimes', 'Preferred Seats', 'Payment details'];
  const rows = [
    [
      { id: 1, number: 1 },
      { id: 2, number: 2, tooltip: "Cost: 15$" },
      null,
      {
        id: 3,
        number: "3",
        // isReserved: true,
        orientation: "east",
        // tooltip: "Reserved by Rogger"
      },
      { id: 4, number: "4", orientation: "west" },
      null,
      { id: 5, number: 5 },
      { id: 6, number: 6 }
    ],
    [
      {
        id: 7,
        number: 1,
        // isReserved: true,
        // tooltip: "Reserved by Matthias Nadler"
      },
      { id: 8, number: 2 },
      null,
      { id: 9, number: "3", orientation: "east" },
      { id: 10, number: "4", orientation: "west" },
      null,
      { id: 11, number: 5 },
      { id: 12, number: 6 }
    ],
    [
      { id: 13, number: 1 },
      { id: 14, number: 2 },
      null,
      { id: 15, number: 3, orientation: "east" },
      { id: 16, number: "4", orientation: "west" },
      null,
      { id: 17, number: 5 },
      { id: 18, number: 6 }
    ],
    [
      { id: 19, number: 1, tooltip: "Cost: 25$" },
      { id: 20, number: 2 },
      null,
      { id: 21, number: 3, orientation: "east" },
      { id: 22, number: "4", orientation: "west" },
      null,
      { id: 23, number: 5 },
      { id: 24, number: 6 }
    ],
    [
      { id: 25, number: 1, isReserved: true },
      { id: 26, number: 2, orientation: "east" },
      null,
      { id: 27, number: "3", isReserved: true },
      { id: 28, number: "4", orientation: "west" },
      null,
      { id: 29, number: 5, tooltip: "Cost: 11$" },
      { id: 30, number: 6, isReserved: true }
    ]
  ];

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleShowTimeClick = (showtime) => {
    setSelectedShowtime(showtime);
    console.log(selectedShowtime);
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const fetchData = React.useCallback(() => {
    axios({
      "method": "POST",
      "url": 'http://localhost:8080/api/home/movie_showtimes?movieId=' + movieId,
    })
      .then((response) => {
        // console.log(response.data)
        setResponse(response.data)

      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  React.useEffect(() => {
    fetchData()
  }, [fetchData])

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div>
            
            {response.map((item) =>
              <Box className={classes.boxStyle}>
                  <div>{item.theater.name}</div>
                    <Grid item xs>
                      <Grid container spacing={1}>
                        <Grid item>
                        <ChipSet
                          choice
                          // selectedChipIds={selectedShowtime}
                          // handleSelect={(selectedShowtime) => setSelectedShowtime({selectedShowtime})}
                        >
                          {item.showtimes.map((showtime =>
                          <Chip clickable id={showtime} label={showtime} onClick={ () => handleShowTimeClick(showtime) }/>
                          ))}
                        </ChipSet>
                          
                        </Grid>
                      </Grid>
                    </Grid>
              </Box>
            )}
          </div>
        )
      case 1:
        return (
          <SeatPicker
            visible={selectSeats}
            // addSeatCallback={this.addSeatCallback}
            // removeSeatCallback={this.removeSeatCallback}
            rows={rows}
            maxReservableSeats={3}
            alpha
            visible
            selectedByDefault
            // loading={loading}
            tooltipProps={{ multiline: true }}
          />
        );
      case 2:
        return <div>Payments</div>;
      default:
        throw new Error('Unknown step');
    }
  }

  const handleTheatreChange = (event) => {
    setSelectedTheatre(event.target.value);
  };
  const handleTheatreChangeSetTimes = (item) => {
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setActiveStep(0);
  };

  const handleChange = () => {
    console.log("test")
  }

  const handleSelectSeats = () => {
    setSelectSeats(true);
  };

  return (
    <Grid item xs={12} md={4} className={classes.sidebarStyle}>
      <Paper elevation={0} className={classes.sidebarAboutBox}>
        <Typography variant="h6" gutterBottom>

          <GridContainer >
            <GridItem className={classes.navWrapper}>

              <NavPills
                alignCenter
                color="primary"
                tabs={[
                  {
                    tabButton: "Synopsis",
                    tabIcon: ForumIcon,
                    tabContent: (
                      <Typography style={{ textTransform: 'none' }}>{description}</Typography>
                    )
                  },
                  {
                    tabButton: "Show time",
                    tabIcon: WatchLaterIcon,
                    tabContent: (
                      <GridContainer justify="center">
                        <GridItem >
                          <Button onClick={handleClickOpen} style={{ color: theme.palette.secondary.light }}>See availability</Button>
                          <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
                            {/* <DialogTitle>Choose your theatre</DialogTitle> */}

                            <Paper className={classes.paper}>
                              <CancelIcon onClick={handleClose} style={{ cursor: 'pointer', float: 'right', marginTop: '5px', width: '20px' }} />
                              <Typography component="h1" variant="h4" align="center">
                                Checkout
                              </Typography>
                              <Stepper activeStep={activeStep} className={classes.stepper}>
                                {steps.map((label) => (
                                  <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                  </Step>
                                ))}
                              </Stepper>
                              <React.Fragment>
                                {activeStep === steps.length ? (
                                  <React.Fragment>
                                    <Typography variant="h5" gutterBottom>
                                      Thank you for your order.
                </Typography>
                                    <Typography variant="subtitle1">
                                      Your order number is #2001539. We have emailed your order confirmation, and will
                                      send you an update when your order has shipped.
                </Typography>
                                  </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                      {getStepContent(activeStep)}
                                      <div className={classes.buttons}>
                                        {activeStep !== 0 && (
                                          <Button onClick={handleBack} className={classes.button}>
                                            Back
                    </Button>
                                        )}
                                        <Button
                                          variant="contained"
                                          color="primary"
                                          onClick={handleNext}
                                          className={classes.button}
                                        >
                                          {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                        </Button>

                                      </div>
                                    </React.Fragment>
                                  )}

                              </React.Fragment>
                            </Paper>
                            {/* <DialogActions>
                              <Button onClick={handleClose} color="primary">
                                Cancel
          </Button>
                              <Button onClick={handleSelectSeats} color="primary">
                                SelectSeats
          </Button>            <div style={{ marginTop: "100px" }}>
                              <SeatPicker
                                visible = {selectSeats}
                                // addSeatCallback={this.addSeatCallback}
                                // removeSeatCallback={this.removeSeatCallback}
                                rows={rows}
                                maxReservableSeats={3}
                                alpha
                                visible
                                selectedByDefault
                                // loading={loading}
                                tooltipProps={{ multiline: true }}
                              />
                            </div> */}

                            {/* </DialogActions> */}
                          </Dialog>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>

                        </GridItem>
                      </GridContainer>

                    )
                  },
                  {
                    tabButton: "Book Tickets",
                    tabIcon: AttachMoneyIcon,
                    tabContent: (
                      <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={4}>

                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>

                        </GridItem>
                      </GridContainer>
                    )
                  }
                ]}
              />
            </GridItem>
          </GridContainer>
        </Typography>
        {/* <SelectSeats/> */}
      </Paper>

    </Grid>
  );
}

Sidebar.propTypes = {
  movieId: PropTypes.string
};