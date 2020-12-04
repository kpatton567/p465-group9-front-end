import React from "react";

// reactstrap components
import {
  Button,
  Label,
  FormGroup,
  InputGroup,
  Input,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  Form,
  Card,
  UncontrolledAlert,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

// core components
import { useAuth0 } from '@auth0/auth0-react';
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import { apiVariables, ACCESS_TOKEN_NAME } from '../../APIConstants';
import axios from 'axios';

const items = [
  { text: 'Action', checked: false },
  { text: 'Horror', checked: false },
  { text: 'Comedy', checked: false },
  { text: 'Thriller', checked: false },
  { text: 'Sci-Fi', checked: false },
  { text: 'Romance', checked: false }
]

function ProfilePage() {
  const [activeTab, setActiveTab] = React.useState("1");
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const [email, setEmail] = React.useState('');
  const [mobile, setMobile] = React.useState('');
  const [birthday, setBirthday] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [firstname, setFirstName] = React.useState('');
  const [secondname, setSecondName] = React.useState('');
  const [genres,setGenres] = React.useState([]);
  const [isSent, setIsSent] = React.useState(false)
  
  const onToggle = (index, e) => {
  	let newItems = items.slice();
    newItems[index].checked = !newItems[index].checked
    let genres = []
    for(var i = 0 ; i < newItems.length ; i++){
      if(newItems[i].checked){
        var tempgenre = newItems[i].text.toUpperCase();
        genres.push(tempgenre)
      }
    }
    setGenres(genres)
  }

  const saveChanges = () =>{
    var token = localStorage.getItem(ACCESS_TOKEN_NAME)

    const payload = {
      "userId": user.sub.length === 30 ? user.sub.substring(6) : user.sub.substring(14),
      "firstName" : firstname,
      "lastName" : secondname,
      "email" : email,
      "mobileNumber" : mobile,
      "birthday" : birthday,
      "genres" : genres
    }
    console.log(payload);
      axios.post(apiVariables.apiUrl +'/api/customer/edit_profile', payload, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
        }).then(function (response) {
            if(response.status === 200){
              setIsSent(true)
            }
        })
        .catch(function (error) {
            console.log(error);
        });

        axios.post(apiVariables.apiUrl +'/api/customer/profile', {
          headers: {
              'Authorization': 'Bearer ' + token
          }
          }).then(function (response) {
              console.log(response)
          })
          .catch(function (error) {
              console.log(error);
          });
  }

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });
  if (!isAuthenticated && isLoading) {
    return (<div>
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
                  Edit your profile, choose your prefrences to get customized coupons, emails, movie recommendations and many more!
              </p>
                <br />
              </Col>
            </Row>
            <br />
            {/* Tab panes */}
            <TabContent className="following" activeTab={activeTab}>
              <TabPane tabId="1" id="follows">
                <Row>
                  <Col className="ml-auto mr-auto" md="6">
                    <Card style={{
                      borderRadius: "8px",
                      margin: "20px 0 70px",
                      minHeight: "400px",
                      padding: "30px"
                    }}>
                      <Form inline style = {{paddingTop : '3rem'}}>
                        <InputGroup style={{ width: '100%' }}>
                          <Input style={{ marginRight: '10px', marginBottom:'1rem' }} placeholder="First Name" type="text" onChange= {event => 
                              setFirstName(event.target.value)} />
                          <Input style={{marginBottom:'1rem' }} placeholder="Last Name" type="text" onChange= {event => 
                              setSecondName(event.target.value)} />
                        </InputGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0" >
                          <Input
                            defaultValue={user.email}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            style={{ width: '234px', marginBottom:'1rem' }}
                            onChange= {event => 
                              setEmail(event.target.value)}
                          />
                        </FormGroup>
                        <FormGroup className="mb-2  mb-sm-0">
                          <Input
                            name="mobile"
                            id="mobile"
                            placeholder="Mobile"
                            style={{ width: '238px', marginBottom:'1rem' }}
                            onChange= {event => 
                              setMobile(event.target.value)}
                          />
                        </FormGroup>
                         <FormGroup>
                    <InputGroup className="date" id="datetimepicker">
                    <label style = {{marginRight : '10px'}}><strong>Birthday</strong></label>
                    <input type="date" id="start" name="trip-start"
                      min="1950-01-01" max="2020-12-31"
                      placeholder='Birthday' style={{ width: '234px' , marginTop : '10px', height: '41px', backgroundColor: '#FFFFFF',
                      border: '1px solid #DDDDDD',
                      borderRadius: '4px',
                      color: '#66615b',
                      lineHeight: 'normal',
                      fontSize: '14px',
                      transition: 'color 0.3s ease-in-out', backgroundColor: '0.3s ease-in-out',
                      boxShadow: 'none', marginBottom:'1rem' }}
                      onChange= {event => 
                        setBirthday(event.target.value)}/>
                    </InputGroup>
                  </FormGroup>
                        <FormGroup>
                          <Label style = {{marginRight:'10px', marginBottom:'1rem'}}><strong>Gender? </strong></Label>
                          <Label check style = {{marginRight:'10px', marginBottom:'1rem'}}>
                            <Input
                              defaultValue="male"
                              type="radio"
                              onChange= {event => 
                                setGender(event.target.value)}
                            />
                            Male <span className="form-check-sign" />
                          </Label>
                          <Label check style = {{marginRight:'10px', marginBottom:'1rem'}}>
                            <Input
                              defaultValue="female"
                              type="radio"
                              onChange= {event => 
                                setGender(event.target.value)}
                            />
                            Female <span className="form-check-sign" />
                          </Label>
                          <Label check style = {{marginBottom:'1rem'}}>
                            <Input
                              defaultValue="trans"
                              type="radio"
                              onChange= {event => 
                                setGender(event.target.value)}
                            />
                            Don't wish to disclose <span className="form-check-sign" />
                          </Label>
                        </FormGroup>
                        <FormGroup style = {{ maxWidth: 'fit-content'}}>
                          <Label style = {{marginRight:'8px', marginBottom:'1rem'}}><strong>What's your fav genre? </strong></Label>
                          {items.map((item, i) =>
                          <div>
                          <Label check style = {{marginRight:'8px', marginBottom:'1rem'}}>
                              <Input
                                type="checkbox"
                                onChange={onToggle.bind(this, i)}
                              />
                              {item.text} <span className="form-check-sign" />
                            </Label>
                              </div>
                            )}

                          {isSent ? 
                          <UncontrolledAlert color="info" fade={false}>
                          <span>Your changes have been updated</span>
                        </UncontrolledAlert>
                        : null}
                        </FormGroup>
                        <Button block className="btn-round" color="danger" style = {{marginTop:'8rem',color: 'white',
                                                background: '#51cbce'}} onClick={() => saveChanges()}>
                          Save Changes
                    </Button>
                      </Form>
                      {/* <Form className="register-form">
                  <label>First Name</label>
                  <InputGroup className="form-group-no-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-camera-compact" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="First Name" type="text" onChange= {event => 
                              setFirstName(event.target.value)}/>
                  </InputGroup>
                  <label>Second Name</label>
                  <InputGroup className="form-group-no-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-chart-bar-32" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Second Name" type="numeric" onChange= {event => 
                              setSecondName(event.target.value)}  
                    />
                  </InputGroup>
                  <label>Email</label>
                  <InputGroup className="form-group-no-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-chart-bar-32" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="numeric" defaultValue={user.email} onChange= {event => 
                              setEmail(event.target.value)}
                    />
                  </InputGroup>
                  <label>Mobile Number</label>
                  <InputGroup className="form-group-no-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-chart-bar-32" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Mobile Number" type="numeric"  onChange= {event => 
                              setMobile(event.target.value)}
                    />
                  </InputGroup>
                  <InputGroup className="date" id="datetimepicker">
                    <label style = {{marginRight: '17rem'}}>Birthday</label>
                    <input type="date" id="start" name="trip-start"
                      min="1950-01-01" max="2002-12-31" style={{ width: '234px' , marginTop : '10px', height: '41px', backgroundColor: '#FFFFFF',
                      border: '1px solid #DDDDDD',
                      borderRadius: '4px',
                      color: '#66615b',
                      lineHeight: 'normal',
                      fontSize: '14px',
                      transition: 'color 0.3s ease-in-out', backgroundColor: '0.3s ease-in-out',
                      boxShadow: 'none', marginBottom:'1rem' }}
                      onChange= {event => 
                        setBirthday(event.target.value)}/>
                    </InputGroup>
                  <Button
                  className="btn-round mr-1"
                  color="danger"
                  outline
                  type="button"
                  style = {{marginLeft : '5rem'}}
                  onClick={() => saveChanges()}
                >
                    Register
                  </Button>
                  {isSent ? 
                          <UncontrolledAlert color="info" fade={false}>
                          <span>
                            Your email has been sent. Sit back and relax, our team will respond within a couple of hours.
                          </span>
                        </UncontrolledAlert>
                        : null}
                </Form> */}
                    </Card>
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </Container>
        </div>
        <DemoFooter />
      </>
    );
}

export default ProfilePage;
