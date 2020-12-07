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

function ManageMovies() {
    var token = localStorage.getItem(ACCESS_TOKEN_NAME);
    const [movieTitle, setmovieTitle] = React.useState('');
    const [movieDesc, setmovieDesc] = React.useState('');
    const [movieGenre, setmovieGenre] = React.useState([]);
    const [movieURL, setmovieURL] = React.useState('');
    const handleSubmitClick = (e) => {
      e.preventDefault();
      const payload = {
        "title": movieTitle,
        "description":movieDesc,
        "posterLink":movieURL,
        "genre":[]
      }
      axios.post((apiVariables.apiUrl + '/api/manage/add_movie'), payload,{
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
      // <>
        <div className="content">
          <Row>
            <Col md="8">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Add Movies</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Movie Title*</label>
                          <Input
                            defaultValue={movieTitle} 
                            onChange={event => setmovieTitle(event.target.value)}
                            required
                            placeholder="Movie Title"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Link to the Movie Poster*</label>
                          <Input
                            placeholder="Poster Link"
                            type="text"
                            required
                            defaultValue={movieURL} 
                            onChange={event => setmovieURL(event.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Movie Synopsis</label>
                          <Input
                            type="textarea"
                            defaultValue={movieDesc} 
                            placeholder="Movie Synopsis"
                            onChange={event => setmovieDesc(event.target.value)}
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
                          Add Movie
                        </Button>
                      </div>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      // </>
    );
}

export default ManageMovies;
