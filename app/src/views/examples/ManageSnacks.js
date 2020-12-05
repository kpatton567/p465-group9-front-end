import React from "react";
import axios from 'axios';
import { apiVariables, ACCESS_TOKEN_NAME } from '../../APIConstants';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

function ManageSnacks() {
    var token = localStorage.getItem(ACCESS_TOKEN_NAME);
    const [snackName, setsnackName] = React.useState('');
    const [snackPrice, setsnackPrice] = React.useState('');
    const handleSubmitClick = (e) => {
      e.preventDefault();
      const payload = {
        "name": snackName,
        "price": snackPrice,
      }
      axios.post((apiVariables.apiUrl + '/api/manage/add_snack'), payload,{
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
                  <CardTitle tag="h5">Add Snacks</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>Snack Name*</label>
                          <Input
                            defaultValue={snackName} 
                            onChange={event => setsnackName(event.target.value)}
                            required
                            placeholder="Snack Name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                      <FormGroup>
                          <label>Snack Price*</label>
                          <Input
                            defaultValue={snackPrice} 
                            onChange={event => setsnackPrice(event.target.value)}
                            required
                            placeholder="Snack Price"
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
                          Add Snacks
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

export default ManageSnacks;