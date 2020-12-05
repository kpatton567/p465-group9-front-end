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
import { Chip } from '@material-ui/core'
import { apiVariables, ACCESS_TOKEN_NAME } from '../../APIConstants';
import { withRouter } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import Geocode from "react-geocode";
// import Marker from google.maps.Marker;
import {
    Button, Container, Input, FormGroup, Alert } from "reactstrap";
import GoogleMapReact from 'google-map-react';
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';

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
    },
    listItem: {
        padding: theme.spacing(2, 2),
    }
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
    const steps = ['Theatres ', 'Showtimes', 'Snacks', 'Payments'];
    const [ccNum, setccNum] = React.useState('');
    const [cvv, setcvv] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [zip, setZip] = React.useState('');
    const [ticketQuantity, setTicketQuantity] = React.useState('');
    const [theaterAddress, setAddress] = React.useState('');
    const [theaterLatitude, setLatitude] = React.useState('');
    const [theaterLongitude, setLongitude] = React.useState('');
    var selectedSnacks = [];
    var reward = '';
    const movieId = props.movieId;
    const [alertOpen, setAlertOpen] = React.useState(false);
    const { loginWithRedirect, isAuthenticated, user } = useAuth0();
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
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">Theatre</InputLabel>

                                <Select
                                    labelId="demo-simple-select-placeholder-label-label"
                                    id="demo-simple-select-placeholder-label"
                                    value={theaterId}
                                    name={theaterName}
                                    onChange={handleTheaterChange}
                                    displayEmpty
                                    className={classes.selectEmpty}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    {theaters.map((item) =>
                                        <MenuItem value={item.theaterId} name={item.theaterName}>{item.theaterName}</MenuItem>
                                    )}

                                </Select>

                            </FormControl></form>
                    </div>
                )
            case 1:
                return (
                    <div>
                        {showtimes.map((showtime) => (
                            <Tooltip
                                title={`$${showtime.price}`}
                                placement="top"
                            >
                                <Chip clickable key={showtime.showtimeId} label={showtime.date} onClick={() => handleShowTimeClick(showtime.showtimeId)} />
                            </Tooltip>
                        ))}
                    </div>
                );
            case 2:
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
                </div>;
            case 3:
                if (!isAuthenticated) {
                    return (
                        <Button onClick={handleClickOpen} color="inherit"
                            underline="none"
                            className={classes.rightLink}
                            onClick={() => loginWithRedirect()}
                        >Log in / Sign up to continue</Button>
                    )
                }
                if(isAuthenticated )
                {return (
                    <React.Fragment>
                        <Typography variant="h6" gutterBottom>
                            Payment method
                        </Typography>
                        
                        <FormGroup style = {{padding: '10px'}}>
                        <FormGroup>
                        <Input
                            name="email"
                            id="email"
                            defaultValue={userName}
                            placeholder="Name on Card"
                            style={{ width: '290px', marginBottom : '10px', float : 'left', marginRight: '18px'}}
                            onChange={event => setUserName(event.target.value)}
                          />
                          <div>
                          <FormHelperText>Ticket(s)</FormHelperText>
                          <Select
                                    defaultValue={ticketQuantity}
                                    onChange={event => setTicketQuantity(event.target.value)}
                                    fullWidth
                                    autoComplete="cc-csc"
                                    InputLabelProps={{ shrink: true }}
                                    style={{ width : '3rem', marginBottom : '10px', marginTop : '5px' }}
                                >

                                    <MenuItem value="1">1</MenuItem>
                                    <MenuItem value="2" >2</MenuItem>
                                    <MenuItem value="3">3</MenuItem>
                                    <MenuItem value="4" >4</MenuItem>
                                    <MenuItem value="5">5</MenuItem>
                                    
                                </Select>
                            </div>
                            </FormGroup>
                            <PaymentInputsWrapper {...wrapperProps} style = {{marginRight: '15px',float: 'left',width: '290px',fontSize: '10pt'}}>
                            <svg {...getCardImageProps({ images })} />
                            <input {...getCardNumberProps({ onChange: event => setccNum(event.target.value)} )}/>
                            <input {...getExpiryDateProps()} />
                            <input {...getCVCProps( {onChange: event => setcvv(event.target.value)} )} type = "password" />
                            </PaymentInputsWrapper>
                            {/* 
                            <svg {...getCardImageProps({ images })} />
                            <Grid item xs={12} md={6}>
                                <TextField
                                {...getCardNumberProps()}
                                    required
                                    id="cardNumber"
                                    label="Credit Card number"
                                    defaultValue={ccNum}
                                    onChange={event => setccNum(event.target.value)}
                                    inputProps={{ maxLength: 16 }}
                                    fullWidth
                                    autoComplete="cc-number"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Input {...getExpiryDateProps()} fullWidth style={{paddingTop:"15px"}}label="Expiration Date" type="month" name="exp_date" />

                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                {...getCVCProps()}
                                    required
                                    id="cvv"
                                    type="password"
                                    inputProps={{ maxLength: 3 }}
                                    label="CVV"
                                    defaultValue={cvv}
                                    onChange={event => setcvv(event.target.value)}
                                    fullWidth
                                    autoComplete="cc-csc"
                                />
                            </Grid>
                            </PaymentInputsWrapper> */}
                                <Input
                                    placeholder = "ZIP Code"
                                    required
                                    id="zip"
                                    inputProps={{ maxLength: 5 }}
                                    label="ZIP"
                                    defaultValue={zip}
                                    onChange={event => setZip(event.target.value)}
                                    fullWidth
                                    autoComplete="cc-csc"
                                    style={{ width: '85px', marginBottom : '10px', marginTop : '10px', height: '33px' }}
                                />
                                </FormGroup> 
                    </React.Fragment>)}
            default:
                throw new Error('Unknown step');
        }
    }
    const handlePayment = () => {

        console.log(selectedSnack)
            
        console.log(selectedSnacks)
        //setSelectedSnack(selectedSnacks)
        var token = localStorage.getItem(ACCESS_TOKEN_NAME)

        const payload = {
            "theaterId": theaterId,
            "movieId": movieId,
            "showtimeId": selectedShowtime,
            "creditCardNumber": ccNum,
            "cvv": cvv,
            "name": userName,
            "zip": zip,
            "ticketQuantity": ticketQuantity,
            "snacks": selectedSnack,
        }
        console.log(payload);

        axios.post(apiVariables.apiUrl + '/api/customer/customer_payment', payload, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(function (response) {
            if (response.status === 200) {
                setAlertOpen(true);
                reward.rewardMe();
            }
        })
        .catch(function (error) {
            console.log(error);
        });

        setTimeout(()=> setAlertOpen(true), 3000);
        reward.rewardMe();
      }
    const handleTheaterChange = (event) => {

        setSelectedTheatre(event.target.value);
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
        axios({
            "method": "GET",
            "url": apiVariables.apiUrl + '/api/home/theater_address/' + theaterId,
        })
            .then((response) => {
                console.log(response.data)
                setAddress(response.data)
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
    
    const handleShowTimeClick = (showtime) => {
        setSelectedShowtime(showtime);
    }
   
    const increaseTotals = (counter, snackId) => {
        selectedSnacks[snackId] = counter
    };

    const decreaseTotals = (counter, snackId) => {
        selectedSnacks[snackId] = counter
    };

    const MarkersC = ( {text} ) => <div >{text}</div>;
    if (!alertOpen)
        return (
            <Container justify="center">
                < >
                    <Paper className={classes.paper}>
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
                                        <Reward
                                        ref={(ref) => { reward = ref }}
                                        type='confetti'
                                        >
                                        <Button
                                            style = {{    color: 'white',
                                                background: '#51cbce'}}
                                            color="primary"
                                            onClick={activeStep === steps.length - 1 ? handlePayment : handleNext}
                                            className={classes.button}
                                        >
                                            {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
                                        </Button>
                                        </Reward>
                                    </div>
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

                                            {/* <Link style={{ marginRight: 'auto'}} to={props.isCustomer ? '/client' : ''} >Questions? Contact us</Link> */}
                                            <Link style={{ marginRight: 'auto' }} to='/client'  >Questions? Contact us</Link>
                                            <div style={{ height: '25vh', width: '100%' }}>
                                                <GoogleMapReact
                                                    bootstrapURLKeys={{ key: 'AIzaSyD9aslGTBwYBGkOZ858OLJtDvmmjovPs10' }}
                                                    defaultCenter={defaultProps.center}
                                                    defaultZoom={defaultProps.zoom}
                                                >
                                                    <MarkersC lat={theaterLatitude} lng={theaterLongitude} text={theaterAddress} key={'AIzaSyD9aslGTBwYBGkOZ858OLJtDvmmjovPs10'} />
                                                </GoogleMapReact>
                                            </div>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={activeStep === steps.length - 1 ? handlePayment : handleNext}
                                                className={classes.button}
                                            >
                                                {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
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

// import React, { useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import InputLabel from '@material-ui/core/InputLabel';
// import Input from '@material-ui/core/Input';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import axios from 'axios';
// import Stepper from '@material-ui/core/Stepper';
// import Step from '@material-ui/core/Step';
// import StepLabel from '@material-ui/core/StepLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import Tooltip from "@material-ui/core/Tooltip";
// import TextField from '@material-ui/core/TextField';
// import Snacks from './Snacks.js';
// import { Chip } from '@material-ui/core'
// import { apiVariables, ACCESS_TOKEN_NAME } from '../../APIConstants';
// import Snackbar from '@material-ui/core/Snackbar';
// import { withRouter } from 'react-router';
// import { useAuth0 } from '@auth0/auth0-react';
// import {
//     Button, Container} from "reactstrap";

// const useStyles = makeStyles((theme) => ({

//     container: {
//         display: 'flex',
//         flexWrap: 'wrap',
//     },
//     formControl: {
//         margin: theme.spacing(1),
//         minWidth: 120,
//     },

//     paper: {
//         marginTop: theme.spacing(3),
//         marginBottom: theme.spacing(1),
//         padding: theme.spacing(2),
//         [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
//             // marginTop: theme.spacing(6),
//             marginBottom: theme.spacing(6),
//             padding: theme.spacing(3),
//         },
//     },
//     stepper: {
//         padding: theme.spacing(3, 0, 5),
//     },
//     buttons: {
//         display: 'flex',
//         justifyContent: 'flex-end',
//     },
//     button: {
//         marginTop: theme.spacing(3),
//         marginLeft: theme.spacing(1),
//     },
//     boxStyle: {
//         border: "1px solid",
//         borderColor: theme.palette.secondary.light,
//         margin: theme.spacing(1)
//     },
//     listItem: {
//         padding: theme.spacing(2, 2),
//     }
// }));

// function Checkout(props) {
//     const classes = useStyles();
//     const [open, setOpen] = React.useState(false);
//     const [theaters, setTheaters] = React.useState([]);
//     const [theaterId, setSelectedTheatre] = React.useState('');
//     const [theaterName, setSelectedTheatreName] = React.useState('');
//     const [snacks, setSnacks] = useState([]);
//     const [showtimes, setShowtimes] = useState([]);
//     const [selectedShowtime, setSelectedShowtime] = React.useState('');
//     const [selectedSnack, setSelectedSnack] = React.useState([]);
//     const [activeStep, setActiveStep] = React.useState(0);
//     const steps = ['Theatres ', 'Showtimes', 'Snacks', 'Payments'];
//     const [ccNum, setccNum] = React.useState('');
//     const [cvv, setcvv] = React.useState('');
//     const [userName, setUserName] = React.useState('');
//     const [zip, setZip] = React.useState('');
//     const [ticketQuantity, setTicketQuantity] = React.useState('');
//     var selectedSnacks = [];
//     const movieId = props.movieId;
//     const [alertOpen, setAlertOpen] = React.useState(false);
//     const { loginWithRedirect, isAuthenticated, user } = useAuth0();

//     const fetchData = React.useCallback(() => {
//         axios({
//           "method": "POST",
//           "url": apiVariables.apiUrl + '/api/home/movie_showtimes?movieId=' + movieId,
//         })
//           .then((response) => {
//             console.log(response.data)
//             setTheaters(response.data)
//           })
//           .catch((error) => {
//             console.log(error)
//           })
//       }, [])
//       React.useEffect(() => {
//         fetchData()
//       }, [fetchData])

//     function getStepContent(step) {
//         switch (step) {
//             case 0:
//                 return (
//                     <div>
//                         <form className={classes.container}>
//                             <FormControl className={classes.formControl}>
//                                 <InputLabel shrink id="demo-simple-select-placeholder-label-label">Theatre</InputLabel>

//                                 <Select
//                                     labelId="demo-simple-select-placeholder-label-label"
//                                     id="demo-simple-select-placeholder-label"
//                                     value={theaterId}
//                                     name={theaterName}
//                                     onChange={handleTheaterChange}
//                                     displayEmpty
//                                     className={classes.selectEmpty}
//                                 >
//                                     <MenuItem value=""><em>None</em></MenuItem>
//                                     {theaters.map((item) =>
//                                         <MenuItem value={item.theaterId} name={item.theaterName}>{item.theaterName}</MenuItem>
//                                     )}

//                                 </Select>

//                             </FormControl></form>
//                     </div>
//                 )
//             case 1:
//                 return (
//                     <div>
//                         {showtimes.map((showtime) => (
//                             <Tooltip
//                                 title={`$${showtime.price}`}
//                                 placement="top"
//                             >
//                                 <Chip clickable key={showtime.showtimeId} label={showtime.date} onClick={() => handleShowTimeClick(showtime.showtimeId)} />
//                             </Tooltip>
//                         ))}
//                     </div>
//                 );
//             case 2:
//                 return <div>
//                     <form className={classes.container}>
//                         <FormControl className={classes.formControl}>
//                             {snacks.map(postDetail => (
//                                 <Snacks
//                                     increaseTotals={increaseTotals}
//                                     decreaseTotals={decreaseTotals}
//                                     {...postDetail}
//                                 />
//                             ))}
//                         </FormControl>
//                     </form>
//                 </div>;
//             case 3:
//                 if(!isAuthenticated)
//                 {
//                     return(
//                         <Button onClick={handleClickOpen} color="inherit"
//                         underline="none"
//                         className={classes.rightLink}
//                         onClick={() => loginWithRedirect()}
//                         >Log in / Sign up to continue</Button>
//                     )
//                 }
//                 if(isAuthenticated)
//                 {return (
//                     <React.Fragment>
//                         <Typography variant="h6" gutterBottom>
//                             Payment method
//                 </Typography>
//                         <Grid container spacing={3}>
//                             <Grid item xs={12} md={6}>
//                                 <TextField required id="cardName" label="Name on card" fullWidth autoComplete="cc-name"
//                                     defaultValue={userName}
//                                     onChange={event => setUserName(event.target.value)} />
//                             </Grid>
//                             <Grid item xs={12} md={6}>
//                                 <TextField
//                                     required
//                                     id="cardNumber"
//                                     label="Credit Card number"
//                                     defaultValue={ccNum}
//                                     onChange={event => setccNum(event.target.value)}
//                                     inputProps={{ maxLength: 16 }}
//                                     fullWidth
//                                     autoComplete="cc-number"
//                                 />
//                             </Grid>
//                             <Grid item xs={12} md={6}>

//                                 {/* <TextField required
//                                     id="expDate" format={'MM/YY'} inputType="number"
//                                     label="Expiry date (mm/yy)"
//                                     inputProps={{ maxLength: 5 }} fullWidth autoComplete="cc-exp" /> */}
//                                 <Input fullWidth style={{paddingTop:"15px"}}label="Expiration Date" type="month" name="exp_date" />

//                             </Grid>
//                             <Grid item xs={12} md={6}>
//                                 <TextField
//                                     required
//                                     id="cvv"
//                                     type="password"
//                                     inputProps={{ maxLength: 3 }}
//                                     label="CVV"
//                                     helperText="Last three digits on signature strip"
//                                     defaultValue={cvv}
//                                     onChange={event => setcvv(event.target.value)}
//                                     fullWidth
//                                     autoComplete="cc-csc"
//                                 />
//                             </Grid>
//                             <Grid item xs={12} md={6}>
//                                 <InputLabel id="demo-simple-select-helper-label">Ticket Quantity</InputLabel>
//                                 <Select
//                                     required
//                                     label="test"
//                                     helperText=""
//                                     defaultValue={ticketQuantity}
//                                     onChange={event => setTicketQuantity(event.target.value)}
//                                     fullWidth
//                                     autoComplete="cc-csc"
//                                     InputLabelProps={{ shrink: true }}
//                                 >

//                                     <MenuItem value="1" >1</MenuItem>
//                                     <MenuItem value="2" >2</MenuItem>
//                                     <MenuItem value="3">3</MenuItem>
//                                     <MenuItem value="4" >4</MenuItem>
//                                     <MenuItem value="5">5</MenuItem>

//                                 </Select>
//                             </Grid>
//                             <Grid item xs={12} md={6}>
//                                 <TextField
//                                     required
//                                     id="zip"
//                                     inputProps={{ maxLength: 5 }}
//                                     label="ZIP"
//                                     defaultValue={zip}
//                                     onChange={event => setZip(event.target.value)}
//                                     fullWidth
//                                     autoComplete="cc-csc"
//                                 />
//                             </Grid>
//                         </Grid>


//                     </React.Fragment>)}
//             default:
//                 throw new Error('Unknown step');
//         }
//     }
//     const handlePayment = () => {
//         // handlePreferences();
//         console.log(selectedSnack)
//         var token = localStorage.getItem(ACCESS_TOKEN_NAME)

//         const payload = {
//           "theaterId": theaterId,
//           "movieId": movieId,
//           "showtimeId": selectedShowtime,
//           "creditCardNumber": ccNum,
//           "cvv": cvv,
//           "name": userName,
//           "zip": zip,
//           "ticketQuantity": ticketQuantity,
//           "snacks": selectedSnack,
//         }
//         console.log(payload);

//         // axios.post(apiVariables.apiUrl +'/api/customer/customer_payment', payload, {
//         // headers: {
//         //     'Authorization': 'Bearer ' + token
//         // }
//         // }).then(function (response) {
//         //     if(response.status === 200){
//         //         setAlertOpen(true);
//         //         setTimeout(()=> props.history.push('/bookingHistory'), 3000);
//         //     }
//         // })
//         // .catch(function (error) {
//         //     console.log(error);
//         // });
//         console.log(payload);
//       }
//     const handleTheaterChange = (event) => {

//         setSelectedTheatre(event.target.value);
//         setSelectedTheatreName(event.target.name);
//         axios({
//             "method": "POST",
//             "url": apiVariables.apiUrl + '/api/home/movie_theater_showtimes?theaterId=' + event.target.value + '&movieId=' + movieId,
//             "crossdomain": "true"
//         })
//             .then((response) => {
//                 setShowtimes(response.data.showtimes)
//                 //console.log(response.data)
//             })
//             .catch((error) => {
//                 console.log(error)
//             })

//         axios({
//             "method": "GET",
//             "url": apiVariables.apiUrl + '/api/home/snacks/' + event.target.value,
//         })
//             .then((response) => {
//                 console.log(response.data)
//                 setSnacks(response.data)
//             })
//             .catch((error) => {
//                 console.log(error)
//             })
//     }
//     const handleNext = () => {
//         setActiveStep(activeStep + 1);
//     };

//     const handleClickOpen = () => {
//         setOpen(true);
//     };
//     const handleBack = () => {
//         setActiveStep(activeStep - 1);
//     };
//     const handlePreferences = () => {
//         const payload = {
//             "theaterId": theaterId,
//             "movieId": movieId,
//             "showtimeId": selectedShowtime,
//             "creditCardNumber": ccNum,
//             "cvv": cvv,
//             "name": userName,
//             "zip": zip,
//             "ticketQuantity": ticketQuantity,
//             "snacks": selectedSnack,
//         }
//         console.log(payload);
//         setSelectedSnack(selectedSnacks)
//         console.log(selectedSnack)
//         setActiveStep(activeStep + 1);
//     };
//     const handleShowTimeClick = (showtime) => {
//         setSelectedShowtime(showtime);
//     }
//     const handleClose = () => {
//         setOpen(false);
//         setActiveStep(0);
//     };
//     const increaseTotals = (counter, snackId) => {
//         // console.log("count:"+counter+"Snack id"+snackId)
//         selectedSnacks[snackId] = counter
//     };

//     const decreaseTotals = (counter, snackId) => {
//         selectedSnacks[snackId] = counter
//     };

//     if(!alertOpen)
//     return (
//         <Container justify="center">
//             < >
//                 <Paper className={classes.paper}>
//                     <Stepper activeStep={activeStep} className={classes.stepper}>
//                         {steps.map((label) => (
//                             <Step key={label}>
//                                 <StepLabel>{label}</StepLabel>
//                             </Step>
//                         ))}
//                     </Stepper>
//                     <React.Fragment>
//                         {activeStep === steps.length ? (
//                             <React.Fragment>
//                                 <Typography variant="h5" gutterBottom>
//                                     Your order has been placed.
//                                 </Typography>

//                             </React.Fragment>
//                         ) : (
//                                 <React.Fragment>
//                                     {getStepContent(activeStep)}
//                                     <div className={classes.buttons}>
//                                         {activeStep !== 0 && (
//                                             <Button onClick={handleBack} className={classes.button}>
//                                                 Back
//                 </Button>
//                                         )}


//                                         <Button
//                                             variant="contained"
//                                             color="primary"
//                                             onClick={activeStep === steps.length - 1 ? handlePayment : handleNext}
//                                             className={classes.button}
//                                         >
//                                             {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
//                                         </Button>
//                                     </div>
//                                 </React.Fragment>
//                             )}

//                     </React.Fragment>
//                 </Paper>
//             </>

//         </Container>
//     );
//     if(alertOpen)
//       return (
//         <Snackbar open={alertOpen} autoHideDuration={6000} >
//         <div  >
//           Your order has been placed. Redirecting you to Your Orders page!
//         </div>
//         {/* <div>{window.location='/managemovies'}</div> */}
//       </Snackbar>
//       )
// }

// export default withRouter(Checkout) 