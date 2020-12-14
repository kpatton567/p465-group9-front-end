import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Reward from 'react-rewards';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from "@material-ui/core/Tooltip";
import FormHelperText from '@material-ui/core/FormHelperText';
import Snacks from './Snacks.js';
import { apiVariables, ACCESS_TOKEN_NAME } from '../../APIConstants';
import { withRouter } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import Geocode from "react-geocode";
import global from  "./global";
// import Marker from google.maps.Marker;
import {
    Button, Container, Input, FormGroup,Form } from "reactstrap";
import GoogleMapReact from 'google-map-react';
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
// import mobiscroll from '@mobiscroll/react';
// import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import Review from "views/examples/Review";
import Map from './Map';

Geocode.setApiKey("AIzaSyD9aslGTBwYBGkOZ858OLJtDvmmjovPs10");
Geocode.setLanguage("en");
Geocode.setRegion("na");
Geocode.enableDebug();
const useStyles = makeStyles((theme) => ({

    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },

    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(1),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
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
    },
    listItem: {
        padding: theme.spacing(2, 2),
    },
    root: {
        minWidth: 275,
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
}));

function Checkout(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [theaters, setTheaters] = React.useState([]);
    const [theaterId, setSelectedTheatre] = React.useState('');
    const [theaterName, setSelectedTheatreName] = React.useState('');
    const [snacks, setSnacks] = useState([]);
    const [showtimes, setShowtimes] = useState([]);
    const [selectedShowtime, setSelectedShowtime] = React.useState('');
    const [selectedSnack, setSelectedSnack] = React.useState([]);
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = ['Theatres ', 'Showtimes', 'Snacks', 'Payments', 'Review Order'];
    const [ccNum, setccNum] = React.useState('');
    const [cvv, setcvv] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [zip, setZip] = React.useState('');
    const [promo, setPromo] = React.useState('');
    const [ticketQuantity, setTicketQuantity] = React.useState('');
    const [theaterAddress, setAddress] = React.useState('');
    const [theaterLatitude, setLatitude] = React.useState('');
    const [theaterLongitude, setLongitude] = React.useState('');
    var selectedSnacks = [];
    const [showtimePrice, setShowtimePrice] = React.useState('');
    var reward = '';
    const movieId = props.movieId;
    const [alertOpen, setAlertOpen] = React.useState(false);
    const { loginWithRedirect, isAuthenticated, user } = useAuth0();
    const [addressLine1, setAddressLine1] =  React.useState('');
    const [addressLine2, setAddressLine2] =  React.useState('');
    const [state, setState] =  React.useState('');
    const bull = <span className={classes.bullet}>•</span>;

    const defaultProps = {
        center: {
          lat: theaterLatitude,
          lng: theaterLongitude
        },
        Marker:{
            lat: theaterLatitude,
            lng: theaterLongitude,
            label:theaterAddress
        },
        zoom: 11
      };
    const { getCardNumberProps, getExpiryDateProps, getCVCProps, wrapperProps, getCardImageProps, } = usePaymentInputs();

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
                                <div id="demo-simple-select-placeholder-label-label">Choose a theater</div>
                                {theaters.map((item) =>
                                    <Button
                                    className="btn-round mr-1"
                                    color="danger"
                                    outline
                                    type="button"
                                    value={item.theaterId}
                                    onClick={handleTheaterChange} 
                                >
                                    {item.theaterName}
                                </Button>
                                )}
                            </FormControl></form>
                            <Map/>
                    </div>
                )
            case 1:
                if (!isAuthenticated) {
                    return (
                        <Button
                        className="btn-round mr-1"
                        color="default"
                        outline
                        type="button"
                        onClick={() => loginWithRedirect()}>Log in / Sign up to continue
                        </Button>
                    )
                }
                if (isAuthenticated) {
                return (
                    <div>
                        {/* <CalendarDemo/> */}
                        <div id="demo-simple-select-placeholder-label-label">Choose a showtime</div>
                        {showtimes.map((showtime) => (
                            <Tooltip
                            title={`$${showtime.price}`}
                            placement="top"
                        >
                                    <Button
                                    className="btn-round mr-1"
                                    color="danger"
                                    outline
                                    type="button"
                                    key={showtime.showtimeId}
                                    onClick={() => handleShowTimeClick(showtime.showtimeId, showtime.price)} 
                                >
                                    {showtime.date}
                                </Button>
                                </Tooltip>
                        ))}
                        {/* {showtimes.map((showtime) => (
                            <Tooltip
                                title={`$${showtime.price}`}
                                placement="top"
                            >
                                <Chip clickable key={showtime.showtimeId} label={showtime.date} onClick={() => handleShowTimeClick(showtime.showtimeId, showtime.price)} />
                            </Tooltip>
                        ))} */}
                    </div>
                );
            }
            case 2:
                if (!isAuthenticated) {
                    return (
                        <Button
                        className="btn-round mr-1"
                        color="default"
                        outline
                        type="button"
                        onClick={() => loginWithRedirect()}>Log in / Sign up to continue
                        </Button>
                    )
                }
                if (isAuthenticated) {
                return <div>
                    <form className={classes.container}>
                        <FormControl className={classes.formControl}>
                            {snacks.map(postDetail => (
                                <Snacks
                                    increaseTotals={increaseTotals}
                                    decreaseTotals={decreaseTotals}
                                    {...postDetail}
                                />
                            ))}
                        </FormControl>
                    </form>
                </div>
                }
                
            case 3:
                if (!isAuthenticated) {
                    return (
                        <Button
                        className="btn-round mr-1"
                        color="default"
                        outline
                        type="button"
                        onClick={() => loginWithRedirect()}>Log in / Sign up to continue
                        </Button>
                    )
                }
                if(isAuthenticated )
                {return (
                    <React.Fragment>
                        <Typography variant="h6" gutterBottom>
                            Payment method
                        </Typography>
                        <Form inline style = {{paddingTop : '1rem'}}>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                          <Input style={{ marginBottom:'1rem',width: '322px' }} defaultValue={userName} placeholder="Name on Card" type="text" onChange={event => setUserName(event.target.value)}/>
                        </FormGroup>
                        <FormGroup className="mb-2  mb-sm-0">
                        <FormHelperText>Ticket(s)</FormHelperText>
                        <Select
                                    defaultValue={ticketQuantity}
                                    onChange={event => setTicketQuantity(event.target.value)}
                                    fullWidth
                                    autoComplete="cc-csc"
                                    InputLabelProps={{ shrink: true }}
                                    style={{ width : '3rem', marginTop : '5px',marginBottom:'1rem', width: '100px' }}
                                >

                                    <MenuItem value="1">1</MenuItem>
                                    <MenuItem value="2" >2</MenuItem>
                                    <MenuItem value="3">3</MenuItem>
                                    <MenuItem value="4" >4</MenuItem>
                                    <MenuItem value="5">5</MenuItem>
                                    
                                </Select>
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0" >
                          <Input
                            defaultValue={user.email}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            style={{ width: '234px', marginBottom:'1rem' }}
                            
                          />
                        </FormGroup>
                        <FormGroup className="mb-2  mb-sm-0">
                          <Input
                            name="mobile"
                            id="mobile"
                            placeholder="Mobile"
                            style={{ width: '238px', marginBottom:'1rem' }}
                            
                          />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                          <Input defaultValue = {addressLine1} style={{ marginBottom:'1rem',width: '234px' }} placeholder="Address Line 1" type="text" onChange={event => setAddressLine1(event.target.value)} />
                        </FormGroup>
                        <FormGroup className="mb-2  mb-sm-0">
                        <Input defaultValue = {addressLine2} style={{marginBottom:'1rem', width: '238px' }} placeholder="Address Line 2 (optional)" type="text" onChange={event => setAddressLine2(event.target.value)}/>
                        </FormGroup>
                         <FormGroup>
                  </FormGroup>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                          <Input style={{ marginBottom:'1rem',width: '155px' }} value = "United States" type="text" />
                        </FormGroup>
                        <FormGroup className="mb-2  mb-sm-0">
                        <Input defaultValue = {state} style={{marginBottom:'1rem', width: '179px', marginRight : '10px' }} placeholder="State" type="text" onChange={event => setState(event.target.value)} />
                        </FormGroup>
                        <FormGroup className="mb-2  mb-sm-0">
                        <Input inputProps={{ maxLength: 5 }} style={{marginBottom:'1rem', width: '130px' }} placeholder="Zip" type="text" onChange={event => setZip(event.target.value)}/>
                        </FormGroup>
                        <PaymentInputsWrapper {...wrapperProps} style = {{marginRight: '15px',float: 'left',width: '347px',fontSize: '12pt'}}>
                            <svg {...getCardImageProps({ images })} />
                            <input {...getCardNumberProps({ onChange: event => setccNum(event.target.value)} )}/>
                            <input {...getExpiryDateProps()} />
                            <input {...getCVCProps( {onChange: event => setcvv(event.target.value)} )} type = "password" />
                        </PaymentInputsWrapper>
                        <Input
                                placeholder = "PROMO"
                                id="promo"
                                inputProps={{ maxLength: 5 }}
                                label="PROMO"
                                defaultValue={promo}
                                onChange={event => setPromo(event.target.value)}
                                fullWidth
                                autoComplete="cc-csc"
                                style={{ width: '120px', marginBottom : '10px', marginTop : '10px', height: '40px' }}
                            />
                      </Form>
                        
                    </React.Fragment>)}
                    case 4:
                        if (!isAuthenticated) {
                            return (
                                <Button
                                className="btn-round mr-1"
                                color="default"
                                outline
                                type="button"
                                onClick={() => loginWithRedirect()}>Log in / Sign up to continue
                                </Button>
                            )
                        }
                        if (isAuthenticated) {
                        return (
                            <Review ticketprice = {showtimePrice} addressLine1 = {addressLine1} addressLine2= {addressLine2} state={state} zip = {zip} userName = {userName} ccNum = {ccNum} ticketQuantity={ticketQuantity}/>
                        );
                    }
            default:
                throw new Error('Unknown step');
        }
    }
    const handlePayment = () => {

        
        var token = localStorage.getItem(ACCESS_TOKEN_NAME)

        const payload = {
          "theaterId": theaterId,
          "movieId": movieId,
          "showtimeId": selectedShowtime,
          "creditCardNumber": ccNum,
          "cvv": cvv,
          "name": userName,
          "zip": zip,
          "promo": promo,
          "ticketQuantity": ticketQuantity,
          "snacks": selectedSnack,
        }
        console.log(payload)

        axios.post(apiVariables.apiUrl +'/api/customer/customer_payment', payload, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
        }).then(function (response) {
            if (response.status === 200) {
                setAlertOpen(true);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
        setTimeout(()=> setAlertOpen(true), 3000);
      }
    const handleTheaterChange = (event) => {
        global.movietheaterId = event.target.value;
        console.log(global.movietheaterId);
        setSelectedTheatre(event.target.value);
        // console.log(event.target.value)
        setSelectedTheatreName(event.target.name);
        axios({
            "method": "POST",
            "url": apiVariables.apiUrl + '/api/home/movie_theater_showtimes?theaterId=' + event.target.value + '&movieId=' + movieId,
            "crossdomain": "true"
        })
            .then((response) => {
                setShowtimes(response.data.showtimes)
            })
            .catch((error) => {
                console.log(error)
            })
        axios({
                "method": "GET",
                "url": apiVariables.apiUrl + '/api/home/snacks/' + event.target.value,
            })
            .then((response) => {
                console.log(response.data)
                setSnacks(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
    
    const handleShowTimeClick = (showtime, price) => {
        setShowtimePrice(price)
        setSelectedShowtime(showtime);
    }
   
    const increaseTotals = (counter, snackId) => {
        selectedSnacks[snackId] = counter
        console.log(selectedSnacks)
    };

    const decreaseTotals = (counter, snackId) => {
        selectedSnacks[snackId] = counter
        console.log(selectedSnacks)
    };

    const MarkersC = ( {text} ) => <div >{text}</div>;
    if (!alertOpen)
        return (
            <Container justify="center">
                < >
                    <Paper className={classes.paper} style = {{ width: '42rem', height: 'auto'}}>
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
                                    {getStepContent(activeStep)}
                                    <div className={classes.buttons}>
                                        {activeStep !== 0 && (
                                            <Button onClick={handleBack} className={classes.button} style = {{    color: 'white',
                                            background: '#51cbce'}}
                                            color="primary">
                                                Back
                </Button>
                                        )}                                       
                                        <Button
                                      
                                        className="btn-round mr-1"
                                        color="neutral"
                                        outline
                                        >
                                        <i className="fa fa-play" />
                                        View Movies
                                        </Button>
                                        <Reward
                                        ref={(ref) => { reward = ref }}
                                        type='confetti'
                                        >
                                           
                                        <Button
                                            className="btn-round mr-1"
                                            color="primary"
                                            outline
                                            type="button"
                                            onClick={activeStep === steps.length - 1 ? handlePayment : handleNext}
                                            className={classes.button}
                                        >
                                            {activeStep === steps.length - 3 ? 'Skip' : (activeStep === steps.length - 1 ? 'Place Order' : 'Next')}
                                            </Button>
                                        </Reward>
                                    </div>
                                </React.Fragment>
                            ) : (
                                    <React.Fragment>
                                        {getStepContent(activeStep)}
                                        <div className={classes.buttons}>
                                            {activeStep !== 0 && (
                                                <Button className="btn-round mr-1"
                                                color="primary"
                                                outline
                                                type="default" onClick={handleBack} className={classes.button}>
                                                    Back
                                                </Button>
                                            )}
                                            <Button
                                                className="btn-round mr-1"
                                                color="primary"
                                                outline
                                                type="button"
                                                onClick={activeStep === steps.length - 1 ? handlePayment : handleNext}
                                                className={classes.button}
                                            >
                                               {activeStep === steps.length - 3 ? 'Skip' : (activeStep === steps.length - 1 ? 'Place Order' : 'Next')}

                                                {/* {activeStep === steps.length - 1 ? 'Place Order' : 'Next'} */}
                                            </Button>
                                        </div>
                                    </React.Fragment>
                                )}
                        </React.Fragment>
                    </Paper>
                </>
        </Container>
    );
    if(alertOpen)
      return (
        <Container justify="center">
        < >
        <Paper className={classes.paper}>
        <div style = {{margin : '10px'}}>
        <h5>Your order has been processed.</h5>
        <div className={classes.buttons}>
        <Button href='/' className={classes.button} style = {{color: 'white', background: '#51cbce'}}color="primary">Go Home</Button> 
        <Button href='/your-orders' className={classes.button} style = {{color: 'white', background: '#51cbce'}}color="primary">Your Orders</Button> 
        </div>
        </div>
        </Paper>
        </>
        </Container>
      )
}

export default withRouter(Checkout)