import React, { useState } from "react";

// reactstrap components
import { Container, Col } from "reactstrap";
import "animate.css/animate.min.css";
import Slide from 'react-reveal/Zoom';
// core components
import "../styles/DiscoverMovies.css"
import Button from '@material-ui/core/Button';
import Particles from 'react-particles-js';

function DiscoverMovies() {
  return (
    <>
      <div className="section section-dark" style = {{height: '50rem'}}>
      <div style = {{
    color: 'black',
    position: 'absolute',
    textAlign: 'center',
    color:'white'}}>
         <Slide>
        <h1 style = {{ marginTop:'10rem', width: '100px', fontSize: '72px', color: 'white', marginLeft : '40px'}}>EXPERIENCE WORLD CLASS CINEMA</h1>
        </Slide>
        <Button href='/movies'><h6 style = {{ fontWeight: '400', color: 'white', marginLeft : '40px'}} >Discover Movies</h6></Button>
    </div>
    <Particles
    params={{
	    "particles": {
	        "number": {
	            "value": 160,
	            "density": {
	                "enable": false
	            }
	        },
	        "size": {
	            "value": 3,
	            "random": true,
	            "anim": {
	                "speed": 4,
	                "size_min": 0.3
	            }
	        },
	        "line_linked": {
	            "enable": false
	        },
	        "move": {
	            "random": true,
	            "speed": 1,
	            "direction": "top",
	            "out_mode": "out"
	        }
	    },
	    "interactivity": {
	        "events": {
	            "onhover": {
	                "enable": true,
	                "mode": "bubble"
	            },
	            "onclick": {
	                "enable": true,
	                "mode": "repulse"
	            }
	        },
	        "modes": {
	            "bubble": {
	                "distance": 250,
	                "duration": 2,
	                "size": 0,
	                "opacity": 0
	            },
	            "repulse": {
	                "distance": 400,
	                "duration": 4
	            }
	        }
	    }
	}} /> 
            

           
         
       
      </div>
    </>
  );
}

export default DiscoverMovies;