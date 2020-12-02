import React from "react";

// reactstrap components
import { Button, Container } from "reactstrap";

// core components
import { useAuth0 } from '@auth0/auth0-react';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

function LandingPageHeader() {
  let pageHeader = React.createRef();
  const handlelogin = () => {
    loginWithRedirect();
  }
  const bounceAnimation = keyframes`${fadeIn}`;

     const BouncyDiv = styled.div`
    animation: 1s ${bounceAnimation};
    `;
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();

  React.useEffect(() => {
    if (window.innerWidth < 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });
  if(!isAuthenticated)
  return (
    <>
      <div
        style={{
          // opacity: '0.9',
          backgroundImage:
            "url(" + require("assets/img/headerbg.jpg") + ")",
        }}
        className="page-header"
        data-parallax={true}
        ref={pageHeader}
      >
        <div className="filter" />
        <Container>
          <div className="motto text-center">
          <BouncyDiv>
            <h1 style = {{width: '45rem',marginLeft: '184px'}}>Welcome to the future of movie viewing</h1>
          </BouncyDiv>
            <h3 style = {{margin: '5px 0', padding: '20px 15px',fontSize: '14px',opacity: '.9', textTransform: 'uppercase'}}>
              Where the fun begins!</h3>
            <br />
            <Button
              href="/movies"
              className="btn-round mr-1"
              color="neutral"
              target="_blank"
              outline
            >
              <i className="fa fa-play" />
              View Movies
            </Button>
            <Button className="btn-round" color="neutral" type="button" outline onClick={handlelogin}>
              Sign up
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
  if(isAuthenticated)
  return (
    <>
      <div
        style={{
          // opacity: '0.9',
          backgroundImage:
            "url(" + require("assets/img/headerbg.jpg") + ")",
        }}
        className="page-header"
        data-parallax={true}
        ref={pageHeader}
      >
        <div className="filter" />
        <Container>
          <div className="motto text-center">
          <BouncyDiv>
            <h1 style = {{width: '45rem',marginLeft: '184px'}}>Welcome to the future of movie viewing</h1>
          </BouncyDiv>
            <h3 style = {{margin: '5px 0', padding: '20px 15px',fontSize: '14px',opacity: '.9', textTransform: 'uppercase'}}>
            Where the fun begins!</h3>
            <br />
            <Button
              href="/movies"
              className="btn-round mr-1"
              color="neutral"
              target="_blank"
              outline
            >
              <i className="fa fa-play" />
              View Movies
            </Button>
          </div>
        </Container>

      </div>
    </>
  );
}

export default LandingPageHeader;
