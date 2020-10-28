import React, {useState} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useAuth0 } from '@auth0/auth0-react';

// core components
import Header from "../components/Header.js";
// import Footer from "components/Footer/Footer.js";
import GridContainer from "../components/GridContainer.js";
import GridItem from "../components/GridItem.js";
import HeaderLinks from "../components/HeaderLinks.js";

import Parallax from "../components/Parallax.js";
import RFTextField from '.././form/RFTextField';
import { Field, Form, FormSpy } from 'react-final-form';
import Grid from '@material-ui/core/Grid';
import FormButton from '.././form/FormButton';
import FormFeedback from '.././form/FormFeedback';

import styles from "./profilePageStyles.js";

import AppFooter from '../views/AppFooter';


const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const [sent, setSaved] = React.useState(false);
  const [buttonIsHovered, setButtonHovered] = React.useState(false);
  const { user, isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
            
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
        // const payload={
        //     "email":state.email,
        //     "password":state.password,
        // }
      console.log("Test");
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

  if (isAuthenticated && !isLoading && user)
    return (
      <div>
        <Header
          color="transparent"
          brand="Material Kit React"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 200,
            color: "white"
          }}
          {...rest}
        />
        {/* <AppAppBar/> */}
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
                      {/* <h6>DESIGNER</h6> */}

                      {/* <Button justIcon link className={classes.margin5}>
                        <i className={"fab fa-twitter"} />
                        test
                    </Button> */}
                    </div>
                  </div>
                </GridItem>
              </GridContainer>
              <div className={classes.description}>
                <Form onSubmit={handleSubmit} subscription={{ submitting: true }} >
                  {({ handleSubmit2, submitting }) => (
                    <form onSubmit={handleSubmit2} className={classes.form} noValidate >
                      <GridContainer justify="center" spacing={2}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Field
                            autoFocus
                            component={RFTextField}
                            autoComplete="fname"
                            fullWidth
                            label="First name"
                            name="firstName"
                            required
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Field
                            component={RFTextField}
                            autoComplete="lname"
                            fullWidth
                            label="Last name"
                            name="lastName"
                            required
                          />
                        </Grid>
                      </Grid>
                      <Field
                        component={RFTextField}
                        disabled={submitting || sent}
                        fullWidth
                        value={state.email}
                        label="Email"
                        margin="normal"
                        name="email"
                        required
                      />
                      <Field
                        fullWidth
                        component={RFTextField}
                        disabled={submitting || sent}
                        required
                        name="mobile"

                        label="Mobile Number"
                        type="mobile"
                        margin="normal"
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
                        // className={classes.button}
                        disabled={submitting || sent}
                        onClick={handleSubmitClick}
                        fullWidth
                        onMouseEnter={() => setButtonHovered(true)} 
                        onMouseLeave={() => setButtonHovered(false)}
                        className={buttonIsHovered ? classes.buttonHover : classes.button}
                      >
                        {submitting || sent ? 'In progress…' : 'Save Changes'}
                      </FormButton>
                      </GridContainer>
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
}