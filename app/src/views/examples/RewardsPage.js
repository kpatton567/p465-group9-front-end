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
import {CopyToClipboard} from 'react-copy-to-clipboard';

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
        margin:'1rem',
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
        marginBottom : '0',
        marginTop : '0'
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
      <ProfilePageHeader posterLink = {require("assets/img/pexels-acharaporn-kamornboonyarush-1028723.jpg")}/>
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
          <div style={{display: 'flex'}}>
          <div className= {classes.coupon}>
                <div className={classes.container}>
                </div>
                <img src="https://silicondales.com/wp-content/uploads/2018/03/cloud-20-per-cent-off.jpg" alt="Avatar" style={{width:"100%", height : '15rem'}}></img>
                <div className={classes.container} style={{backgroundColor:'white'}}>
                <b>20% OFF YOUR PURCHASE</b>
                </div>
                <div className={classes.container}>
                <p style = {{margin: '0'}}>Promo Code: <span className={classes.promo}>BOH232</span>
                <CopyToClipboard text='BOH232'>
                <button><i class="nc-icon nc-single-copy-04" style = {{marginLeft: '10px'}}/></button>
          </CopyToClipboard>
                </p>
                <p className={classes.expire}>Expires: Jan 03, 2021</p>
                </div>
                
            </div>
            <div className= {classes.coupon}>
                {/* <div className={classes.container}><h4>Company Logo</h4></div> */}
                <div className={classes.container}>
         
                </div>
                <img src="https://image.freepik.com/free-vector/smiling-girls-kids-holding-hands-friendship-concept-children-cartoon-characters_71593-357.jpg" alt="Avatar" style={{width:"100%", height : '15rem'}}></img>
                <div className={classes.container} style={{backgroundColor:'white'}}>
                <b>REFER A FRIEND, GET 10% INSTANT OFF</b>
                </div>
                <div className={classes.container}>
                <p style = {{margin: '0'}}>Promo Code: <span className={classes.promo}>BOH232</span>
                <CopyToClipboard text='BOH232'>
                <button><i class="nc-icon nc-single-copy-04" style = {{marginLeft: '10px'}}/></button>
                </CopyToClipboard></p>
                <p className={classes.expire}>Expires: Jan 03, 2021</p>
                </div>
                
            </div>
            <div className= {classes.coupon}>
                {/* <div className={classes.container}><h4>Company Logo</h4></div> */}
                <div className={classes.container}>
             
                </div>
                <img src="https://static.vonbeau.net/images/uploads/offer/free-movie-ticket-atom-tickets.jpg" alt="Avatar" style={{width:"100%", height : '15rem'}}></img>
                <div className={classes.container} style={{backgroundColor:'white'}}>
                <b>BUY ONE GET ONE MOVIE TICKET*</b>
                </div>
                <div className={classes.container}>
                <p style = {{margin: '0'}}>Promo Code: <span className={classes.promo}>BOH232</span>
                <CopyToClipboard text='BOH232'>
                <button><i class="nc-icon nc-single-copy-04" style = {{marginLeft: '10px'}}/></button>
                </CopyToClipboard>
                </p>
                <p className={classes.expire}>Expires: Jan 03, 2021</p>
                </div>
                
            </div>
            <div className= {classes.coupon}>
                {/* <div className={classes.container}><h4>Company Logo</h4></div> */}
                <div className={classes.container}>
               
                </div>
                <img src="data:image/jpeg;base64,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" alt="Avatar" style={{width:"100%", height : '15rem'}}></img>
                <div className={classes.container} style={{backgroundColor:'white'}}>
                <b>1+1 snack Combo</b>
                </div>
                <div className={classes.container}>
                <p style = {{margin: '0'}}>Promo Code: <span className={classes.promo}>BOH232</span>
                <CopyToClipboard text='BOH232'>
                <button><i class="nc-icon nc-single-copy-04" style = {{marginLeft: '10px'}}/></button>
          </CopyToClipboard>                
                </p><p className={classes.expire}>Expires: Jan 03, 2021</p>
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
