import React from "react";
import classnames from "classnames";
import { CometChat } from '@cometchat-pro/chat';
import {dropMessages} from 'react-chat-widget';
import {
  DropdownToggle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from "reactstrap";
import { useAuth0 } from '@auth0/auth0-react';
import { apiVariables, ACCESS_TOKEN_NAME } from '../../APIConstants';
import axios from "axios";

export default function ExamplesNavbar(props) {

  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);
  const [isCustomer, setIsCustomer] = React.useState(false);

  let CUSTOMER_MESSAGE_LISTENER_KEY = ""
  
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();

  if (user) {

    var token = localStorage.getItem(ACCESS_TOKEN_NAME)
    const body = {};
    axios.post(apiVariables.apiUrl + '/api/auth/user_role', body, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(function (response) {
      if (response.status === 200) {
        if (response.data === 'ROLE_CUSTOMER') {
          setIsCustomer(true);
        }
      }
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  if(user){
    var userId = user.sub.length === 35 ? user.sub.substring(14) : user.sub.substring(6)
    CUSTOMER_MESSAGE_LISTENER_KEY = userId;
 }
  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };
  const handlelogout = () => {
    //invalidate token
    var token = localStorage.getItem(ACCESS_TOKEN_NAME)
    const body = {};
    axios.post(apiVariables.apiUrl +'/api/auth/invalidate_token', body, {
    headers: {
        'Authorization': 'Bearer ' + token
    }
    }).then(function (response) {
        if(response.status === 200){
            console.log("Invalidated token successfully!");
            localStorage.clear();
            props.showError(null)
        }
    })
    .catch(function (error) {
        console.log(error);
    });

    //cometchat logout

    CometChat.removeMessageListener(CUSTOMER_MESSAGE_LISTENER_KEY);
    CometChat.logout();
    dropMessages();
    
    //auth0 logout
    console.log(isAuthenticated);
    logout();
  }

  const handlelogin = () => {
    loginWithRedirect();
  }

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("navbar-transparent");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if(isAuthenticated){
  return (
    <Navbar
      className={classnames("fixed-top", navbarColor)}
      color-on-scroll="300"
      expand="lg"
      style = {{borderBlock: 'unset'}}
    >
      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            href="/"
            style = {{
              height: '45px' , width : '10.5rem',
              margin: '5px 0',
              backgroundImage :  "url(" + require("assets/img/prevuelogo.png") + ")",
            }}
          >
            
          </NavbarBrand>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse,
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar >
            <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle
                        aria-expanded={false}
                        aria-haspopup={true}
                        caret
                        color="default"
                        data-toggle="dropdown"
                        href="#pablo"
                        id="dropdownMenuButton"
                        nav
                        onClick={(e) => e.preventDefault()}
                        role="button" 
                        style = {{color: '#fff',
                          borderColor: '#fff'}}
                      ><i className="nc-icon nc-single-02" />
                      </DropdownToggle>
                      <DropdownMenu
                        aria-labelledby="dropdownMenuButton"
                        className="dropdown-info"
                      >
                        <DropdownItem
                          href="/profile"
                        >
                          Profile Page
                        </DropdownItem>
                        <DropdownItem
                          href="/your-orders"
                        >
                          Your Orders
                        </DropdownItem>
                        <DropdownItem
                          href="/rewards"
                        >
                          Rewards
                        </DropdownItem>
                        {!isCustomer ?
                        <DropdownItem
                          href="/manager"
                        >
                          Manage your account
                        </DropdownItem>
                        :null}
                        <DropdownItem divider />
                        <DropdownItem
                          onClick={() => handlelogout()}
                        >
                          Logout
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
            
            
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  )} 
  if(!isAuthenticated)
  return (
    <Navbar
      className={classnames("fixed-top", navbarColor)}
      color-on-scroll="300"
      expand="lg"
    >
      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            href="/"
            style = {{
              height: '45px' , width : '10.5rem',
              margin: '5px 0',
              // padding: '20px 15px',
              backgroundImage :  "url(" + require("assets/img/prevuelogo.png") + ")",
            }}
          >
            {/* PreVue */}
          </NavbarBrand>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse,
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar>
            <NavItem>
              <NavLink
                onClick={handlelogin}
              >
                <i className="nc-icon nc-book-bookmark" /> Login 
              </NavLink>
            </NavItem>
          </Nav>

          
        </Collapse>
      </Container>
    </Navbar>
  )
}