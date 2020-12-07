import React from "react";

// reactstrap components
import {
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import { useAuth0 } from '@auth0/auth0-react';
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import { makeStyles } from '@material-ui/core/styles';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const useStyles = makeStyles((theme) => ({
  body: {
    fontFamily: 'Arial'
  },
  coupon: {
    border: '5px dotted #bbb',
    width: '80%',
    borderRadius: '15px',
    margin: '0 auto',
    maxWidth: '600px',
    margin: '1rem',
  },
  container: {
    padding: '2px 16px',
    backgroundColor: '#f1f1f1',
    height: '3rem'
  },

  promo: {
    background: '#ccc',
    padding: '3px',
  },

  expire: {
    color: 'red',
    marginBottom: '0',
    marginTop: '0'
  }
}));

function RewardsPage() {
  const classes = useStyles();
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (!isAuthenticated && isLoading) {
    return null;
  }
  if (!isAuthenticated && !isLoading) {
    return (<div>
      Loading
      {loginWithRedirect()}
    </div>)
  }
  if (isAuthenticated && !isLoading && user)
    return (
      <>
        <ExamplesNavbar />
        <ProfilePageHeader posterLink={require("assets/img/pexels-acharaporn-kamornboonyarush-1028723.jpg")} />
        <div className="section profile-content">
          <Container>
            <div className="owner">
              <div className="avatar">
                <img
                  alt="..."
                  className="img-circle img-no-padding img-responsive"
                  src={user.picture}
                />
              </div>
              <div className="name">
                <h4 className="title">
                  {user.nickname} <br />
                </h4>
              </div>
            </div>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="6">
                <p>
                  Apply these coupons and start saving some money!
            </p>
                <br />
              </Col>
            </Row>
            <br />
            <div style={{ display: 'flex' }}>
              <div className={classes.coupon}>
                <div className={classes.container}>
                </div>
                <img src="https://silicondales.com/wp-content/uploads/2018/03/cloud-20-per-cent-off.jpg" alt="Avatar" style={{ width: "100%", height: '15rem' }}></img>
                <div className={classes.container} style={{ backgroundColor: 'white' }}>
                  <b>END OF YEAR SALE, 20% OFF ANY PURCHASE</b>
                </div>
                <div className={classes.container}>
                  <p style={{ margin: '0' }}>Promo Code: <span className={classes.promo}>20ANYM</span>
                    <CopyToClipboard text='20ANYM'>
                      <button><i class="nc-icon nc-single-copy-04" style={{ marginLeft: '10px' }} /></button>
                    </CopyToClipboard>
                  </p>
                  <p className={classes.expire}>Expires: Dec 31, 2021</p>
                </div>

              </div>
              <div className={classes.coupon}>
                {/* <div className={classes.container}><h4>Company Logo</h4></div> */}
                <div className={classes.container}>

                </div>
                <img src="https://image.freepik.com/free-vector/smiling-girls-kids-holding-hands-friendship-concept-children-cartoon-characters_71593-357.jpg" alt="Avatar" style={{ width: "100%", height: '15rem' }}></img>
                <div className={classes.container} style={{ backgroundColor: 'white' }}>
                  <b>BUY ONE, GET ONE 50% OFF</b>
                </div>
                <div className={classes.container}>
                  <p style={{ margin: '0' }}>Promo Code: <span className={classes.promo}>BOGO50</span>
                    <CopyToClipboard text='BOGO50'>
                      <button><i class="nc-icon nc-single-copy-04" style={{ marginLeft: '10px' }} /></button>
                    </CopyToClipboard></p>
                  <p className={classes.expire}>Expires: March 09, 2021</p>
                </div>

              </div>
              <div className={classes.coupon}>
                {/* <div className={classes.container}><h4>Company Logo</h4></div> */}
                <div className={classes.container}>

                </div>
                <img src="https://static.vonbeau.net/images/uploads/offer/free-movie-ticket-atom-tickets.jpg" alt="Avatar" style={{ width: "100%", height: '15rem' }}></img>
                <div className={classes.container} style={{ backgroundColor: 'white' }}>
                  <b>TAKE 20% OFF WHEN BUYING TWO OR MORE TICKETS</b>
                </div>
                <div className={classes.container}>
                  <p style={{ margin: '0' }}>Promo Code: <span className={classes.promo}>TAKE20</span>
                    <CopyToClipboard text='TAKE20'>
                      <button><i class="nc-icon nc-single-copy-04" style={{ marginLeft: '10px' }} /></button>
                    </CopyToClipboard>
                  </p>
                  <p className={classes.expire}>Expires: Jan 03, 2021</p>
                </div>

              </div>
            </div>
          </Container>

        </div>
        <DemoFooter />
      </>
    );
}

export default RewardsPage;
