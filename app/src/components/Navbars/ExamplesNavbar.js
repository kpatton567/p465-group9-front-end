import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";

// reactstrap components

import {
  UncontrolledCollapse,
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
  Button
} from "reactstrap";
import { useAuth0 } from '@auth0/auth0-react';


export default function ExamplesNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };
  const handlelogout = () => {
    // var token = localStorage.getItem(ACCESS_TOKEN_NAME)
    // const body = {};
    // axios.post(apiVariables.apiUrl +'/api/auth/invalidate_token', body, {
    // headers: {
    //     'Authorization': 'Bearer ' + token
    // }
    // }).then(function (response) {
    //     if(response.status === 200){
    //         console.log("Invalidated token successfully!");
    //         localStorage.clear();
    //         props.showError(null)
    //     }
    // })
    // .catch(function (error) {
    //     console.log(error);
    // });
    console.log(isAuthenticated)
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
    >
      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            href="/"
            // target="_blank"
            // title="Coded by Creative Tim"
          >
            PreVue
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
                data-placement="bottom"
                // href="https://www.github.com/CreativeTimOfficial?ref=creativetim"
                target="_blank"
                title="Star on GitHub"
              >
                <i className="fa fa-github" />
                <p className="d-lg-none">GitHub</p>
              </NavLink>
            </NavItem>
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
                      ><i className="nc-icon nc-single-02" />
                      </DropdownToggle>
                      <DropdownMenu
                        aria-labelledby="dropdownMenuButton"
                        className="dropdown-info"
                      >
                        <DropdownItem
                          href="/profile-page"
                        >
                          Profile Page
                        </DropdownItem>
                        <DropdownItem
                          href="/your-orders"
                        >
                          Your Orders
                        </DropdownItem>
                        <DropdownItem
                          href="/rewards-page"
                        >
                          Rewards
                        </DropdownItem>
                        <DropdownItem
                          href="/manager"
                        >
                          Manage your account
                        </DropdownItem>
                        
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
  else return (
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
            // target="_blank"
            // title="Coded by Creative Tim"
          >
            PreVue
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
                // target="_blank"
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