import React from "react";

// reactstrap components
import {
  Button,
  FormGroup,
  InputGroup,
  Input,
  Container,
  Row,
  Col,
  Form,
  
} from "reactstrap";

// core components
import { useAuth0 } from '@auth0/auth0-react';
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import {CardContent, Typography, Divider, Grid, Card} from '@material-ui/core'
const useStyles = makeStyles({
    root: {
      width: 200,
      display: 'flex',
      alignItems: 'center',
    },
  });
  const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };
function AddReview(props) {
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);
  const [headline, setHeadline] = React.useState('');
  const [review, setReview] = React.useState('');
  const classes = useStyles();
  
  const savereview = () =>{
      console.log(value)
      console.log(headline)
      console.log(review)

  }
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });
  if (!isAuthenticated && isLoading) {
    return (<div></div>)
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
        <ProfilePageHeader posterLink={require("assets/img/profilebg.jpg")} />
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
                    What did you like or dislike about {props.match.params.movie}
              </p>
                <br />
              </Col>
            </Row>
            <br />
            
                <Row>
                  <Col className="ml-auto mr-auto" md="6">
                    <Card style={{
                      borderRadius: "8px",
                      margin: "20px 0 70px",
                      minHeight: "400px",
                      padding: "30px"
                    }}>
                      <Form inline style = {{paddingTop : '3rem'}}>
                      <FormGroup className="mb-2 mr-sm-2 mb-sm-0" style = {{width : '100%'}} >
                      <label style = {{marginRight: '17rem'}}>Overall Rating</label>
                      <Rating
                        name="hover-feedback"
                        value={value}
                        precision={0.5}
                        onChange={(event, newValue) => {
                        setValue(newValue);
                        }}
                        onChangeActive={(event, newHover) => {
                        setHover(newHover);
                        }}
                    />
                      <div className={classes.root}>
      
                    {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
                    </div></FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0" style = {{width : '100%', marginTop: '1rem'}}>
                          <Input
                            placeholder="Add a Headline"
                            style={{ width: '50rem', marginBottom:'1rem'}}
                            onChange= {event => 
                                setHeadline(event.target.value)}
                          />
                          <textarea style={{ width: '50rem',height: '200', marginBottom:'1rem',border: '1px solid #DDDDDD',borderRadius: '4px',color: '#66615b' }} rows={8} cols={50}
                          placeholder="What did you like/dislike about this movie? Would you recommend it to others?" onChange= {event => 
                            setReview(event.target.value)}
                        ></textarea>
                        </FormGroup>
                        <Button block className="btn-round" color="danger" style = {{ marginTop:'8rem', color: 'white',
                                                background: '#51cbce'}} onClick={() => savereview()}>
                          Save Response
                    </Button>
                      </Form>
                    </Card>
                  </Col>
                </Row>
          </Container>
        </div>
        <DemoFooter />
      </>
    );
}

export default AddReview;