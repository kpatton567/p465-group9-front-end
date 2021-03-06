import React from "react";
import axios from 'axios';
import {apiVariables} from '../../APIConstants'
import { useAuth0 } from '@auth0/auth0-react';
import Geocode from "react-geocode";


// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col,
  InputGroupAddon,
  InputGroupText,
  InputGroup, Alert} from "reactstrap";
// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
function RegisterPage(props) {
  
  const [theaterName, setTheaterName] = React.useState('');
  const [theaterCapacity, setTheaterCapacity] =  React.useState('');
  const [theaterAddress, setAddress] =  React.useState('');
  const [theaterLatitude, setLatitude] =  React.useState('');
  const [theaterLongitude, setLongitude] =  React.useState('');
  const { user} = useAuth0();
  const [alertOpen, setAlertOpen] = React.useState(false);
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });
  
  const handleTheaterRegister = (e) => {
    Geocode.fromAddress().then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        setLatitude(lat)
        setLongitude(lng)
      },
      error => {
        console.error(error);
      }
    );
    if(theaterName !== '' && theaterCapacity !== ''){
      console.log(theaterName);
      console.log(theaterCapacity);
    }
    // e.preventDefault();
    var userId = user.sub.length === 35 ? user.sub.substring(14) : user.sub.substring(6)
    const payload={
      "name":theaterName,
      "managerId" : user.sub.substring(6),
      "capacity": theaterCapacity,
      "address" : theaterAddress,
      "longitude" : theaterLongitude,
      "latitude" : theaterLatitude
    }
    axios.post(apiVariables.apiUrl +'/api/admin/add_theater', payload, {
    })
    .then((response) => {
        setAlertOpen(true);
        // setTimeout(()=> props.history.push('/manager/managerView/manageMovies'), 2000);
    })
    .catch((error) => {
        console.log(error)
    })
    console.log(payload);
  };
  if (user && !alertOpen)
  return (
    <>
      <ExamplesNavbar />
      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")",
        }}
      >
        <div className="filter" />
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="4">
              <Card className="card-register ml-auto mr-auto">
                <h3 style= {{marginLeft : '5rem'}}>Welcome</h3>
                <Form className="register-form">
                  <label>Theater Name</label>
                  <InputGroup className="form-group-no-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-camera-compact" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Theater Name" type="text" onChange={event => setTheaterName(event.target.value)}/>
                  </InputGroup>
                  <label>Theater Capacity</label>
                  <InputGroup className="form-group-no-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-chart-bar-32" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Theater Capacity" type="numeric"
                    onChange= {event =>
                    setTheaterCapacity(event.target.value)}/>
                  </InputGroup>
                  <label>Theater Address</label>
                  <InputGroup className="form-group-no-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-map-big" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Theater Address" type="text"
                    onChange= {event =>
                    setAddress(event.target.value)}/>
                  </InputGroup>
                  <Button
                  className="btn-round mr-1"
                  color="danger"
                  outline
                  type="button"
                  onClick={() => {
                    handleTheaterRegister()
                  }}
                  style = {{marginLeft : '5rem'}}
                >
                    Register
                  </Button>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
        <div className="footer register-footer text-center">
          <h6>
            Register your theater here!
          </h6>
        </div>
      </div>
    </>
  );
  if(alertOpen)
  return (
    <Alert  severity="success">
      Your theater has been registered successfully! Manage your movies!
    </Alert>
  )
  return null
}
export default RegisterPage;