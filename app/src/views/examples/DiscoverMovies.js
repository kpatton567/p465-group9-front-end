import React, { useState } from "react";

// reactstrap components
import { Container, Col } from "reactstrap";
import "animate.css/animate.min.css";
import Slide from 'react-reveal/Zoom';
// core components
import "../styles/DiscoverMovies.css"
import ScrollAnimation from 'react-animate-on-scroll';


function DiscoverMovies() {
  const [open, set] = useState(true)
  return (
    <>
      <div className="section section-dark" style = {{height: '50rem'}}>
        <Container>
            <div>
            <Slide>
            <h1 style = {{ marginTop:'10rem', width: '100px', fontSize: '72px', color: 'white'}}>EXPERIENCE WORLD CLASS CINEMA</h1>
            </Slide>
            <button href = '/movies'><h6 style = {{ fontWeight: '400', color: 'white'}} >Discover Movies</h6></button>
           </div>

            <div style={{backgroundColor : '#ceeaf3', height:'100%',
            width: '30%',
            position: 'fixed',
            top: '0',
            overflowX: 'hidden',
            paddingTop: '20px',right: '0'}}>
            <Col className="ml-auto mr-auto" md="2" >
            
            </Col>
            </div>
         
        </Container>
      </div>
    </>
  );
}

export default DiscoverMovies;