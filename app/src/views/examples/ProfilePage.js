import React from "react";

// reactstrap components
import {
  Button,
  Label,
  FormGroup,
  InputGroup,
  Input,
  Container,
  Row,
  Col,
  Form,
  Card,
  UncontrolledAlert,
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
  { text: 'SciFi', checked: false },
  { text: 'Romance', checked: false }
]

function ProfilePage() {
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const [email, setEmail] = React.useState('');
  const [mobile, setMobile] = React.useState('');
  const [birthday, setBirthday] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [firstname, setFirstName] = React.useState('');
  const [secondname, setSecondName] = React.useState('');
  const [genres,setGenres] = React.useState([]);
  const [isSent, setIsSent] = React.useState(false)

  // var token = localStorage.getItem(ACCESS_TOKEN_NAME)
  // axios.get(apiVariables.apiUrl +'/api/customer/profile', {
  //   headers: {
  //       'Authorization': 'Bearer ' + token
  //   }
  //   }).then(function (response) {
  //     setFirstName(response.data.firstName)
  //     setSecondName(response.data.lastName)
  //     setMobile(response.data.mobileNumber)
  //     console.log(response.data)
  //   })
  //   .catch(function (error) {
  //       console.log(error);
  //   });

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
        <div className="section profile-content" >
        <div style = {{position: 'relative',
    backgroundColor: '#f4f3ef'}}>
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
                {/* <h4 className="title">
                  {user.nickname} <br />
                </h4> */}
                <h4 className="title">
                  Pranamya Vadlamani <br />
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
                    <Card style={{
                      borderRadius: "8px",
                      margin: "20px 0 70px",
                      minHeight: "400px",
                      padding: "30px"
                    }}>
                      <h3 className="mx-auto" style = {{color: 'black!important',marginTop: '10px',
    marginBottom: '9px', minHeight: '32px', fontWeight : '700'}}>Edit Profile</h3>
                      <Form inline style = {{paddingTop : '1rem'}}>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                          <Input value = {firstname} style={{ marginBottom:'1rem',width: '234px' }} placeholder="First Name" type="text" onChange= {event => 
                              setFirstName(event.target.value)} />
                        </FormGroup>
                        <FormGroup className="mb-2  mb-sm-0">
                        <Input value = {secondname} style={{marginBottom:'1rem', width: '238px' }} placeholder="Last Name" type="text" onChange= {event => 
                              setSecondName(event.target.value)} />
                        </FormGroup>
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
                            value= {mobile}
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
                          <Label style = {{marginRight:'10px', marginBottom:'1rem'}}><strong>Gender </strong></Label>
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
                            Choose to disclose <span className="form-check-sign" />
                          </Label>
                        </FormGroup>
                        <FormGroup style = {{ maxWidth: 'fit-content'}}>
                          <Label style = {{marginRight:'8px', marginBottom:'1rem', maxWidth: '6rem'}}><strong>Preferred Genre</strong></Label>
                          <div style = {{display: 'inline-flex',width: '10rem'}}>
                          {items.map((item, i) =>
                          
                          <Label check style = {{marginRight:'8px', marginBottom:'1rem'}}>
                              <Input
                                type="checkbox"
                                onChange={onToggle.bind(this, i)}
                              />
                              {item.text} <span className="form-check-sign" />
                            </Label>
                             
                            )}
                          </div>
                          {isSent ? 
                          <UncontrolledAlert color="info" fade={false}>
                          <span>Your changes have been updated</span>
                        </UncontrolledAlert>
                        : null}
                        </FormGroup>
                        <Button block className="btn-round" color="danger" style = {{color: 'white',background: '#51cbce', marginLeft: '10rem', width : '10rem'}} onClick={() => saveChanges()}>
                          Save Changes
                    </Button>
                      </Form>
                    </Card>
                  </Col>
                </Row>
            </div>
          </Container>
        </div>
       
        <DemoFooter />
        </div>
      </>
    );
}

export default ProfilePage;
