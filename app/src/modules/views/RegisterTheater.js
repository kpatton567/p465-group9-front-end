import React, {useState} from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth0 } from '@auth0/auth0-react';
import GridContainer from "../components/GridContainer.js";
import GridItem from "../components/GridItem.js";
import {apiVariables} from '../../APIConstants'
import Parallax from "../components/Parallax.js";
import RFTextField from '.././form/RFTextField';
import { Field, Form, FormSpy } from 'react-final-form';
import Grid from '@material-ui/core/Grid';
import FormButton from '.././form/FormButton';
import FormFeedback from '.././form/FormFeedback';
import AppAppBar from '../views/AppAppBar';
import styles from "./profilePageStyles.js";
import axios from 'axios';
import AppFooter from '../views/AppFooter';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { withRouter } from 'react-router'
import Typography from '../components/Typography';

const useStyles = makeStyles(styles);
function RegisterTheater(props) {
  const classes = useStyles();
  // const { ...rest } = props;
  const [sent, setSaved] = React.useState(false);
  const [buttonIsHovered, setButtonHovered] = React.useState(false);
  const { user, isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
  const [theaterName, setTheaterName] = React.useState('');
  const [theaterCapacity, setTheaterCapacity] =  React.useState('');   
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [state , setState] = useState({
    email : "",
  })
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const fetchData = React.useCallback(() => {
    if(user !== undefined)
      setState(user.email);
  }, [])
  React.useEffect(() => {
    fetchData()
  }, [fetchData])
  const handleSubmit = () => {
    setSaved(true);
  };
  const handleSubmitClick = (e) => {
    e.preventDefault();
    const payload={
      "name":theaterName,
      "managerId" : user.sub.substring(6),
      "capacity":theaterCapacity,
    }
    axios.post(apiVariables.apiUrl +'/api/admin/add_theater', payload, {
    })
    .then((response) => {
        setAlertOpen(true);
        setTimeout(()=> props.history.push('/manager/managerView/manageMovies'), 2000);
    })
    .catch((error) => {
        console.log(error)
    })
    console.log(payload);
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
  if (isAuthenticated && !isLoading && user && !alertOpen)
    return (
      <div>
        <AppAppBar/>
        <Parallax small filter image={require("../assets/popcorn.jpg")} />
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
              <div className={classes.description}>
                <Form onSubmit={handleSubmit} subscription={{ submitting: true }} >
                  {({ handleSubmit2, submitting }) => (
                    <form onSubmit={handleSubmit2} className={classes.form} noValidate >
                      <GridContainer justify="center" spacing={2}>
                          <Field
                            component={RFTextField}
                            autoComplete="fname"
                            fullWidth
                            placeholder="Theater Name"
                            name="theaterName"
                            required
                            defaultValue={theaterName}
                            margin="normal"
                            onChange={event => setTheaterName(event.target.value)} />
                          <Field
                            fullWidth
                            component={RFTextField}
                            autoComplete="fname"
                            margin="normal"
                            placeholder="Theater Capacity"
                            name="theaterCapacity"
                            required
                            defaultValue={theaterCapacity}
                            onChange={event => setTheaterCapacity(event.target.value)}
                          />
                      <FormSpy subscription={{ submitError: true }}>
                        {({ submitError }) =>
                          submitError ? (
                            <FormFeedback className={classes.feedback} error>
                              {submitError}
                            </FormFeedback>
                          ) : null
                        }
                      </FormSpy>
                      <FormButton
                        disabled={submitting || sent}
                        onClick={handleSubmitClick}
                        fullWidth
                        onMouseEnter={() => setButtonHovered(true)} 
                        onMouseLeave={() => setButtonHovered(false)}
                        className={buttonIsHovered ? classes.buttonHover : classes.button}
                      >
                        {submitting || sent ? 'In progressâ€¦' : 'Register Theater'}
                      </FormButton>
                      </GridContainer>
                      <div>
                        <Typography className={classes.subtext} align="center" variant="h5">
                          {''}
                        </Typography>
                      </div>
                    </form>
                  )}
                </Form>
              </div>
            </div>
          </div>
        </div>
        <AppFooter />
      </div>
    );
    if(alertOpen)
      return (
        <Snackbar open={alertOpen} autoHideDuration={6000} >
        <Alert  severity="success">
          Your theater has been registered successfully! Manage your movies!
        </Alert>
        {/* <div>{window.location='/managemovies'}</div> */}
      </Snackbar>
      )
}
export default withRouter(RegisterTheater);