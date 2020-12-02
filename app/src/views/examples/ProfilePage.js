import React from "react";

// reactstrap components
import {
  Button,
  Label,
  FormGroup,
  InputGroup,
  Input,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  Form,
  Card,
} from "reactstrap";

// core components
import { useAuth0 } from '@auth0/auth0-react';
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

function ProfilePage() {
  const [activeTab, setActiveTab] = React.useState("1");
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

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
            <div className="nav-tabs-navigation">
              <div className="nav-tabs-wrapper">
                <Nav role="tablist" tabs>
                  <NavItem>
                    <NavLink
                      className={activeTab === "1" ? "active" : ""}
                      onClick={() => {
                        toggle("1");
                      }}
                    >
                      Edit Profile
                  </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={activeTab === "2" ? "active" : ""}
                      onClick={() => {
                        toggle("2");
                      }}
                    >
                      Edit Preferences
                  </NavLink>
                  </NavItem>
                </Nav>
              </div>
            </div>
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
                          <Input style={{ marginRight: '10px', marginBottom:'1rem' }} placeholder="First Name" type="text" />
                          <Input style={{marginBottom:'1rem' }} placeholder="Last Name" type="text" />
                        </InputGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0" >

                          <Input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            style={{ width: '234px', marginBottom:'1rem' }}
                          />
                        </FormGroup>
                        <FormGroup className="mb-2  mb-sm-0">
                          <Input
                            name="mobile"
                            id="mobile"
                            placeholder="Mobile"
                            style={{ width: '238px', marginBottom:'1rem' }}
                          />
                        </FormGroup>
                         <FormGroup>
                    <InputGroup className="date" id="datetimepicker">
                    <input type="date" id="start" name="trip-start"
                      min="1950-01-01" max="2002-12-31" style={{ width: '234px' , marginTop : '10px', height: '41px', backgroundColor: '#FFFFFF',
                      border: '1px solid #DDDDDD',
                      borderRadius: '4px',
                      color: '#66615b',
                      lineHeight: 'normal',
                      fontSize: '14px',
                      transition: 'color 0.3s ease-in-out', backgroundColor: '0.3s ease-in-out',
                      boxShadow: 'none', marginBottom:'1rem' }}/>
                    </InputGroup>
                  </FormGroup>
                        <FormGroup>
                          <Label style = {{marginRight:'10px', marginBottom:'1rem'}}>Gender? </Label>
                          <Label check style = {{marginRight:'10px', marginBottom:'1rem'}}>
                            <Input
                              defaultValue="option1"
                              id="exampleRadios1"
                              name="exampleRadios"
                              type="radio"
                            />
                            Male <span className="form-check-sign" />
                          </Label>
                          <Label check style = {{marginRight:'10px', marginBottom:'1rem'}}>
                            <Input
                              defaultValue="option1"
                              id="exampleRadios1"
                              name="exampleRadios"
                              type="radio"
                            />
                            Female <span className="form-check-sign" />
                          </Label>
                          <Label check style = {{marginBottom:'1rem'}}>
                            <Input
                              defaultValue="option1"
                              id="exampleRadios1"
                              name="exampleRadios"
                              type="radio"
                            />
                            Don't wish to disclose <span className="form-check-sign" />
                          </Label>
                        </FormGroup>
                        <FormGroup style = {{ maxWidth: 'fit-content'}}>
                          <Label style = {{marginRight:'8px', marginBottom:'1rem'}}>What's your fav genre? </Label>
                          <Label check style = {{marginRight:'8px', marginBottom:'1rem'}}>
                            <Input
                              defaultValue="option1"
                              id="exampleRadios1"
                              name="exampleRadios"
                              type="checkbox"
                            />
                            Action <span className="form-check-sign" />
                          </Label>
                          <Label check style = {{marginRight:'8px', marginBottom:'1rem'}}>
                            <Input
                              defaultValue="option1"
                              id="exampleRadios1"
                              name="exampleRadios"
                              type="checkbox"
                            />
                            Thriller <span className="form-check-sign" />
                          </Label>
                          <Label check style = {{marginBottom:'1rem', marginRight : '10px'}}>
                            <Input
                              defaultValue="option1"
                              id="exampleRadios1"
                              name="exampleRadios"
                              type="checkbox"
                            />
                            Romantic<span className="form-check-sign" />
                          </Label>
                          <Label check style = {{marginBottom:'1rem', marginRight : '8px'}}>
                            <Input
                              defaultValue="option1"
                              id="exampleRadios1"
                              name="exampleRadios"
                              type="checkbox"
                            />
                            Horror<span className="form-check-sign" />
                          </Label>
                          <Label check style = {{marginBottom:'1rem', marginRight : '8px'}}>
                            <Input
                              defaultValue="option1"
                              id="exampleRadios1"
                              name="exampleRadios"
                              type="checkbox"
                            />
                            Comedy<span className="form-check-sign" />
                          </Label>
                          <Label check style = {{marginBottom:'1rem'}}>
                            <Input
                              defaultValue="option1"
                              id="exampleRadios1"
                              name="exampleRadios"
                              type="checkbox"
                            />
                            Sci-Fi<span className="form-check-sign" />
                          </Label>
                        </FormGroup>
                        <Button block className="btn-round" color="danger" style = {{marginTop:'8rem'}}>
                          Save Changes
                    </Button>
                      </Form>
                    </Card>
                  </Col>
                </Row>
              </TabPane>
              <TabPane className="text-center" tabId="2" id="following">
                <h3 className="text-muted">Not following anyone yet :(</h3>
                <Button className="btn-round" color="warning">
                  Find artists
              </Button>
              </TabPane>
            </TabContent>
          </Container>
        </div>
        <DemoFooter />
      </>
    );
}

export default ProfilePage;
