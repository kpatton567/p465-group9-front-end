import React from "react";

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

function ManageMovies() {
    const [snackName, setsnackName] = React.useState('');
    const [snackPrice, setsnackPrice] = React.useState('');
    const fetchData = React.useCallback(() => {
      axios({
          "method": "POST",
          "url": apiVariables.apiUrl + '/api/manage/add_snack' + 
          {
            "name": snackName,
            "price":snackPrice
          },
      })
          .then((response) => {
              console.log(response.data)
          })
          .catch((error) => {
              console.log(error)
          })
  }, [])
  React.useEffect(() => {
      fetchData()
  }, [fetchData])
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

export default ManageMovies;