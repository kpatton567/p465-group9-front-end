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
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import MenuItem from '@material-ui/core/MenuItem';

import ReviewOrder from '../views/ReviewOrder';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import  { apiVariables } from '../../APIConstants';

import GridContainer from "../components/GridContainer.js";
import GridItem from "../components/GridItem.js";
import { Chip, Box } from '@material-ui/core'
import { ChipSet } from '@material/react-chips';

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
  boxStyle: {
    border: "1px solid",
    borderColor: theme.palette.secondary.light,
    margin: theme.spacing(1)
  }
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const { description, movieId } = props;
  const [open, setOpen] = React.useState(false);
  const [ticketsopen, setTicketsOpen] = React.useState(false);
  const [response, setResponse] = React.useState([]);
  const [theaters, setTheaters] = React.useState([]);
  const [theaterId, setSelectedTheatre] = React.useState('');
  const [snacks, setSnacks] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [selectedShowtime, setSelectedShowtime] = React.useState('');
  const [selectedSnack, setSelectedSnack] = React.useState('');
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = ['Theatres ','Showtimes' ,'Snacks'];
  const PaymentSteps = ['Review Order', 'Checkout'];

  

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleSnackClick = (selectedSnack) =>{
    setSelectedSnack(selectedSnack)
  }
  const handleShowTimeClick = (showtime) =>{
    setSelectedShowtime(showtime);
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const fetchData = React.useCallback(() => {
    axios({
      "method": "POST",
      "url": apiVariables.apiUrl + '/api/home/movie_showtimes?movieId=' + movieId,
    })
      .then((response) => {
        setTheaters(response.data)
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
            <form className={classes.container}>
              <FormControl className={classes.formControl}>
              <InputLabel shrink id="demo-simple-select-placeholder-label-label">Theatre</InputLabel>

              <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={theaterId}
          onChange={handleTheaterChange}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value=""><em>None</em></MenuItem>
          {theaters.map((item) =>
          <MenuItem key = {item.theaterId} value={item.theaterId}>{item.theaterName}</MenuItem>
          )}
          
        </Select>
               
        </FormControl></form>
          </div>
        )
      case 1:
        return (
          <div>
          {showtimes.map((showtime) => (
            // <div>{snack.name}</div>
             <Chip clickable id={showtime.showtime} label={showtime.showtime} onClick={() => handleShowTimeClick(showtime.showtime)}/>
          ))}
          </div>
        );
      case 2:
        return <div>
          {snacks.map((snack) => (
            // <div>{snack.name}</div>
             <Chip clickable id={snack.name} label={snack.name} onClick={() => handleSnackClick(snack.name)} />

            ))}
            {/* <SelectSnacks theaterId={theaterId}/> */}
        </div>;
      default:
        throw new Error('Unknown step');
    }
  }
  function getPaymentStepContent(step) {
    switch (step) {
      case 0:
      return (
        <div>
          <ReviewOrder/>
        </div>
      );
      case 1:
          return (
          <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Payment method
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField required id="cardName" label="Name on card" fullWidth autoComplete="cc-name" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="cardNumber"
                label="Card number"
                inputProps={{ maxLength: 16 }}
                fullWidth
                autoComplete="cc-number"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField required id="expDate" label="Expiry date (mm/yy)" inputProps={{ maxLength: 5 }} fullWidth autoComplete="cc-exp" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="cvv"
                inputProps={{ maxLength: 3 }}
                label="CVV"
                helperText="Last three digits on signature strip"
                fullWidth
                autoComplete="cc-csc"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox color="secondary" name="saveCard" value="yes" />}
                label="Remember credit card details for next time"
              />
            </Grid>
          </Grid>
        </React.Fragment>
        )
    }
  }
  const handleTheatreChangeSetTimes = (item) => {
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClickTicketsOpen = () => {
    setTicketsOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setActiveStep(0);
  };
  
  const handleTicketsClose = () => {
    setTicketsOpen(false);
  };
  const handlePreferences = () => {
    console.log(selectedShowtime)
    console.log(selectedSnack)
    console.log(theaterId)
    setActiveStep(activeStep + 1);
  }

  const handleTheaterChange = (event) => {
    //console.log(event.target.value);
    setSelectedTheatre(event.target.value);   
    axios({
      "method": "POST",
      "url": apiVariables.apiUrl + '/api/home/movie_theater_showtimes?theaterId=' + event.target.value +'&movieId=' +movieId,
      "crossdomain" : "true"
    })
      .then((response) => {
          setShowtimes(response.data)
         // console.log(response.data)
      })
      .catch((error) => {
          console.log(error)
    })

    axios({
      "method": "GET",
      "url": apiVariables.apiUrl + '/api/home/snacks/' + event.target.value,
    })
      .then((response) => {
         // console.log(response.data)
          setSnacks(response.data)
      })
      .catch((error) => {
          console.log(error)
      })
  }
  const handlePayment = () => {
    console.log("pay");
  }
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
                    tabButton: "Theaters",
                    tabIcon: WatchLaterIcon,
                    tabContent: (
                      <GridContainer justify="center">
                        <GridItem >
                          <Button onClick={handleClickOpen} style={{ color: theme.palette.secondary.light }}>See availability</Button>
                          <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
                            {/* <DialogTitle>Choose your theatre</DialogTitle> */}
                            <Paper className={classes.paper}>
                              <CancelIcon onClick={handleClose} style={{ cursor: 'pointer', float: 'right', marginTop: '5px', width: '20px' }} />
                             
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
                                      Your preferences have been saved.
                                    </Typography>
                                    <Typography variant="subtitle1">

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
                                          onClick={activeStep === steps.length - 1 ? handlePreferences : handleNext}
                                          className={classes.button}
                                        >
                                          {activeStep === steps.length - 1 ? 'Choose' : 'Next'}
                                        </Button>
                                      </div>
                                    </React.Fragment>
                                  )}

                              </React.Fragment>
                            </Paper>

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
                        <GridItem >
                          <Button onClick={handleClickTicketsOpen} style={{ color: theme.palette.secondary.light }}>Book Tickets</Button>
                          <Dialog disableBackdropClick disableEscapeKeyDown open={ticketsopen} onClose={handleClose}>
                            {/* <DialogTitle>Choose your theatre</DialogTitle> */}
                            <Paper className={classes.paper}>
                              <CancelIcon onClick={handleTicketsClose} style={{ cursor: 'pointer', float: 'right', marginTop: '5px', width: '20px' }} />
                              <Stepper activeStep={activeStep} className={classes.stepper}>
                                {PaymentSteps.map((label) => (
                                  <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                  </Step>
                                ))}
                              </Stepper>
                              <React.Fragment>
                                {activeStep === PaymentSteps.length ? (
                                  <React.Fragment>
                                    <Typography variant="h5" gutterBottom>
                                      Thank you for your order.
                                    </Typography>
                                    <Typography variant="subtitle1">
                                    </Typography>
                                  </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                      {getPaymentStepContent(activeStep)}
                                      <div className={classes.buttons}>
                                        {activeStep !== 0 && (
                                          <Button onClick={handleBack} className={classes.button}>
                                            Back
                    </Button>
                                        )}
                                      
                                       
                                        <Button
                                          variant="contained"
                                          color="primary"
                                          onClick={handlePayment}
                                          className={classes.button}
                                        >
                                          {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
                                        </Button>
                                      </div>
                                    </React.Fragment>
                                  )}
                              </React.Fragment>
                             </Paper>
                          </Dialog>
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
      </Paper>

    </Grid>
  );
}

Sidebar.propTypes = {
  movieId: PropTypes.string
};