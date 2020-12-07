import React from "react";
import axios from 'axios';
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import { apiVariables, ACCESS_TOKEN_NAME } from '../../APIConstants';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Container,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

function AddShowtime(props) {
    var token = localStorage.getItem(ACCESS_TOKEN_NAME);
    const [showTime, setshowTime] = React.useState('');
    const [ticketPrice, setticketPrice] = React.useState('');
    const handleSubmitClick = (e) => {
      e.preventDefault();
      const payload = {
        "movieId": props.match.params.movie,
        "showtime": showTime,
        "price":ticketPrice,
      }
      axios.post((apiVariables.apiUrl + '/api/manage/add_showtime'), payload,{
        headers: {
          "Authorization": 'Bearer ' + token
        }
      })
        .then(function (response) {
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    return (
      <>
      <ProfilePageHeader posterLink={require("assets/img/profilebg.jpg")} />
      <div  >
      <div style = {{position: 'relative',
  backgroundColor: '#f4f3ef'}}>
        <Container>
          <div className="owner">
            <div className="avatar">
              {/* <img
                alt="..."
                // className="img-circle img-no-padding img-responsive"
                // src={user.picture}
              /> */}
            </div>
            <div className="name">
              <h4 className="title">
                Theater Manager<br />
              </h4>
            </div>
          </div>
          <Row>
            <Col className="ml-auto mr-auto text-center" md="6">
              <p>
                Edit your profile, choose your prefrences to get customized coupons, emails, movie recommendations and many more!
            </p>
              <br />
            </Col>
          </Row>
          <br />
          <div>
              <Row>
              <Col className="ml-auto mr-auto" md="6">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Add Showtime</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>Snack Name*</label>
                          <Input
                            defaultValue={showTime} 
                            onChange={event => setshowTime(event.target.value)}
                            required
                            placeholder="Showtime"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                      <FormGroup>
                          <label>Ticket Price*</label>
                          <Input
                            defaultValue={ticketPrice} 
                            onChange={event => setticketPrice(event.target.value)}
                            required
                            placeholder="Ticket Price"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <div className="update ml-auto mr-auto">
                        <Button
                          className="btn-round"
                          color="primary"
                          type="submit"
                          onClick={handleSubmitClick}
                        >
                          Add Showtime
                        </Button>
                      </div>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
              </Col>
              </Row>
          </div>
        </Container>
      </div>
     
      <DemoFooter />
      {/* </div>
    
        <div style={{marginLeft:'17rem'}} >
          {/* <Row> */}
            {/* <Col md="8"> */}
              
            {/* </Col> */}
          {/* </Row> */}
        </div> 
        </>
    );
}

export default AddShowtime;
