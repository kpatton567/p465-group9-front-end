import React from "react";

// reactstrap components
import {
  Button,
  Label,
  FormGroup,
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
  Card
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
      <ProfilePageHeader posterLink = {require("assets/img/fabio-mangione.jpg")} />
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
                    Profile
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activeTab === "2" ? "active" : ""}
                    onClick={() => {
                      toggle("2");
                    }}
                  >
                    Preferences
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
                <Card className="ml-auto mr-auto" style={{
                borderRadius: "8px",
                maxWidth: "350px",
                margin: "20px 0 70px",
                minHeight: "400px",
                padding: "30px"}}>
                  <Form>
                    <label >Full Name</label>
                    <Input placeholder="Full Name" type="text" />
                    <label>Email</label>
                    <Input placeholder="Email" type="text" />
                    <label>Mobile</label>
                    <Input placeholder="Mobile" type="numeric" />
                  
                    <Button block className="btn-round" color="danger">
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
