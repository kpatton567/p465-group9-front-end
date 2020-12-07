import React from "react";
import axios from 'axios';
import { apiVariables, ACCESS_TOKEN_NAME } from '../../APIConstants';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import { propTypes } from "react-bootstrap/esm/Image";

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
      axios.post((apiVariables.apiUrl + '/api/manage/add_Showtime'), payload,{
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
        <div className="content">
          <Row>
            <Col md="8">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Add Showtime</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Movie Showtime*(YYYY-MM-DD HH:MM:00)</label>
                          <Input
                            defaultValue={showTime} 
                            onChange={event => setshowTime(event.target.value)}
                            required
                            placeholder="Movie Showtime"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Ticket Price*</label>
                          <Input
                            placeholder="Ticket Price"
                            type="text"
                            required
                            defaultValue={ticketPrice} 
                            onChange={event => setticketPrice(event.target.value)}
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
      </>
    );
}

export default AddShowtime;
